/*
  Warnings:

  - A unique constraint covering the columns `[identifierTradeCode,tradeTime,buyerCode,sellerCode,code,date,price,amount]` on the table `StocksTrading` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StocksTrading_identifierTradeCode_tradeTime_buyerCode_selle_key" ON "StocksTrading"("identifierTradeCode", "tradeTime", "buyerCode", "sellerCode", "code", "date", "price", "amount");
