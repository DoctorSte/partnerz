import React from "react";
import ShowMoreText from "react-show-more-text";
import { LocationMarkerIcon, AtSymbolIcon } from "@heroicons/react/solid";

const Founder = ({ founder }) => {
  return (
    <>
      <div className="p-6 bg-gray-800 rounded-md overflow-hidden">
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

        <div className="mb-2">
          <div className="flex flex-wrap gap-1">
            is a
            {founder.fields["I'm a ... [Background]"].map((expertise) => (
              <span
                className="py-1 px-2  bg-indigo-600 rounded-full text-sm uppercase tracking-wide"
                key={expertise.id}
              >
                {expertise}
              </span>
            ))}
            person
          </div>
        </div>
        <span>
          <div className="flex flex-wrap gap-1">
            seeking a
            {founder.fields["Looking for ..."].map((seeking) => (
              <span
                className="py-1 px-2  bg-green-600 rounded-full text-sm uppercase tracking-wide"
                key={seeking.id}
              >
                {seeking}
              </span>
            ))}
            cofounder
          </div>
        </span>

        <div className="flex gap-2 mt-3 mb-1">
          <p className="text-xs text-gray-400 flex">
            <LocationMarkerIcon className="w-4" />
            Location: {founder.fields["Your location (country)"]}{" "}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-gray-400">
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
