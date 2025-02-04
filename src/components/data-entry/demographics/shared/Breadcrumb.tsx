import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  currentPage: string;
}

const Breadcrumb = ({ currentPage }: BreadcrumbProps) => {
  return (
    <nav className="flex mt-2 text-sm text-gray-500" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="hover:text-gray-700">Home</Link>
        </li>
        <li>
          <div className="flex items-center">
            <span className="mx-2.5">/</span>
            <Link to="/data-entry" className="hover:text-gray-700">Data Entry</Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <span className="mx-2.5">/</span>
            <Link to="/data-entry/demographics" className="hover:text-gray-700">Demographics</Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <span className="mx-2.5">/</span>
            <span>{currentPage}</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;