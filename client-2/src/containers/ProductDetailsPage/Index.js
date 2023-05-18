/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import Layout from '../../components/Layout/Index';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getProductDetailsById } from '../../actions';
import Product from '../../AppComponent/Product';
import ProductSkele from '../../AppComponent/loader/ProductSkele';
import CurrencyFormatter from '../../AppComponent/CurrencyFormatter';
import AncesstorCategory from '../../AppComponent/loader/Ancesstor.category';
import AncesstorCategorySkele from '../../AppComponent/loader/Ancesstor.category';
import Toastify from '../../AppComponent/Toastify';
import ToastMessage from '../../AppComponent/ToastMessage';
import { toast } from 'react-toastify';

export default function ProductDetailsPage() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);
  const [reconmProducts, setReconmProducts] = useState([]);
  const [ancestors, setAncestors] = useState([]);

  const [Estimation, setEstimation] = useState({});

  const navigateToCart = () => {
    navigate('/cart');
  };

  const reconmendProducts = async (data) => {
    try {
      const res = await fetch('/api/reconmendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
      });
      const r = await res.json();
      if (r) {
        setReconmProducts(r);
      }
    } catch (error) {}
  };
  const EstimationPrice = async (pr) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/estimation/${pr}`);
      const json = await res.json();
      if (json) {
        setEstimation(json);
      }
    } catch (error) {
      toast.error('Server connection failed', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  // Returns ancestor of product :: Electronic Device > Mobile Phones > Samsung > S21 Ultra
  function findAncestors(categoryList, categoryId) {
    const ancestors = [];
    let discardList = [];
    let currentList = categoryList;
    let key = categoryId;
    let iteration = 0;

    while (true) {
      if (currentList.length === iteration) {
        discardList.push(currentList[iteration - 1].parentId);
        currentList = categoryList;
        iteration = 0;
        continue;
      }
      if (discardList.includes(currentList[iteration]._id)) {
        iteration += 1;
        continue;
      }
      if (currentList[iteration]._id === key) {
        ancestors.unshift(currentList[iteration].name);

        if ('parentId' in currentList[iteration]) {
          key = currentList[iteration].parentId;
          currentList = categoryList;
          iteration = 0;
          continue;
        } else {
          break;
        }
      } else if (currentList[iteration].children.length === 0) {
        iteration += 1;
        continue;
      } else {
        currentList = currentList[iteration].children;
        iteration = 0;
        continue;
      }
    }
    return ancestors;
  }

  useEffect(() => {
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  useEffect(() => {
    if (category.categories.length > 0 && product.productDetails.category) {
      const ancsArr = findAncestors(
        category.categories,
        product.productDetails.category
      );

      setAncestors(() => ['Home', ...ancsArr]);
      EstimationPrice(product.productDetails.name);
      reconmendProducts({
        _id: product.productDetails._id,
        name: product.productDetails.name,
        description: product.productDetails.description,
        categories: ancsArr.join(' '),
        price: '',
      });
    }
  }, [category.categories.length, product.productDetails.category]);

  return (
    <Layout>
      <Toastify />
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {ancestors.length > 0 ? (
                ancestors.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className="flex items-center">
                        <a className="font-medium text-gray-500 hover:text-gray-600 text-sm">
                          {item}
                        </a>
                        <svg
                          width={16}
                          height={20}
                          viewBox="0 0 16 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-5 w-4 text-gray-300"
                        >
                          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                      </div>
                    </li>
                  );
                })
              ) : (
                <AncesstorCategorySkele />
              )}

              {ancestors.length > 0 && (
                <li className="text-sm">
                  <a
                    href={product.href}
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {product.productDetails.name}
                  </a>
                </li>
              )}
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="{product.images[2].alt}"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="{product.images[3].alt}"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.productDetails.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {<CurrencyFormatter amount={product.productDetails.price} />}
              </p>
              {Object.keys(Estimation).length ? (
                <p className="mt-2 flex  items-center">
                  Estimated Price:-
                  <CurrencyFormatter
                    amount={
                      parseInt(Estimation.Daraz) + parseInt(Estimation.OLX)
                    }
                  />
                </p>
              ) : (
                <div className="animate-pulse flex mt-2 mb-2">
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 w-[80px] "></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 w-[80px] ms-2"></div>
                </div>
              )}

              <p className="text-xs text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti dignissimos, atque sint numquam incidunt amet quo
                accusantium vero fuga magni!
              </p>

              <div className="w-ful my-5">
                <button
                  className="bg-zinc-900 text-white p-3 w-full rounded hover:bg-zinc-800"
                  onClick={() => {
                    const { _id, name, price } = product.productDetails;
                    const img = product.productDetails.productPictures[0].img;
                    dispatch(
                      addToCart({
                        _id,
                        name,
                        price,
                        img,
                      })
                    );
                    navigateToCart();
                  }}
                >
                  Add to Card
                </button>
              </div>
              <div className="w-ful my-5">
                <button
                  className="bg-zinc-900 text-white p-3 w-full rounded hover:bg-zinc-800"
                  onClick={() => navigate('/shop')}
                >
                  Continue Shopping
                </button>
              </div>
              <div className="w-ful my-5">
                <button className="bg-zinc-900 text-white p-3 w-full rounded hover:bg-zinc-800">
                  Proceed
                </button>
              </div>
            </div>

            <div className="pb-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 ">
              {/* Description and details */}
              {/* <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.productDetails.description}
                  </p>
                </div>
              </div> */}

              <div className="mt-1">
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {product.productDetails.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8 mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900  my-10">
          Reconmended Products
        </h1>
        <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {reconmProducts.length > 0 ? (
            reconmProducts.map((item, idx) => {
              return <Product key={idx} data={item} />;
            })
          ) : (
            <>
              <ProductSkele />
              <ProductSkele />
              <ProductSkele />
              <ProductSkele />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
