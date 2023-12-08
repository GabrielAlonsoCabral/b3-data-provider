import { HistoricalSeries } from '@prisma/client';
import csvParser from 'csv-parser';
import { createReadStream } from 'fs';
import { rename } from 'fs/promises';
import { join } from 'path';
import prismaClient from './client/prismaClient';
import { formatCsvItem } from './helpers/formatCsvLine';

type IRow = Omit<HistoricalSeries,'id'>

let rowsToExecute:IRow[] = []

let pendingRowsToExecute:number =0
const CHUNK_SIZE=1000

const FILES_TO_PROCESS_PATH=join(__dirname, '..','files','historical-series')
const PROCESSED_FILES_PATH=join(__dirname, '..','files','processed')

const FILENAME="_COTAHIST_A2023.csv"
const FILEPATH =join(FILES_TO_PROCESS_PATH,FILENAME)

async function processPendingRows(rows:IRow[]){
    console.log("@processHistoricalSeries","processPendingRows", rows.length)
    return await prismaClient.historicalSeries.createMany({
        skipDuplicates:true,
        data:rows
    })
}

const pipe = createReadStream(FILEPATH)
.pipe(csvParser())

pipe.on('data',async (data)=>{
    pendingRowsToExecute++
    rowsToExecute.push(formatCsvItem(data))

    if(pendingRowsToExecute===CHUNK_SIZE){
        pipe.pause()
        await processPendingRows(rowsToExecute)
        pendingRowsToExecute=0
        rowsToExecute=[]
        pipe.resume()
     }
})
.on('end',async()=>{
    if(rowsToExecute.length){
        await processPendingRows(rowsToExecute)
    }
    await rename(FILEPATH, join(PROCESSED_FILES_PATH, FILENAME))    
})