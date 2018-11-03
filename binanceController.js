const fetch = require("isomorphic-fetch");
const fs = require('fs');
var format = require('date-format');
let tool = require('./notifications');
const Binance = require('node-binance-api');

module.exports = {
    /** 
     * @dev fetches market depth for given symbol
     */
    fetchOpenOrders: async() => {
        let rawdata = fs.readFileSync('config.json');  
        let symbols_watch_list = JSON.parse(rawdata).symbols_watch_list;  
        let comparison = JSON.parse(rawdata).comparison; 
        let buy_order_filter = JSON.parse(rawdata).BITCOIN_LARGE_BUY_ORDER_FILTER;  

        const binance = new Binance();

        binance.depth("ETHBTC", (error, depth, symbol) => {
            if (error) {
                throw error;
            }
            searchForLargeBuyOrders(depth, buy_order_filter, symbol);
        });
    }, 

    /** 
     * @dev Uses websockets and binance api to get market depth of specific symbol
     *  @param {string} symbol symbol (ex: ETHBTC)
     *  @param {int} buy_order_filter BTC value of a buy order that will send a notification
     */
    MarketDepthSubscription: (symbol, buy_order_filter) => {
        const binance = new Binance();  
        binance.websockets.depth([symbol], (depth) => {
            let {e:eventType, E:eventTime, s:symbol, u:updateId, b:bidDepth, a:askDepth} = depth;
            searchForLargeBuyOrders(bidDepth, buy_order_filter, symbol)
        });
    }
}

/** 
 * @dev Searches for buy orders that are equal or higher than BTC value of filter (in config)
 *  @param {obj} binance_data returned market depth from binance api
 *  @param {int} buy_order_filter BTC value of a buy order that will send a notification
 */
let searchForLargeBuyOrders = (bidDepth, buy_order_filter, symbol) => {
    let symbol_price = bidDepth[0][0];
    let value = bidDepth[0][1];
    let btc_value = symbol_price*value;
        if (symbol_price !== undefined && value !== undefined && btc_value >= buy_order_filter) {
            console.log(symbol, ' : ', btc_value);
            // Send Notification email about large buy order
            tool.sendEmail(symbol + ' Large Buy Order', btc_value + ' BTC');
        }
}
