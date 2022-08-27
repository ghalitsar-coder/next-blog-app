import React from "react";
import Image from "next/image";
const Author = ({ author }) => {
  return (
    <div className="shadow-lg p-12 mt-14 my-10  rounded-md relative text-center mb-6">
      <div className="absolute left-0  right-0 -top-14 ">
        <Image
          alt={author.name}
          src={author.photo.url}
          className="rounded-full w-full h-full object-cover "
          layout="fixed"
          width={100}
          height={100}
        />
      </div>
      <h3 className=" my-4 text-xl font-bold ">{author.name}</h3>
      <p className=" ">{author.bio}</p>
    </div>
  );
};

export default Author;
