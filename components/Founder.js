import React from "react";
import ShowMoreText from "react-show-more-text";
import { LocationMarkerIcon, AtSymbolIcon } from "@heroicons/react/solid";

const Founder = ({ founder }) => {
  return (
    <>
      <div className="p-6 bg-gray-800 rounded-md">
        <div className="flex gap-2 mb-2">
          <img
            src={
              founder.fields["Profile Picture"]
                ? founder.fields["Profile Picture"][0].url
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/440px-VAN_CAT.png"
            }
            className="rounded-full w-12 h-12 bg-gray-900"
          />
          <div>
            <p className="text-xs text-gray-400">Name:</p>
            <p className="font-bold">{founder.fields["Cofounder Name"]}</p>
            <p className="text-xs text-gray-400">
              Years Experience: {founder.fields["Years Experience"]}
            </p>
          </div>
        </div>

        <p className="mb-2">
          is a
          <span className="py-1 px-2 mx-1 bg-indigo-600 rounded-full text-sm uppercase tracking-wide">
            {founder.fields["I'm a ... [Background]"]}
          </span>
          person
        </p>
        <p>
          seeking a
          <span className="py-1 px-2 mx-1 bg-green-600 rounded-full text-sm uppercase tracking-wide">
            {founder.fields["Looking for ..."]}
          </span>
          cofounder
        </p>

        <div className="flex gap-2 mt-3 mb-1">
          <p className="text-xs text-gray-400 flex">
            <LocationMarkerIcon className="w-4" />
            Location: {founder.fields["Your location (country)"]}{" "}
          </p>
        </div>
        <div className="flex gap-2 text-xs text-gray-400">
          Idea Type:{" "}
          {founder.fields["Idea type"].map((idea) => (
            <p key={idea.id}>{idea}</p>
          ))}
        </div>
        <ShowMoreText
          lines={3}
          more=" More"
          less=" Less"
          anchorClass="text-yellow-400 font-bold"
          className="text-sm text-gray-200 my-2"
          anchorClass="my-anchor-css-class"
          expanded={false}
          truncatedEndingComponent={"... "}
        >
          Idea Description: {founder.fields["Idea Description"]}
        </ShowMoreText>

        <a
          className=" flex text-gray-400"
          href={`mailto: ${founder.fields["Email address"]}`}
        >
          <AtSymbolIcon className="w-4 mr-1" />
          Contact
        </a>
      </div>
    </>
  );
};

export default Founder;
