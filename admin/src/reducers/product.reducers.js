import { productConstants } from "../actions/constants";

const inititalState = {
    products: []
}

export default (state = inititalState, action) => {
    switch(action.type){
        case productConstants.GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
        break;
    }

    return state;
}