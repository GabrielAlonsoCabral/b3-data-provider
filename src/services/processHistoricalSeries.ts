import { HistoricalSeries } from '@prisma/client';
import csvParser from 'csv-parser';
import { createReadStream } from 'fs';
import { unlink } from 'fs/promises';
import { basename } from 'path';
import prismaClient from '../client/prismaClient';
import { formatCsvItem } from '../helpers/formatCsvLine';
import { StorageService } from './storageService';

type IRow = Omit<HistoricalSeries,'id'>

let rowsToExecute:IRow[] = []

let pendingRowsToExecute:number =0
const CHUNK_SIZE=100

type IProcessHistoricalSeriesInput = {filepath:string, storageService:StorageService, destinationKey:string, sourceKey:string, taskId:string} 

export async function processHistoricalSeries({filepath, storageService, destinationKey, sourceKey, taskId}:IProcessHistoricalSeriesInput){
    const filename =  basename(filepath)

    const pipe = createReadStream(filepath)
    .pipe(csvParser())
    
    console.log("@ProcessHistoricalSeries - started", filename)
    
    pipe.on('data',async (data)=>{
        pendingRowsToExecute++
        rowsToExecute.push(formatCsvItem(data))
    
        if(pendingRowsToExecute>=CHUNK_SIZE){
            pipe.pause()
            await processPendingRows(rowsToExecute)
            pendingRowsToExecute=0
            rowsToExecute=[]
            pipe.resume()
         }
    })    
    .on('end',async()=>{
        console.log("@ProcessHistoricalSeries - finish", filename)
    
        if(rowsToExecute.length){
            await processPendingRows(rowsToExecute)
        }

        await storageService.moveFile({
            destinationKey,
            sourceKey
        })
        
        await unlink(filepath)

        await prismaClient.tasks.update({
            where:{
                id:String(taskId)
            },
            data:{
                closeDate:new Date(),
                destinationKey:destinationKey,
                inProgress:false,
                processed:true                        
            }
        })
    })
}

async function processPendingRows(rows:IRow[]){
    if(1==1)return true
    return await prismaClient.historicalSeries.createMany({
        skipDuplicates:true,
        data:rows
    })
}
