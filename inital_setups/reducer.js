/**
 * ?: Reducer where the state update takes place
 * ?: function with 2 parameters --> state and action
 * ?: return --> new state (default same state)
 * *: HOW
 */

// State is a object
const INITIALSTATE = {
  cakeNumber: 10,
};

function reducer(state = INITIALSTATE, action) {
  switch (action.type) {
    case CAKE_ORDERED: {
      return {
        ...state, //TO create a new object aka pure reducer, this creates a state and changes only the cakeNumber property
        cakeNumber: state.cakeNumber - 1,
      };
    }
    default: {
      return state;
    }
  }
}
