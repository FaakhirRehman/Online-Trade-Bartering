import { GridCategory, HorizontalCategory } from '../../AppComponent/Category';
import {
  GridCategorySkele,
  HorizontalCategorySkele,
} from '../../AppComponent/loader/Home.category';
import { Layout } from '../../components/Layout/Index';
import Newsletter from '../../AppComponent/Newsletter';
import Hero from '../../AppComponent/Hero';
import { useSelector } from 'react-redux';
import React from 'react';
import Product from '../../AppComponent/Product';
import ProductSkele from '../../AppComponent/loader/ProductSkele';

export const HomePage = () => {
  const object = useSelector((state) => state.category);
  const { categories } = object; // Array of category object

  const randomSelection = [...categories];
  randomSelection.sort(() => Math.random() - 0.5);
  const ParentCategory = randomSelection.slice(0, 4);
  const ChildCategory = randomSelection.slice(4, 7);
  const dummyProducts = [];
  return (
    <Layout>
      <Hero />
      {categories.length > 0 ? (
        <GridCategory data={ParentCategory} />
      ) : (
        <GridCategorySkele />
      )}

      <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8 mb-10">
        <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {dummyProducts.length > 0 ? (
            dummyProducts.map((item, idx) => {
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
      {categories.length > 0 ? (
        <HorizontalCategory data={ChildCategory} />
      ) : (
        <HorizontalCategorySkele />
      )}

      <Newsletter />
    </Layout>
  );
};

export default HomePage;
