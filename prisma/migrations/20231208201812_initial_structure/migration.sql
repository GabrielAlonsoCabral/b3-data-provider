-- CreateTable
CREATE TABLE "StocksTrading" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "code" VARCHAR(55) NOT NULL,
    "stockUpdated" INTEGER DEFAULT 0,
    "price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "identifierTradeCode" VARCHAR(255) NOT NULL,
    "tradeTime" DATE NOT NULL,
    "buyerCode" INTEGER NOT NULL,
    "sellerCode" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "HistoricalSeries" (
    "id" TEXT NOT NULL,
    "marketDate" DATE NOT NULL,
    "registerType" INTEGER NOT NULL,
    "bdiCode" TEXT NOT NULL,
    "stockCode" VARCHAR(55) NOT NULL,
    "marketType" INTEGER NOT NULL,
    "companyNameResume" VARCHAR(255) NOT NULL,
    "stockSpecification" VARCHAR(100) NOT NULL,
    "currency" VARCHAR(16) NOT NULL,
    "openingValue" DOUBLE PRECISION NOT NULL,
    "closeValue" DOUBLE PRECISION NOT NULL,
    "maximalValue" DOUBLE PRECISION NOT NULL,
    "minimalValue" DOUBLE PRECISION NOT NULL,
    "averageValue" DOUBLE PRECISION NOT NULL,
    "bestBuyOfferValue" DOUBLE PRECISION NOT NULL,
    "bestSaleOfferValue" DOUBLE PRECISION NOT NULL,
    "tradesCount" INTEGER NOT NULL,
    "stockTradesTotalCount" BIGINT NOT NULL,
    "volume" BIGINT NOT NULL,
    "stocksFactor" INTEGER NOT NULL,
    "isinCode" VARCHAR(100) NOT NULL,
    "stocksSharingNumber" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StocksTrading_id_key" ON "StocksTrading"("id");

-- CreateIndex
CREATE INDEX "StocksTrading_code_idx" ON "StocksTrading"("code");

-- CreateIndex
CREATE INDEX "StocksTrading_code_date_idx" ON "StocksTrading"("code", "date");

-- CreateIndex
CREATE UNIQUE INDEX "StocksTrading_identifierTradeCode_tradeTime_buyerCode_selle_key" ON "StocksTrading"("identifierTradeCode", "tradeTime", "buyerCode", "sellerCode", "code", "date", "price", "amount");

-- CreateIndex
CREATE UNIQUE INDEX "HistoricalSeries_id_key" ON "HistoricalSeries"("id");

-- CreateIndex
CREATE INDEX "HistoricalSeries_stockCode_idx" ON "HistoricalSeries"("stockCode");

-- CreateIndex
CREATE INDEX "HistoricalSeries_marketDate_idx" ON "HistoricalSeries"("marketDate");

-- CreateIndex
CREATE INDEX "HistoricalSeries_stockCode_marketDate_idx" ON "HistoricalSeries"("stockCode", "marketDate");

-- CreateIndex
CREATE UNIQUE INDEX "HistoricalSeries_stockCode_marketDate_marketType_bdiCode_co_key" ON "HistoricalSeries"("stockCode", "marketDate", "marketType", "bdiCode", "companyNameResume", "stockSpecification", "currency", "stocksFactor", "isinCode", "stocksSharingNumber");
