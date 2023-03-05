import { productConstants } from "../actions/constants"

const initState = {
    products: [],
    productsByPrice: {
        under20k: [],
        under30k: [],
        under40k: [],
        under50k: [],
        above50k: []
    }
}

export default (state = initState, action) => {
    switch(action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
            break;
    }

    return state;
}