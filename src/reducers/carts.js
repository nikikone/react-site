export function carts(state = [], action){
    switch (action.type){
        case "CARTS_FETCH_DATA_SUCCESS":
            return action.carts;
        default:
            return state;
    }
}