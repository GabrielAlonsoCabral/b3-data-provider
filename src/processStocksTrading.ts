import * as fs from 'fs';
import * as readline from 'readline';
import {join} from 'path'
import { ITrade } from './helpers';
import { parseLine } from './helpers/parseLine';
import prismaClient from './client/prismaClient';
import dayjs from 'dayjs';
const csvFilePath =  join(process.cwd(), 'files','27-11-2023_NEGOCIOSAVISTA.txt')

const fileStream = fs.createReadStream(csvFilePath);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let trades: ITrade[] = [];
let isFirstLine = true;
let totalExecuted = 0;
let pendingToExecute=0;

rl.on('line', async (line) => {
  totalExecuted++

  if (isFirstLine) {
    isFirstLine = false;
    return;
  }

  const trade = parseLine(line);
  trades.push(trade)
  pendingToExecute++

  if(pendingToExecute===1000){
    rl.pause()
    console.log("WRITING TRADES CHUNK!")
    await writeTradeRegister(trades)
    console.log("END OF WRITING TRADES CHUNK!")
    trades=[]
    pendingToExecute=0
    rl.resume()

  }

});


rl.on('close', () => {
  console.log('File reading completed.');
});

rl.on('error', (error) => {
  console.error(`Error reading the file: ${error}`);
});

async function writeTradeRegister(trades:ITrade[]){    
  await prismaClient.stocksTrading.createMany({
    skipDuplicates:true,
    data:trades.map((trade)=>({      
      amount:Number(trade.QuantidadeNegociada),
      price:Number(trade.PrecoNegocio.replace(',','')),
      buyerCode:Number(trade.CodigoParticipanteComprador),
      sellerCode:Number(trade.CodigoParticipanteVendedor),
      tradeTime:dayjs(trade.DataNegocio).toDate(),
      date:dayjs(trade.DataReferencia).toDate(),
      identifierTradeCode:trade.CodigoIdentificadorNegocio,
      code:trade.CodigoInstrumento,
    }))    
  })
  .catch(err=>{
    console.error(err)
  })
}