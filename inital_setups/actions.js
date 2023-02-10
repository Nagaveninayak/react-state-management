/**
 * ?: Action are objects
 * ?: One that carry the information from app to the store
 * ?: Usually contains type which holds the string
 * ?: type ---> that describes what to do
 * *: WHAT
 */

const CAKE_ORDERED = "CAKE_ORDERED";

//?: object with type
{
  type: CAKE_ORDERED;
}

//?: Having a action creator which creates action

function actionCreator() {
  return {
    type: CAKE_ORDERED,
    quantity: 1, //Can have key and value
  };
}
