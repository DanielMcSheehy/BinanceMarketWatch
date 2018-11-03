const fs = require('fs');
let tool = require('./notifications');
let binaceInterface = require('./binanceController');

let rawdata = fs.readFileSync('config.json');  
let buy_order_filter = JSON.parse(rawdata).BITCOIN_LARGE_BUY_ORDER_FILTER;
let symbols_watch_list = JSON.parse(rawdata).symbols_watch_list;
let comparison = JSON.parse(rawdata).comparison;

symbols_watch_list.map((symbol) => {
    binaceInterface.MarketDepthSubscription(symbol + comparison, buy_order_filter);
})



