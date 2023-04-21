import React from 'react'
import { Layout } from '../../components/Layout/Index';
import { useLocation } from 'react-router-dom';
import './style.css';
import ProductStore from './ProductStore/Index';
import getParams from '../../utils/getParams';
import ProductPage from './ProductPage/Index';

/**
* @author
* @function ProductListPage
**/

export const ProductListPage = (props) => {

    let location = useLocation();
    const renderProduct = () => {
        // console.log(location.search);
        const params = getParams(location.search);
        // console.log(params.type);
        let content = null;
        switch(params.type) {
            case 'store':
                content = <ProductStore {...props} />
                break;
            case 'page':
                content = <ProductPage {...props}/>
                break;
            default:
                content = null;            
        }

        return content;
    }

    return (
        <Layout>
            {renderProduct()}

        </Layout>
    )

}