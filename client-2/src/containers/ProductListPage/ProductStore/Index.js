import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom';
import { getProductsbySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import Card from '../../../components/UI/Card/Index'
import './Style.css';
/**
* @author
* @function ProductStore
**/

export const ProductStore = (props) => {

    const product = useSelector(state => state.product);
    const dispatch = useDispatch();
    const { slug } = useParams();
    const [priceRange, setPriceRange] = useState({
        under20k: "Under 20,000",
        under30k: "Under 30,000",
        under40k: "Under 40,000",
        under50k: "Under 50,000",
        above50k: "Above 50,000"
    });
    useEffect(() => {
        dispatch(getProductsbySlug(slug));
    }, []);

    

    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <Card
                            headerLeft={`${slug.split('-')[0]} Product ${priceRange[key]}`}
                            headerRight={<button>View All</button>}
                            style={{
                                width: 'calc(100% - 40px)',
                                margin: '20px'
                            }}
                        >
                            <div style={{ display: 'flex' }} >
                                {
                                    product.productsByPrice[key].map(product =>
                                        <Link
                                            to={`/${product.slug}/${product._id}/p`}
                                            style={{ display: 'block' }}
                                            className='productContainer' >
                                            <div className='productImgContainer'>
                                                <img src={generatePublicUrl(product.productPictures[0].img)} alt={product.productPictures[0].img} />
                                            </div>
                                            <div className='productInfo'>
                                                <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                <div>
                                                    <span>4.4</span>&nbsp;
                                                    <span>4657</span>
                                                </div>
                                                <div className='productPrice'>{product.price} PKR</div>
                                            </div>
                                        </Link>
                                    )
                                }

                            </div>
                        </Card>
                    );
                })
            }

        </>
    )

}

export default ProductStore;