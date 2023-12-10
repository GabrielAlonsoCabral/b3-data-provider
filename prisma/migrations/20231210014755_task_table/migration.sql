-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('historicalSeries');

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "type" "TaskType" NOT NULL,
    "sourceKey" TEXT NOT NULL,
    "destinationKey" TEXT,
    "startDate" DATE NOT NULL,
    "closeDate" DATE,
    "processed" BOOLEAN NOT NULL,
    "errorMessage" TEXT,
    "inProgress" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_id_key" ON "Tasks"("id");
