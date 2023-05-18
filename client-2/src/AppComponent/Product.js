import { Link } from 'react-router-dom';
import CurrencyFormatter from './CurrencyFormatter';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { generatePublicUrl } from '../urlConfig';
export default function Product({ data }) {
  const [ratingArr, setRatingArr] = useState([1]);

  useEffect(() => {
    const rating = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    const arr = Array.from(
      { length: rating },
      () => Math.floor(Math.random() * 10) + 1
    );
    setRatingArr(arr);
  }, []);

  return (
    <div className="group relative shadow-md rounded-sm">
      <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md  bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-48">
        <Link to="/">
          <img
            src={generatePublicUrl(data.productPictures[0].img)}
            alt={data.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </Link>
      </div>
      <div className="mt-2 mb-1 flex flex-col px-2">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            <Link to={`/${data.slug}/${data._id}/p`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {data.name}
            </Link>
          </h3>
          <span className="w-full flex">
            {ratingArr.map((idx) => {
              return (
                <svg
                  key={uuidv4()}
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 64 64"
                >
                  <path
                    fill="#ffce31"
                    d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z"
                  />
                </svg>
              );
            })}
          </span>
        </div>
        <p className="text-sm font-medium text-gray-600">
          <CurrencyFormatter amount={data.price} />
        </p>
      </div>
    </div>
  );
}
