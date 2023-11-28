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
