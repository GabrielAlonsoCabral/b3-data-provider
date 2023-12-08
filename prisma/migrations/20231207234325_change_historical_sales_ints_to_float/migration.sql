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
CREATE UNIQUE INDEX "HistoricalSeries_id_key" ON "HistoricalSeries"("id");
