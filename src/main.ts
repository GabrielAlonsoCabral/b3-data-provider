import { schedule } from 'node-cron';
import { basename, extname, join } from "path";
import environment from './configs/environment';
import { processHistoricalSeries } from "./services/processHistoricalSeries";
import { StorageService } from "./services/storageService";

let isProcessing=false;

async function taskProcessHistoricalSeries(){    
    console.log("Starting process historical series...")    
    if(isProcessing) {
        console.log("Skipping... is already running.")
        return
    }
    isProcessing=true;

    const storageService = new StorageService()
    const contents = await storageService.listObjects({prefix:`${environment.tasks.historicalSeries.bucketPrefix}/pending`})
    const filteredFiles = contents.filter(file=>extname(String(file.Key))===".csv")
    if(!filteredFiles.length){
        console.log("There is no file to process.")
    }
    for await (const file of filteredFiles){        
        const filekey = file.Key
        const filename = basename(String(file.Key))
    
        const filepath = join(__dirname,'..','files','historical-series',filename)
    
        await storageService.download({
            key:String(file.Key),
            outDir:filepath
        })
    
        await processHistoricalSeries({
            filepath:filepath,
            storageService,
            sourceKey:String(filekey),
            destinationKey:String(filekey).replace('pending','processed')
        })        

    }

    isProcessing=false
}

schedule(environment.tasks.historicalSeries.cron,taskProcessHistoricalSeries)