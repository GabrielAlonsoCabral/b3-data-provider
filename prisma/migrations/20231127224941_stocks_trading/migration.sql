-- CreateTable
CREATE TABLE "StocksTrading" (
    "id" UUID NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "StocksTrading_id_key" ON "StocksTrading"("id");

-- CreateIndex
CREATE INDEX "StocksTrading_code_idx" ON "StocksTrading"("code");

-- CreateIndex
CREATE INDEX "StocksTrading_code_date_idx" ON "StocksTrading"("code", "date");
