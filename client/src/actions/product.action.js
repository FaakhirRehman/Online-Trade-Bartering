import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsbySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/product/${slug}`);
        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: res.data
            });
        } else {
            dispatch({
                error: res.data.error
            })
        }
    }
}

export const getProductPage = (payload) => {
    return async dispatch => {
        try {
            const { cid, type } = payload.search;
            const res = await axios.get(`/page/${cid}/${type}`);
            console.log("res",res);
            dispatch({
                type: productConstants.GET_PRODUCT_PAGE_REQUEST,
            });

            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                })
                //console.log(page);
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}