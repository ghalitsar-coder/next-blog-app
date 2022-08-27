import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCategories } from "../services";

// const categories = [
//   { name: "React", slug: "react" },
//   { name: "Web Development", slug: "web-dev" },
//   { name: "Next", slug: "next" },
//   { name: "Javascript", slug: "javascript" },
// ];

const List = ({ name, slug }) => (
  <li className={"cursor-pointer hover:text-pink-600 "}>
    <Link href={`/category/${slug}`}>{name}</Link>
  </li>
);

const Header = () => {
  const [categories, setCategories] = useState([]);
  const getCategory = async () => {
    try {
      const result = await getCategories();
      setCategories(result);
    } catch (err) {
      err;
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <nav className="container mx-auto px-10 mb-8">
      <div className="border-b w-full border-blue-400 py-8 flex flex-col md:flex-row gap-y-5 md:gap-y-0 justify-between items-center ">
        <Link href={"/"} className="">
          <span className="text-4xl cursor-pointer font-bold">GraphCMS</span>
        </Link>
        <ul className="flex  gap-x-5 ">
          {categories.map((item) => (
            <List {...item} key={item.name} />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
