import Head from "next/head";
import "tailwindcss/tailwind.css";
import Airtable from "airtable";
import { useEffect, useState, useRef } from "react";
import Founder from "../components/Founder";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Select from "react-select";
import locations from "./api/locations.js";
import headerPic from "../public/header illustration.png";
import Image from "next/image";

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
      <main className=" bg-gray-900 text-white min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 items-end  bg-gradient-to-tr from-indigo-600 to-blue-900">
          <div className="flex flex-col gap-4 col-span-2 p-10 lg:p-20">
            <h1 className="text-4xl font-bold">Find a Cofounder!</h1>
            <p className="text-yellow-50 text-lg">
              I&apos;m Ste and I&apos;ve built a directory of cofounders to help
              people find each other easily. <br />
              If you&apos;re looking to partner up, add your info below. Browse
              through the directory, use the fancy filters and find who
              you&apos;re looking for.
            </p>
            <p className="opacity-30 text-xs">
              Illustration by{" "}
              <a
                href="https://www.figma.com/community/file/890095002328610853"
                target="_blank"
                rel="noreferrer"
              >
                Alzea ⟶
              </a>
            </p>
          </div>
          <div className=" w-full flex items-center justify-center">
            <Image
              src={headerPic}
              alt="Picture of the author"
              width={217}
              height={300}
              layout="fixed"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start justify-center p-12 sm:p-20">
          <div className="flex flex-col lg:flex-row justify-between gap-4 w-full items-center">
            <h3>
              Filters:{" "}
              <span className="py-1 px-2 mr-1 bg-gray-700 rounded-full text-sm uppercase tracking-wide">
                {foundersState.length} Results
              </span>
            </h3>
            <div className="flex gap-4 flex-col lg:flex-row">
              <span className="hidden lg:flex py-1 px-2 bg-indigo-500 rounded-md  items-center">
                Filter by
                <ChevronRightIcon className="h-5 w-5" />
              </span>
              <span className="flex flex-col sm:flex-row items-center gap-4">
                <p>Cofounder background:</p>
                <Select
                  className="min-w-max w-40"
                  styles={customStyles}
                  options={options}
                  onChange={(values) => setFilters("expertise", values)}
                  isMulti
                />
              </span>
              <span className="flex flex-col sm:flex-row items-center gap-4">
                Looking for
                <Select
                  isMulti
                  className="min-w-max w-40"
                  styles={customStyles}
                  options={options}
                  onChange={(values) => setFilters("seeking", values)}
                />
              </span>
              <span className="flex flex-col sm:flex-row items-center gap-4">
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
          {foundersState.length > 0 ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
              {foundersState.map((founder) => (
                <Founder key={founder.id} founder={founder} />
              ))}
              <Link href="/newCofounder">
                <div className="py-20 w-full bg-gray-700 flex items-center justify-center rounded-md cursor-pointer">
                  + Add your info
                </div>
              </Link>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center p-20">
              <img
                src="https://media.giphy.com/media/39CbBPqbaf9w37kFrL/giphy.gif?cid=ecf05e47d8ifoycxq4m15kuf18mhexdu7tc0vgvky2z75qm9&rid=giphy.gif&ct=s"
                alt="sorry"
                className="w-40"
              />
              <p>No results, sorry.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="p-24 bg-gray-900 text-yellow-50 text-center">
        <div className="fixed bottom-10 left-10">
          <Link href="/newCofounder">
            <button className="p-4 rounded-md bg-indigo-500 hover:bg-indigo-800 w-30 flex justify-center shadow-2xl">
              Add your info
            </button>
          </Link>
        </div>
        <div className="fixed bottom-10 right-10">
          <a href="mailto:st.dobrescu@gmail.com?subject=Feedback for Cofounders directory">
            <button className="p-4 rounded-md bg-indigo-900 hover:bg-indigo-800 w-30 flex justify-center shadow-2xl">
              Feedback?
            </button>
          </a>
        </div>
        <p>
          Made with 💖 by{" "}
          <a
            href="https://www.indiehackers.com/SteLofo"
            target="_blank"
            rel="noreferrer"
          >
            IH Ste
          </a>
        </p>
      </footer>
    </>
  );
}
