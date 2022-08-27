import React, { useEffect, useState } from "react";
import { getCategories } from "../services";

import Image from "next/image";
import Link from "next/link";

// const Category = ({ post }) => (
//   <div className="flex items-center gap-x-4 w-full">
//     <div className="w-16 flex-none">
//       <Image
//         src={post.featuredImage.url}
//         layout="responsive"
//         width={60}
//         height={60}
//         className="w-full h-full object-cover rounded-full"
//         alt={post.title}
//       />
//     </div>
//     <div className="">
//       <p className="text-gray-500 text-xs">
//         {moment(post.createdAt).format("DD MMM YYYY")}
//       </p>
//       <span className="hover:text-pink-500 transition duration-600">
//         <Link href={`/post/${post.slug}`}>{post.title}</Link>
//       </span>
//     </div>
//   </div>
// );
const Categories = () => {
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

  "categories ->", categories;
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 ">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      <div className="grid gap-y-3">
        {categories?.map((category) => (
          <span
            key={category.slug}
            className=" hover:text-pink-600 transition duration-700"
          >
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Categories;
