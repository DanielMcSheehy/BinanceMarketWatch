# BinanceMarketWatch

#Installation
install npm (https://blog.teamtreehouse.com/install-node-js-npm-windows)
 
Using command line, go to desired directory to put project
then run 
`git clone https://github.com/DanielMcSheehy/BinanceMarketWatch.git`

Then run `npm i` to install node dependencies

Find an email address that will text you (1234567@sprint.pcs.com)
Go to https://postmail.invotes.com/accounts/manage/64b6a617-704d-49ca-b799-cbf28c7268f9
and register to that email address. 

Copy the key that is given to `config.json` under "email_api_key" 
(paste it into the quotations)
(Ex "email_api_key": "paste here")

In the config file, put desired binance coin symbol you want to be notified for, 
and bitcoin value of the miniumum value you want to be notified. 

You will be texted for any buy order worth more than the 
BTC value of `BITCOIN_LARGE_BUY_ORDER_FILTER`. Make this value bigger to 
receive less notifications (but you might miss lower buy order opertunities).

Run application with `node index.js`

To stop application in command line, do control C 

Ignore any cli messages about parsing issues. 
