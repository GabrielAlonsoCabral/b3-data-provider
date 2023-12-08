-- Stocks Code summary x Year
CREATE MATERIALIZED VIEW MtVwStocksCodeSummary as (
	select 
	"stockCode",
	TO_CHAR(hs."marketDate",'yyyy') as "year",
	avg("openingValue") as "averageOpeningValue",
	max("maximalValue") as "maximalValue",
	min("minimalValue") as "minimalValue",
	avg("volume") as "averageVolume",
	(max("maximalValue") - min("minimalValue")) as "price_range"
	FROM "HistoricalSeries" hs
	group by hs."stockCode", "year" 
)

select * from MtVwStocksCodeSummary scs
where scs."stockCode" in ('GOAU4','PETR4','BBDC4','BBAS3')

-- OUTPUT EXAMPLE
BBAS3	2018	36.04436734693877	46.49	24.14	421645147.61224490	22.35
BBAS3	2019	49.27939516129032	55.91	43.01	559108482.20967742	12.899999999999999
BBDC4	2018	33.39555102040816	41.97	24.69	454914143.93061224	17.279999999999998
BBDC4	2019	37.081250000000004	46.5	31.36	642198874.64919355	15.14
GOAU4	2018	7.38657142857143	8.66	5.83	101970502.42040816	2.83
GOAU4	2019	6.967298387096774	9.28	5.69	72455129.100806451613	3.589999999999999
PETR4	2018	21.051959183673464	28.74	14.17	1439208703.91020408	14.569999999999999
PETR4	2019	27.261411290322574	31.23	22.28	1434653175.22177419	8.95


-- Volume X Year
create materialized view MtVwVolumeByYear as (
	select
		TO_CHAR(hs."marketDate",'yyyy') as "year",
		COUNT(*) as "series",
		sum(hs.volume) as "volume"
	from "HistoricalSeries" hs 
	group by "year"
)

select * from MtVwVolumeByYear  

-- EXAMPLE OUTPUT
YEAR 	SERIES 	VOLUME
2018	557611	2993714715503
2019	740249	4244721186708
2020	1177517	7355263701685