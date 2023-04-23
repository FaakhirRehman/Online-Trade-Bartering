import React, { useEffect } from 'react'
import { Layout } from '../../components/Layout/Index';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsById } from '../../actions';
import { useParams } from 'react-router-dom';
import { 
    IoIosArrowForward, 
    IoIosCart, 
    IoIosStar, 
    IoMdCart 
  } from 'react-icons/io';
  import { AiFillThunderbolt } from 'react-icons/ai';
  import './Style.css';
import { generatePublicUrl } from '../../urlConfig';
import { MaterialButton } from '../../components/MaterialUI/Index';

/**
* @author
* @function ProductDetailsPage
**/

export const ProductDetailsPage = (props) => {

    const dispatch = useDispatch();
    const { productId } = useParams();
    const product = useSelector(state => state.product);
    const category = useSelector(state => state.category);

    useEffect(() => {

        console.log(productId);
        const payload = {
            params: {
                productId
            }
        }
        dispatch(getProductDetailsById(payload));
    }, []);

    if (Object.keys(product.productDetails).length === 0) {
        return null;
    }


    return (
        <Layout>
            {/* <div>{product.productDetails.name}</div> */}
            <div className="productDescriptionContainer">
                <div className="flexRow">
                    <div className="verticalImageStack">
                        {
                            product.productDetails.productPictures.map((thumb, index) =>
                                <div className="thumbnail">
                                    <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                                </div>
                            )
                        }
                        {/* <div className="thumbnail active">
                  {
                    product.productDetails.productPictures.map((thumb, index) => 
                    <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
                  }
                </div> */}
                    </div>
                    <div className="productDescContainer">
                        <div className="productDescImgContainer">
                            <img src={generatePublicUrl(product.productDetails.productPictures[0].img)} alt={`${product.productDetails.productPictures[0].img}`} />
                        </div>

                        {/* action buttons */}
                        <div className="flexRow" style={{ margin: '20px' }}>
                            <MaterialButton
                                title="ADD TO CART"
                                bgColor="#ff9f00"
                                textColor="#ffffff"
                                style={{
                                    marginRight: '5px'
                                }}
                                icon={<IoIosCart />}
                            />

                            <MaterialButton
                                title="BUY NOW"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{
                                    marginLeft: '5px'
                                }}
                                icon={<AiFillThunderbolt />}
                            />
                        </div>
                    </div>
                </div>
                <div>

                    {/* home > category > subCategory > productName */}
                    <div className="breed">
                        <ul>
                            <li><a href="#">Home</a><IoIosArrowForward /></li>
                            <li><a href="#">Mobiles</a><IoIosArrowForward /></li>
                            <li><a href="#">{category.name}</a><IoIosArrowForward /></li>
                            <li><a href="#">{product.productDetails.name}</a></li>
                        </ul>
                    </div>
                    {/* product description */}
                    <div className="productDetails">
                        <p className="productTitle">{product.productDetails.name}</p>
                        <div>
                            <span className="ratingCount">4.3 <IoIosStar /></span>
                            <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
                        </div>
                        <div className="extraOffer">Extra 4500 PKR off </div>
                        <div className="flexRow priceContainer">
                            <span className="price">{product.productDetails.price} PKR</span>
                            <span className="discount" style={{ margin: '0 10px' }}>22% off</span>
                            {/* <span>i</span> */}
                        </div>
                        <div>
                            <p style={{
                                color: '#212121',
                                fontSize: '14px',
                                fontWeight: '600'
                            }}>Available Offers</p>
                            <p style={{ display: 'flex' }}>
                                <span style={{
                                    width: '100px',
                                    fontSize: '12px',
                                    color: '#878787',
                                    fontWeight: '600',
                                    marginRight: '20px'
                                }}>Description</span>
                                <span style={{
                                    fontSize: '12px',
                                    color: '#212121',
                                }}>{product.productDetails.description}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )

}

export default ProductDetailsPage;