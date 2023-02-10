/**
 * * Middleware are the third party libraries that can be added into the redux
 * * So that you can extend the redux functionalities
 */

/**
 * * Imagine having two different states that stores two values
 * * One for the cakes sold and other for the ice cream sold
 * * GOAL - to split the reducer, so each reducer have it's own purpose
 */
const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.legacy_createStore;
const combineReducer = redux.combineReducers;

//use the middleware logger
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger(); //TODO: learn more about loggers

//Use constant
const CAKE_ORDERED = "CAKE_ORDERED";
const ICE_CREAM_ORDERED = "ICE_CREAM_ORDERED";

//action generator seperate emm
function cakeActionGenerator() {
  return {
    type: CAKE_ORDERED,
  };
}

function iceCreamActionGenerator() {
  return {
    type: ICE_CREAM_ORDERED,
  };
}

//seperate reducers
const initialCakeState = {
  cakeNumbers: 10,
};

const initialIceCreamState = {
  iceCreamNumbers: 10,
};

function cakeReducer(state = initialCakeState, action) {
  switch (action.type) {
    case CAKE_ORDERED: {
      return {
        ...state,
        cakeNumbers: state.cakeNumbers - 1,
      };
    }
    default: {
      return state;
    }
  }
}

function iceCreamReducer(state = initialIceCreamState, action) {
  switch (action.type) {
    case ICE_CREAM_ORDERED: {
      return {
        ...state,
        iceCreamNumbers: state.iceCreamNumbers - 1,
      };
    }
    default: {
      return state;
    }
  }
}

//store
const rootReducer = combineReducer({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
console.log(
  "🚀 ~ file: multipleCombineReducer.js:65 ~ rootReducer",
  rootReducer
);

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("inital state", store.getState());

store.subscribe(() => {
  logger;
});

store.dispatch(cakeActionGenerator());
store.dispatch(iceCreamActionGenerator());
store.dispatch(cakeActionGenerator());
