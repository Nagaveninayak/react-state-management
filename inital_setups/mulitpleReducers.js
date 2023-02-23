/**
 * * Imagine having two different states that stores two values
 * * One for the cakes sold and other for the ice cream sold
 * * GOAL - to use single reducer
 */
const redux = require("redux");
const legacy_createStore = redux.legacy_createStore;

//TODO: constant for the type name
const ORDERS = {
  CAKE_ORDERED: "CAKE_ORDERED",
  ICE_CREAM_ORDERED: "ICE_CREAM_ORDERED",
};

//TODO: create a action generator
function actionGenerator(dynamicType) {
  return {
    type: dynamicType, //dynamic type aka CAKE_ORDERED || ICE_CREAM_ORDERED
  };
}

const INITIAL_STATE = {
  cakeNumber: 10,
  iceCreamNumber: 10,
};

//TODO: single reducer
function singleReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ORDERS.CAKE_ORDERED: {
      return {
        ...state,
        cakeNumber: state.cakeNumber - 1,
      };
    }
    case ORDERS.ICE_CREAM_ORDERED: {
      return {
        ...state,
        iceCreamNumber: state.iceCreamNumber - 1,
      };
    }
    default: {
      return state;
    }
  }
}

//TODO: create a store
const store = legacy_createStore(singleReducer);
console.log(store.getState());

const deSubscribe = store.subscribe(() => {
  console.log(store.getState());
});

//TODO: dispatch the cake
store.dispatch(actionGenerator(ORDERS.CAKE_ORDERED));
store.dispatch(actionGenerator(ORDERS.ICE_CREAM_ORDERED));
