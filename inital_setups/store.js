/**
 * ? 1. Store holds the state
 * ? 2. Allow access of the state --> getState()
 * ? 3. Allow state to get updated --> dispatch()
 * ? 4. Have listener to know the updation --> subscribe
 * ? 5. Unsubscribe to the listener
 */
// import { legacy_createStore as createStore } from "redux";
const redux = require("redux");
const legacy_createStore = redux.legacy_createStore; //!: learn about legacy_createStore

//TODO: ACTION CREATORS
const CAKE_ORDERED = "CAKE_ORDERED";
function actionCreators() {
  return {
    type: CAKE_ORDERED,
  };
}

//TODO: INITAL STATE
const INITALSTATE = {
  cakeNumber: 10,
};

//TODO: REDUCER TO TAKE INITAL STATE AND ACTION
function reducer(state = INITALSTATE, action) {
  switch (action.type) {
    case CAKE_ORDERED: {
      return {
        ...state,
        cakeNumber: state.cakeNumber - 1,
      };
    }
    default: {
      return state;
    }
  }
}

//TODO: CREATE STORE BASED UPON THE REDUCER aka INITAL STATE
const store = legacy_createStore(reducer);

//TODO: GET INITAIL STATE
console.log("Inital state", store.getState());

//TODO: LISTENERS
store.subscribe(() => {
  console.log("Updated", store.getState());
});

//TODO: DISPATCH
store.dispatch(actionCreators());
store.dispatch(actionCreators());
store.dispatch(actionCreators());
