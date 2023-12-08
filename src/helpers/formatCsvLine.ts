import { HistoricalSeries } from "@prisma/client";
import dayjs from "dayjs";
import { ICsvLine } from "../types/processHistoricalSeries";

function convertBigInt(value:string){
    return BigInt(Math.floor(Number(value)))     
}

export function formatCsvItem(item:ICsvLine):Omit<HistoricalSeries,'id'>{
    return {
        volume:convertBigInt(item.VOLUME),
        averageValue:Number(item.AVERAGE_VALUE),
        bdiCode:item.BDI_CODE,
        bestBuyOfferValue:Number(item.BEST_BUY_OFFER),
        bestSaleOfferValue:Number(item.BEST_SALE_OFFER),
        closeValue:Number(item.LAST_OFFER_VALUE),
        companyNameResume:item.COMPANY_NAME_RESUME,
        currency:item.CURRENCY_REFERENCE,
        tradesCount:Number(item.TRADES_COUNT),
        stockTradesTotalCount: convertBigInt(item.STOCKS_TRADES_TOTAL_COUNT),
        stocksSharingNumber:Number(item.STOCKS_SHARING_NUMBER),
        stockSpecification:item.STOCK_SPECIFICATION,
        stocksFactor:Number(item.STOCKS_FACTOR),
        stockCode:item.STOCKS_LETTER_CODE,
        registerType:Number(item.REGISTER_TYPE),
        openingValue:Number(item.OPENING_VALUE),
        minimalValue:Number(item.MIN_VALUE),
        maximalValue:Number(item.MAX_VALUE),
        marketType:Number(item.MARKET_TYPE),
        marketDate:dayjs(item.MARKET_DATE).toDate(),
        isinCode:item.ISIN_CODE
    }
}
