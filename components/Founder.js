import React from "react";
import ShowMoreText from "react-show-more-text";

const Founder = ({ founder }) => {
  return (
    <>
      <div className="p-6 bg-gray-800 rounded-md ">
        <div className="flex gap-2 mb-2">
          <img
            src={
              founder.fields["Profile Picture"]
                ? founder.fields["Profile Picture"][0].url
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/440px-VAN_CAT.png"
            }
            className="rounded-full w-12 h-12"
          />
          <p>
            Name:
            <br /> {founder.fields["Cofounder Name"]}
          </p>
        </div>
        <p>
          is a
          <span className="py-1 px-2 mx-1 bg-indigo-600 rounded-full text-sm uppercase tracking-wide">
            {founder.fields["I'm a ... [Background]"]}
          </span>
          person
        </p>
        <p>
          looking for a
          <span className="py-1 px-2 mx-1 bg-blue-600 rounded-full text-sm uppercase tracking-wide">
            {founder.fields["Looking for ..."]}
          </span>
          person
        </p>
        <p className="text-xs text-gray-400">
          Location: {founder.fields["Your location (country)"]}{" "}
        </p>
        <p className="text-xs text-gray-400">
          Years Experience: {founder.fields["Years Experience"]}
        </p>
        <div className="flex gap-2 text-xs text-gray-400">
          Idea Type:{" "}
          {founder.fields["Idea type"].map((idea) => (
            <p>{idea}</p>
          ))}
        </div>
        <ShowMoreText
          lines={3}
          more="More"
          less="Less"
          className="text-sm text-gray-200 my-2"
          anchorClass="my-anchor-css-class"
          expanded={false}
          truncatedEndingComponent={"... "}
        >
          Idea Description: {founder.fields["Idea Description"]}
        </ShowMoreText>

        <a href={`mailto: ${founder.fields["Email address"]}`}>Contact</a>
      </div>
    </>
  );
};

export default Founder;
