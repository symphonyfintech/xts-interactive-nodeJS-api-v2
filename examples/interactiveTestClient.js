//Accessing the Interactive and WS from node-xts-interactive-api library

var XTSInteractive = require('xts-interactive-api').Interactive;
var XTSInteractiveWS = require('xts-interactive-api').WS;
//uncomment line 6 and 7 and comment line 3 and 4 if you directly want to use the code from the example
//var XTSInteractive = require('../lib/interactiveRestAPI');
//var XTSInteractiveWS = require('../lib/interactiveSocket');
var config = require('./config/config.json');

let secretKey = config.secretKey;
let appKey = config.appKey;
let source = config.source;
let url = config.url;
let userID = null;

//xtsInteractive for API calls and xtsInteractiveWS for events related functionality
var xtsInteractive = null;
var xtsInteractiveWS = null;

(async () => {
  //creating the instance of XTSRest
  xtsInteractive = new XTSInteractive(url);

  //calling the logIn API
  var loginRequest = {
    secretKey,
    appKey,
    source,
  };
  let logIn = await xtsInteractive.logIn(loginRequest);

  // checking for valid loginRequest
  if (logIn && logIn.type == xtsInteractive.responseTypes.success) {
    //creating the instance of XTSInteractiveWS
    xtsInteractiveWS = new XTSInteractiveWS(url);
    userID = logIn.result.userID;

    //Instantiating the socket instance
    var socketInitRequest = {
      userID: logIn.result.userID,
      token: logIn.result.token, // Token Generated after successful LogIn
    };
    xtsInteractiveWS.init(socketInitRequest);

    //Registering the socket Events
    await registerEvents();

    //calling the remaining methods of the Interactive API
    testAPI();
  } else {
    //In case of failure
    console.error(logIn);
  }
})();

async function testAPI() {
  //calling to get the enums
  let reqObject = {
    userID: userID,
  };
  await getEnums(reqObject);

  //get user margin details
  reqObject = {
    clientID: userID,
  };
  await getBalance(reqObject);

  //get uuser profile details

  reqObject = {
    clientID: userID,
  };
  await getProfile(reqObject);

  let positionRequest = {
    dayOrNet: 'NetWise',
    clientID: userID,
  };

  // get user daywise and net wise position
  await getPositions(positionRequest);

  //get user holdings
  reqObject = {
    clientID: userID,
  };
  await getHoldings(reqObject);

  // get user order book details
  await getOrderBook();

  reqObject = {
    clientID: userID,
  };

  //get user trade book details
  await getTradeBook(reqObject);

  let placeOrderRequest = {
    exchangeSegment: 'NSECM',
    exchangeInstrumentID: 22,
    productType: 'NRML',
    orderType: 'MARKET',
    orderSide: 'BUY',
    timeInForce: 'DAY',
    disclosedQuantity: 0,
    orderQuantity: 20,
    limitPrice: 1500.0,
    stopPrice: 1600.0,
    orderUniqueIdentifier: '45485',
    clientID: userID,
  };

  //place order
  await placeOrder(placeOrderRequest);

  let modifyOrderRequest = {
    appOrderID: 1200037025,
    modifiedProductType: 'CO',
    modifiedOrderType: 'MARKET',
    modifiedOrderQuantity: 100,
    modifiedDisclosedQuantity: 0,
    modifiedLimitPrice: 300,
    modifiedStopPrice: 300,
    modifiedTimeInForce: 'DAY',
    orderUniqueIdentifier: '454845',
    clientID: userID,
  };

  // modify order
  await modifyOrder(modifyOrderRequest);

  let cancelOrderRequest = {
    appOrderID: 1828071433,
    orderUniqueIdentifier: 155151,
  };

  // cancel order
  await cancelOrder(cancelOrderRequest);

  let placeCoverOrderRequest = {
    exchangeSegment: 'NSECM',
    exchangeInstrumentID: 22,
    orderSide: 'Buy',
    orderQuantity: 2,
    disclosedQuantity: 0,
    limitPrice: 2054,
    stopPrice: 2054,
    orderType: 'MARKET',
    orderUniqueIdentifier: '45485',
    clientID: userID,
  };

  //place cover order
  await placeCoverOrder(placeCoverOrderRequest);

  let exitCoverOrderRequest = {
    appOrderID: '1400070884',
    clientID: userID,
    orderUniqueIdentifier: '454845',
  };

  //exit cover order
  await exitCoverOrder(exitCoverOrderRequest);

  let positionConversionRequest = {
    exchangeSegment: 'NSECM',
    exchangeInstrumentID: 1922,
    oldProductType: 'MIS',
    newProductType: 'CNC',
    isDayWise: false,
    targetQty: '1',
    clientID: userID,
  };

  // position conversion
  await positionConversion(positionConversionRequest);

  let bracketOrderRequest = {
    orderSide: 'BUY',
    disclosedQuantity: 0,
    exchangeSegment: 'NSECM',
    exchangeInstrumentID: 22,
    limitPrice: 1665.9,
    orderType: 'MARKET',
    orderQuantity: 1,
    squarOff: '1',
    stopLossPrice: 1,
    trailingStoploss: 0,
  };
  //bracketOrder
  await bracketOrder(bracketOrderRequest);

  let modifyBracketOrderRequest = {
    appOrderID: 2500070878,
    limitPrice: 1396.4,
    orderQuantity: 12,
    stopLossPrice: 365.5,
  };

  // modifyBracketOrder
  await modifyBracketOrder(modifyBracketOrderRequest);

  let deleteBracketOrderRequest = {
    boEntryOrderId: 2500070879,
  };

  //cancelBracketOrder
  await cancelBracketOrder(deleteBracketOrderRequest);

  //exchange message
  let exchangeMessageRequest = {
    exchangeSegment: 'NSECM',
  };
  await exchangeMessage(exchangeMessageRequest);

  let exchangeStatusRequest = {
    userID: userID,
  };
  //exchange status
  await exchangeStatus(exchangeStatusRequest);
}

var getEnums = async function (reqObject) {
  let response = await xtsInteractive.getEnums(reqObject);
  console.log(response);
  return response;
};

var getBalance = async function (reqObject) {
  let response = await xtsInteractive.getBalance();
  console.log(response);
  return response;
};

var getProfile = async function (reqObject) {
  let response = await xtsInteractive.getProfile(reqObject);
  console.log(response);
  return response;
};

var getPositions = async function (positionRequest) {
  let response = await xtsInteractive.getPositions(positionRequest);
  console.log(response);
  return response;
};

var getHoldings = async function (reqObject) {
  let response = await xtsInteractive.getHoldings(reqObject);
  console.log(response);
  return response;
};

var getOrderBook = async function () {
  let response = await xtsInteractive.getOrderBook();
  console.log(response);
  return response;
};

var bracketOrder = async function (reqObject) {
  let response = await xtsInteractive.bracketOrder(reqObject);
  console.log(response);
  return response;
};

var cancelBracketOrder = async function (reqObject) {
  let response = await xtsInteractive.cancelBracketOrder(reqObject);
  console.log(response);
  return response;
};

var modifyBracketOrder = async function (reqObject) {
  let response = await xtsInteractive.modifyBracketOrder(reqObject);
  console.log(response);
  return response;
};

var getTradeBook = async function (reqObject) {
  let response = await xtsInteractive.getTradeBook();
  console.log(response);
  return response;
};

var placeOrder = async function (placeOrderRequest) {
  let response = await xtsInteractive.placeOrder(placeOrderRequest);
  console.log(response);
  return response;
};

var modifyOrder = async function (modifyOrderRequest) {
  let response = await xtsInteractive.modifyOrder(modifyOrderRequest);
  console.log(response);
  return response;
};

var cancelOrder = async function (cancelOrderRequest) {
  let response = await xtsInteractive.cancelOrder(cancelOrderRequest);
  console.log(response);
  return response;
};

var placeCoverOrder = async function (placeCoverOrderRequest) {
  let response = await xtsInteractive.placeCoverOrder(placeCoverOrderRequest);
  console.log(response);
  return response;
};

var exitCoverOrder = async function (exitCoverOrderRequest) {
  let response = await xtsInteractive.exitCoverOrder(exitCoverOrderRequest);
  console.log(response);
  return response;
};

var positionConversion = async function (positionConversionRequest) {
  let response = await xtsInteractive.positionConversion(
    positionConversionRequest
  );
  console.log(response);
  return response;
};

var exchangeMessage = async function (exchangeMessageRequest) {
  let response = await xtsInteractive.exchangeMessage(exchangeMessageRequest);
  console.log(response);
  return response;
};

var exchangeStatus = async function (exchangeStatusRequest) {
  let response = await xtsInteractive.exchangeStatus(exchangeStatusRequest);
  console.log(response);
  return response;
};

var registerEvents = async function () {
  //instantiating the listeners for all event related data

  //"connect" event listener
  xtsInteractiveWS.onConnect((connectData) => {
    console.log(connectData);
  });

  //"joined" event listener
  xtsInteractiveWS.onJoined((joinedData) => {
    console.log(joinedData);
  });

  //"error" event listener
  xtsInteractiveWS.onError((errorData) => {
    console.log(errorData);
  });

  //"disconnect" event listener
  xtsInteractiveWS.onDisconnect((disconnectData) => {
    console.log(disconnectData);
  });

  //"order" event listener
  xtsInteractiveWS.onOrder((orderData) => {
    console.log(orderData);
  });

  //"trade" event listener
  xtsInteractiveWS.onTrade((tradeData) => {
    console.log(tradeData);
  });

  //"position" event listener
  xtsInteractiveWS.onPosition((positionData) => {
    console.log(positionData);
  });

  //"logout" event listener
  xtsInteractiveWS.onLogout((logoutData) => {
    console.log(logoutData);
  });
};
