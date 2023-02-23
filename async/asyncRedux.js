/**
 * 1. async is when you need to wait for the api response
 * 2. usually in async, the state contains isloading, data and error fields
 * 3. Reducer also contains the switch to get the data / request, get the success response and get the error response
 */
const redux = require("redux");
const createStore = redux.legacy_createStore;

//TODO: Setting up inital state
const INITAL_STATE = {
  isloading: false,
  data: [],
  error: "",
};

//TODO: Action generators
const CONSTANT_VALUES = {
  FETCH_USER_REQUEST: "FETCH_USER_REQUEST",
  FETCH_SUCCESS_REQUEST: "FETCH_SUCCESS_REQUEST",
  FETCH_FAILURE_REQUEST: "FETCH_FAILURE_REQUEST",
};

const userRequestGenerator = () => {
  return {
    type: CONSTANT_VALUES.FETCH_USER_REQUEST,
  };
};

const successRequestGenerator = (user) => {
  return {
    type: CONSTANT_VALUES.FETCH_SUCCESS_REQUEST,
    payload: user,
  };
};

const errorRequestGenerator = (error) => {
  return {
    type: CONSTANT_VALUES.FETCH_FAILURE_REQUEST,
    payload: error,
  };
};

const dynamicRequestGenerator = (type, payload = null) => {
  return {
    type,
    payload,
  };
};

//TODO: Reducer
const reducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case CONSTANT_VALUES.FETCH_USER_REQUEST: {
      return {
        ...state,
        isloading: true,
      };
    }
    case CONSTANT_VALUES.FETCH_SUCCESS_REQUEST: {
      return {
        isloading: false,
        data: action.payload,
        error: "",
      };
    }
    case CONSTANT_VALUES.FETCH_FAILURE_REQUEST: {
      return {
        isloading: false,
        data: [],
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

//TODO: create the store
const store = createStore(reducer);
//console.log(store.getState());

store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(userRequestGenerator());
store.dispatch(successRequestGenerator(10));
store.dispatch(errorRequestGenerator("error"));

store.dispatch(dynamicRequestGenerator(CONSTANT_VALUES.FETCH_USER_REQUEST));
store.dispatch(
  dynamicRequestGenerator(CONSTANT_VALUES.FETCH_SUCCESS_REQUEST, 20)
);
store.dispatch(
  dynamicRequestGenerator(CONSTANT_VALUES.FETCH_FAILURE_REQUEST, "error 2")
);
