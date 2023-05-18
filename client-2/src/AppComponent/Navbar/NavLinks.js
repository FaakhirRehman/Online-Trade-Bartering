import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => {
  return (
    <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
      <li>
        <Link to="/shop" className="hover:text-gray-200">
          Shop
        </Link>
      </li>

      <li>
        <a className="hover:text-gray-200" href="#">
          More
        </a>
      </li>
      <li>
        <a className="hover:text-gray-200" href="#">
          About Us
        </a>
      </li>
    </ul>
  );
};

export default NavLinks;
