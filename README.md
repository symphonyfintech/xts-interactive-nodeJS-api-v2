# xts-interactive-nodeJS-api-v2

Welcome to the XTS-Interactive-API SDK version 3, This repository is Official Node.js library for Symphony XTS-Interactive-API.

API Documentation for XTS-trading API can be found in the below link.

https://symphonyfintech.com/xts-trading-front-end-api/

The XTS Trading API provides developer, data-scientist, financial analyst and investor the functionality necessary to create automated trading strategies, as well as other trading related applications with support of XTS OEMS hosted by Financial Institutions to trade with Indian electronic exchanges.

With the use of the socket.io library, the API has streaming capability and will push data notifications in a JSON format. Your application can place orders and receive real-time trade notification.

There is also an examples folder available which illustrates how to create a connection to XTS OEMS hosted by Brokers to subscribe to real-time events.
Please request for apikeys with Symphony Fintech developer support team to start integrating your application with XTS OEMS.

## Installation

```bash
npm install xts-interactive-api
```

## Usage

Access the interactive component of xts-interactive-api like below.

```js
var XTSInteractive = require('xts-interactive-api').Interactive;
```

Creating the instance of xtsInteractive

```js
xtsInteractive = new XTSInteractive(“https://developers.symphonyfintech.in”);
```

call the login API to generate the token

```js
var loginRequest = {
  secretKey: 'Abcd@123',
  appKey: '5a75a3616cabe678',
};

let logIn = await xtsInteractive.logIn(loginRequest);
```

Once the token is generated and userID is retrieved you can call any api provided in the documentation. All API’s are easy to integrate and implemented with async-await mechanism.
Below is the sample Code snippet which calls the balance API.

```js
let balance = await xtsInteractive.getBalance();

console.log(balance);
```

## Instantiating the XTSInteractiveWS

This component provides functionality to access the socket related events. All real-time events can be registered via XTSInteractiveWS.
After token is generated, you can access the socket component and instantiate the socket Instance and call the init method of the socket like below

```js
var XTSInteractiveWS = require('xts-interactive-api').WS;
xtsInteractiveWS = new XTSInteractiveWS(“https://developers.symphonyfintech.in”);
var socketInitRequest = {
	userID: “AJ01”,
	apiType:“INTERACTIVE”,
	token: logIn.result.token   // Token Generated after successful LogIn
}
xtsInteractiveWS.init(socketInitRequest);
```

You can now register events to listen to the real time order and trade updates and will be receiving the json objects in the response.

```js
xtsInteractiveWS.onConnect((connectData) => {
  console.log(connectData);
});
xtsInteractiveWS.onJoined((joinedData) => {
  console.log(joinedData);
});
xtsInteractiveWS.onError((errorData) => {
  console.log(errorData);
});
xtsInteractiveWS.onDisconnect((disconnectData) => {
  console.log(disconnectData);
});
xtsInteractiveWS.onOrder((orderData) => {
  console.log(orderData);
});
xtsInteractiveWS.onTrade((tradeData) => {
  console.log(tradeData);
});
xtsInteractiveWS.onPosition((positionData) => {
  console.log(positionData);
});
xtsInteractiveWS.onLogout((logoutData) => {
  console.log(logoutData);
});
```

## Detailed explanation of API and socket related events

Below is the brief information related to api’s provided by XTS-Interactive-API SDK.

## Orders API

## placeOrder

Calls POST /order.

```js
let response = await xtsInteractive.placeOrder({
  exchangeSegment: xtsInteractive.exchangeInfo.NSECM,
  exchangeInstrumentID: 22, // can use "ACC-EQ" as well
  productType: xtsInteractive.productTypes.MIS,
  orderType: xtsInteractive.orderTypes.Limit,
  orderSide: xtsInteractive.orderSide.BUY,
  timeInForce: xtsInteractive.dayOrNet.DAY,
  disclosedQuantity: 0,
  orderQuantity: 20,
  limitPrice: 1500.0,
  stopPrice: 1600.0,
  orderUniqueIdentifier: '45485',
});
```

## modifyOrder

Calls PUT /order.

```js
let response = await xtsInteractive.modifyOrder({
  appOrderID: 1991237756,
  modifiedProductType: xtsInteractive.productTypes.NRML,
  modifiedOrderType: xtsInteractive.orderTypes.Limit,
  modifiedOrderQuantity: 100,
  modifiedDisclosedQuantity: 0,
  modifiedLimitPrice: 300,
  modifiedStopPrice: 300,
  modifiedTimeInForce: xtsInteractive.dayOrNet.DAY,
  orderUniqueIdentifier: '5656',
});
```

## cancelOrder

Calls DELETE /order.

```js
let response = await xtsInteractive.cancelOrder({
  appOrderID: 1828071433,
  orderUniqueIdentifier: 155151,
});
```

## placeCoverOrder

Calls POST /order/cover.

```js
let response = await xtsInteractive.placeCoverOrder({
  exchangeSegment: xtsInteractive.exchangeInfo.NSECM,
  exchangeInstrumentID: 22, //can use "ACC-EQ" as well
  orderSide: xtsInteractive.orderSide.BUY,
  orderQuantity: 2,
  disclosedQuantity: 2,
  limitPrice: 2054,
  stopPrice: 2054,
  orderUniqueIdentifier: '45485',
});
```

## exitCoverOrder

Calls PUT /order/cover.

```js
let response = await xtsInteractive.exitCoverOrder("2426016103"));
```

## getOrderBook

calls GET /order

```js
let response = await xtsInteractive.getOrderBook();
```

## getTradeBook

calls GET /order/trade

```js
let response = await xtsInteractive.getTradeBook();
```

## Positions API

## getPositions

calls GET /portfolio/position

```js
let response = await xtsInteractive.getPositions({
  dayOrNet: xtsInteractive.dayOrNet.DAY,
});
```

## positionConversion

Calls PUT /portfolio/position/convert

```js
let response = await xtsInteractive.positionConversion({
  exchangeSegment: 'NSECM',
  exchangeInstrumentID: 22,
  oldProductType: xtsInteractive.productTypes.NRML,
  newProductType: xtsInteractive.productTypes.MIS,
  isDayWise: true,
  targetQty: 1,
});
```

## squareOff

Calls PUT /portfolio/squareoff

```js
let response = await xtsInteractive.squareOff({
  exchangeSegment: xtsInteractive.exchangeInfo.NSECM,
  exchangeInstrumentID: 22,
  productType: xtsInteractive.productTypes.NRML,
  squareoffMode: xtsInteractive.positionSqureOffMode.DayWise,
  positionSquareOffQuantityType:
    xtsInteractive.positionSquareOffQuantityType.ExactQty,
  squareOffQtyValue: 5,
});
```

## Holdings API

## getHoldings

Calls GET /portfolio/holding

```js
let response = await xtsInteractive.getHoldings();
```

## Balance API

## getBalance

Calls GET /users/balance

```js
let response = await xtsInteractive.getBalance();
```

## Profile API

## getProfile

Calls GET /users/profile

```js
let response = await xtsInteractive.getProfile();
```

Below is the brief information related to streaming events provided by XTS-Interactive-API SDK.

```js
xtsInteractiveWS.init(socketInitRequest); // Init the socket instance
xtsInteractiveWS.onConnect((connectData) => {}); //registering for Connect event
xtsInteractiveWS.onJoined((joinedData) => {}); //registering for Joined event
xtsInteractiveWS.onError((errorData) => {}); //registering for Error event
xtsInteractiveWS.onDisconnect((disconnectData) => {}); //registering for Disconnect event
xtsInteractiveWS.onOrder((orderData) => {}); //registering for Order event
xtsInteractiveWS.onTrade((tradeData) => {}); //registering for Trade event
xtsInteractiveWS.onPosition((positionData) => {}); //registering for Position event
xtsInteractiveWS.onLogout((logoutData) => {}); //registering for Logout event
```

We do have a market data component which will provide the streaming of our real-time streaming market data. For more info please check the following link.

https://symphonyfintech.com/xts-market-data-front-end-api/
