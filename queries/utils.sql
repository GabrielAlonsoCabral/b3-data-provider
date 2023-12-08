select * from financial.public."StocksTrading" st 
select count(*) from "StocksTrading" st 


-- STOCKS X VOLUME (BY DAY)
select 
	"date",
	"code",
	sum("price")::numeric * sum("amount")::numeric as "volume"
from "StocksTrading" st 
group by "code","date"
order by "volume" desc

-- STOCKS X trades_count (BY DAY)
select 
	"date",
	"code",
	count(*) as "trades_count"
from "StocksTrading" st 
group by "code","date"
order by "trades_count" desc


-- CREATE STOCKS CODE SUMMARY MATERIALIZED VIEW
CREATE MATERIALIZED VIEW MtVwStocksCodeSummary as (
	select 
	"stockCode",
	max("openingValue") as "maximalOpeningValue",
	avg("openingValue") as "averageOpeningValue",
	max("closeValue") as "maximalCloseValue",
	max("maximalValue") as "maximalMaximalValue",
	min("minimalValue") as "minimalMinimalValue",
	avg("volume") as "averageVolume"
	FROM "HistoricalSeries" hs
	group by hs."stockCode" 
)
refresh materialized view MtVwStocksCodeSummary

select * from MtVwStocksCodeSummary scs
where scs."stockCode" = 'GOAU4'
