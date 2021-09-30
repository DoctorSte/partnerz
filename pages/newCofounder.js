import Head from "next/head";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

export default function newCofounder() {
  return (
    <>
      <Head>
        <title>Submit new Cofounder</title>
      </Head>
      <div className="flex flex-col justify-center items-center ">
        <Link href="/">
          <button className="fixed left-8 top-8 flex items-center mt-5 p-4 rounded-md bg-indigo-300 hover:bg-indigo-50">
            <ChevronLeftIcon className="w-5 h-5" />
            Back to Directory
          </button>
        </Link>
        <iframe
          className="airtable-embed mt-24 "
          src="https://airtable.com/embed/shrLb79cCszcBQvsa?backgroundColor=purple"
          frameBorder="0"
          width="100%"
          height="2000"
        ></iframe>
      </div>
    </>
  );
}
