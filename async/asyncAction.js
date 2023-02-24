/**
 * 1. async is when you need to wait for the api response
 * 2. usually in async, the state contains isloading, data and error fields
 * 3. Reducer also contains the switch to get the data / request, get the success response and get the error response
 * 4. Add redux thunk
 * 5. Redux thunk is used for the async action creators
 */
const redux = require("redux");
const axios = require("axios");
const thunk = require("redux-thunk").default;
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;

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

//TODO: redux async action generator using thunk
const fetchUser = () => {
  //The function is the async function
  return function (dispatch) {
    dispatch(dynamicRequestGenerator(CONSTANT_VALUES.FETCH_USER_REQUEST));
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const user = response.data.map((users) => users.name);
        dispatch(
          dynamicRequestGenerator(CONSTANT_VALUES.FETCH_SUCCESS_REQUEST, user)
        );
      })
      .catch((error) => {
        dispatch(
          dynamicRequestGenerator(
            CONSTANT_VALUES.FETCH_FAILURE_REQUEST,
            error.message
          )
        );
      });
  };
};

//TODO: create the store
const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUser());

//! Make sure that the subscribe is added before dispatch in order to get all the logs - chanfe check
