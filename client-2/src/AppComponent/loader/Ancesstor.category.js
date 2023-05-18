import React from 'react';

const AncesstorCategorySkele = () => {
  const arr = [1, 2, 3, 4];
  return (
    <>
      {arr.map((idx) => {
        return (
          <li key={idx}>
            <div className="flex items-center animate-pulse  justify-center">
              <div
                key={idx}
                className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 w-[80px] "
              ></div>
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
      })}
      <li>
        <div className="flex items-center animate-pulse  justify-center">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 w-[80px] "></div>
        </div>
      </li>
    </>
  );
};

export default AncesstorCategorySkele;
