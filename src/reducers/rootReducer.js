import { combineReducers} from "redux";
import {products} from "./products"
import {carts} from "./carts"

const rootReducer = combineReducers({
    carts,
    products
});

export default rootReducer;