import Head from "next/head";
import "tailwindcss/tailwind.css";
import Airtable from "airtable";
import { useEffect, useState, useRef } from "react";
import Founder from "../components/Founder";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Select from "react-select";
import locations from "./api/locations.js";

const base = new Airtable({ apiKey: "keynbSweRZKkwmlQX" }).base(
  "appvWRAi4zf0BYTR3"
);
const FILTER_STATE = {
  expertise: [],
  seeking: [],
  location: [],
};

export default function Home() {
  const [foundersState, setFoundersState] = useState([]);
  const [filterState, setFilterState] = useState(FILTER_STATE);
  const foundersRef = useRef([]);
  // Here we're getting the values from Airtable
  useEffect(() => {
    base("Looking for Cofounders")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        foundersRef.current = records;
        setFoundersState(records);
        console.log(records);
        fetchNextPage();
      });
  }, []);

  useEffect(() => {
    filterFounders();
  }, [filterState]);

  const filterFounders = () => {
    let filterValidation = Object.entries(filterState).reduce(
      (acc, [key, val]) => {
        if (val.length > 0) {
          acc.push({
            [key]: val.length === 0,
          });
        }
        return acc;
      },
      []
    );

    const founders = foundersRef.current.filter(({ fields }) => {
      const items = {
        expertise: fields["I'm a ... [Background]"][0],
        seeking: fields["Looking for ..."][0],
        location: fields["Your location (country)"],
      };
      const isFilterValid = filterValidation.reduce((acc, curr) => {
        const [key] = Object.keys(curr);
        return acc && filterState[key].includes(items[key]);
      }, true);
      return isFilterValid;
    });
    setFoundersState(founders);
  };

  const options = [
    { value: "TECH", label: "Tech" },
    { value: "DESIGN", label: "Design" },
    { value: "SALES", label: "Sales" },
    { value: "MARKETING", label: "Marketing" },
    { value: "HR", label: "Human Resources" },
  ];

  // We need to get location from Airtable + list of locations

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "blue" : "black",
    }),
  };

  // founder.fields["I'm a ... [Background]"]
  const setFilters = (filterType, data) => {
    const values = data.map(({ value }) => value);
    setFilterState((filters) => ({
      ...filters,
      [filterType]: values,
    }));
  };

  return (
    <>
      <Head>
        <title>Cofounder List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className=" min-h-screen w-full bg-black flex flex-col gap-4 px-40 items-start justify-center text-white">
        <div className="flex justify-between gap-4 w-full">
          <h3>Cofounders:</h3>
          <div className="flex gap-4">
            <span className="py-1 px-2 bg-indigo-500 rounded-md flex items-center">
              Filter by
              <ChevronRightIcon className="h-5 w-5" />
            </span>
            <span className="flex items-center gap-4">
              Cofounder background:
              <Select
                isMulti
                className="min-w-max w-40"
                styles={customStyles}
                options={options}
                onChange={(values) => setFilters("expertise", values)}
              />
            </span>
            <span className="flex items-center gap-4">
              Looking for
              <Select
                isMulti
                className="min-w-max w-40"
                styles={customStyles}
                options={options}
                onChange={(values) => setFilters("seeking", values)}
              />
            </span>
            <span className="flex items-center gap-4">
              Location:
              <Select
                isMulti
                className="min-w-max w-40"
                styles={customStyles}
                options={locations}
                onChange={(values) => setFilters("location", values)}
              />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {foundersState.map((founder) => (
            <Founder key={founder.id} founder={founder} />
          ))}
        </div>

        <Link href="/newCofounder">
          <button className="p-4 rounded-md bg-indigo-500 hover:bg-indigo-800 w-40 flex justify-center">
            Add your info
          </button>
        </Link>
      </div>
    </>
  );
}
