import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PopulationForm from "@/components/data-entry/demographics/population/PopulationForm";

const DataEntryPopulation = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1F2C]">Population Distribution Data Entry</h1>
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
                  <span>Population Distribution</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <PopulationForm />
      </div>
    </Layout>
  );
};

export default DataEntryPopulation;