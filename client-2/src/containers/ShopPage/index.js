/* eslint-disable jsx-a11y/anchor-is-valid */
import ShopCategorySkele from '../../AppComponent/loader/Shop.category';
import { Layout } from '../../components/Layout/Index';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ChevronDownIcon,
  FunnelIcon,
  PlusIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid';
import Product from '../../AppComponent/Product';

export default function Index() {
  const object = useSelector((state) => state.category); // Array of category object
  const { categorySlug } = useParams();
  const { categories } = object;

  const [Products, setProducts] = useState([]);

  // Responsible for fetching products
  const handleProducts = async (slug) => {
    const req = await fetch(`http://127.0.0.1:2000/OTP/product/${slug}`);
    const res = await req.json();
    if (res) {
      const { products } = res;
      setProducts(products);
    }
  };

  // Responsible for Toggle Categoryies menu
  const handleToggle = (event) => {
    const elements = document.getElementsByClassName(event);
    Array.from(elements).forEach((element) => {
      element.classList.toggle('hidden');
    });
  };

  // Responsible for rendering child category
  const renderCategory = (arr) => {
    if (arr.length === 0) return;
    return arr.map((item, idx) => {
      return (
        <ul
          key={item._id}
          className={`space-y-4 hidden border-b border-gray-200  text-xs cursor-pointer my-5 ${
            item.children.length === 0 ? 'text-zinc-600' : 'text-zinc-700'
          } ${item.parentId}`}
        >
          <li
            data-toggle={item._id}
            onClick={() => {
              handleToggle(item._id);
              item.children.length === 0 && handleProducts(item.slug);
            }}
            className="flex justify-between"
          >
            {item.children.length === 0 && '   - '}
            {item.name}

            {item.children.length > 0 && <PlusIcon className="w-3" />}
          </li>
          {renderCategory(item.children)}
        </ul>
      );
    });
  };

  useEffect(() => {
    handleProducts('Samsung-BQHo7ChIv');
    const elements = document.getElementsByClassName(categorySlug);
    categories.length > 0 &&
      Array.from(elements).forEach((element) => {
        element.classList.remove('hidden');
      });
  }, [categories]);

  return (
    <Layout>
      <div className="bg-white">
        <div>
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                New Arrivals
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {/* {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? 'font-medium text-gray-900'
                                    : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))} */}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => undefined}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul className="space-y-4 border-b cursor-pointer border-gray-200 pb-6 text-sm font-medium text-gray-900 ">
                    {categories.length > 0 ? (
                      categories.map((category, idx) => {
                        return (
                          <div key={category._id}>
                            <li
                              data-toggle={category._id}
                              onClick={() => handleToggle(category._id)}
                              className="flex justify-between"
                            >
                              {category.name}
                              <PlusIcon className="w-4" />
                            </li>
                            {renderCategory(category.children)}
                          </div>
                        );
                      })
                    ) : (
                      <ShopCategorySkele />
                    )}
                  </ul>
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
                      <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {Products.length > 0
                          ? Products.map((item, idx) => {
                              return <Product key={item._id} data={item} />;
                            })
                          : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
}
