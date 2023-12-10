import { schedule } from "node-cron";
import { basename, extname, join } from "path";
import prismaClient from "./client/prismaClient";
import environment from './configs/environment';
import { processHistoricalSeries } from "./services/processHistoricalSeries";
import { StorageService } from "./services/storageService";

async function taskProcessHistoricalSeries(){    
    console.log("Starting process historical series...")

    const storageService = new StorageService()
    const contents = await storageService.listObjects({prefix:`${environment.tasks.historicalSeries.bucketPrefix}/pending`})
    const filteredFiles = contents.filter(file=>extname(String(file.Key))===".csv")

    if(!filteredFiles.length){
        console.log("There is no file to process.")
        return 
    }

    for await (const file of filteredFiles){   
        const task = await prismaClient.tasks.findFirst({
            where:{
                sourceKey:{equals:String(file.Key)},      
                type:{
                    equals:'historicalSeries'
                }          
            }
        })

        if(task?.inProgress){
            console.log("Task already in progress.", file.Key)
            continue
        }

        if((task?.startDate && task.closeDate)||task?.processed){
            console.log("Task already processed.", file.Key)
            continue
        }

        if(task?.errorMessage){
            console.log("Task with error... skipping")
            continue
        }

        
        const filekey = file.Key
        const filename = basename(String(file.Key))
    
        const filepath = join(__dirname,'..','files','historical-series',filename)
        
        const newTask =  await prismaClient.tasks.create({
            data:{
                inProgress:true,
                processed:false,
                sourceKey:String(file.Key),
                startDate:new Date(),
                type:'historicalSeries'                            
            },
            select:{
                id:true
            }
        })
    
        await storageService.download({
            key:String(file.Key),
            outDir:filepath
        })
    
        await processHistoricalSeries({
            filepath:filepath,
            storageService,
            sourceKey:String(filekey),
            destinationKey:String(filekey).replace('pending','processed'),
            taskId:newTask.id
        })
        
    }
}
taskProcessHistoricalSeries()
schedule(environment.tasks.historicalSeries.cron,taskProcessHistoricalSeries)