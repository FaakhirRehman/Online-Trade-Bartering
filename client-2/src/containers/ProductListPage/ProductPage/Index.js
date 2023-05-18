import React, { useEffect } from 'react';
import { getProductPage } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import getParams from '../../../utils/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { generatePublicUrl } from '../../../urlConfig';
import Card from '../../../components/UI/Card/Index';

/**
* @author
* @function ProductPage

**/

export const ProductPage
    = (props) => {

        const dispatch = useDispatch();
        const product = useSelector(state => state.product);
        let location = useLocation();
        const { page } = product;

        useEffect(() => {
            const search = getParams(location.search);
            const payload = {
                search
            }
            dispatch(getProductPage(payload));
        }, []);

        return (
            <div style={{ margin: '0 10px' }}>
                <h3>{page.title}</h3>
                <Carousel
                    renderThumbs={() => { }}
                >
                    {
                        page.banners && page.banners.map((banner, index) =>
                            <a key={index}
                                style={{ display: 'block' }}
                                href={banner.navigateTo}
                            >
                                <img src={`http://localhost:2000${banner.img}`} alt="Unable to load" height={'500px'} />
                            </a>
                        )
                    }
                </Carousel>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    margin: '10px 5px'
                }}>
                    {
                        page.products && page.products.map((product, index) =>
                            <Card
                                key={index}
                                style={{
                                    width: '400px',
                                    height: '200px',
                                    margin: '5px 5px'
                                }}
                            >
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    src={`http://localhost:2000${product.img}`}
                                    alt='Unable to Load' />
                            </Card>
                        )
                    }
                </div>
            </div>
        )

    }

export default ProductPage;