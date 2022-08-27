import React, { useEffect, useState } from "react";
import { getRecentPosts, getSimilarPosts } from "../services";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

const RelatedPosts = ({ post }) => (
  <div className="flex items-center gap-x-4 w-full">
    <div className="w-16 flex-none">
      <Image
        src={post.featuredImage.url}
        layout="responsive"
        width={60}
        height={60}
        className="w-full h-full object-cover rounded-full"
        alt={post.title}
      />
    </div>
    <div className="">
      <p className="text-gray-500 text-xs">
        {moment(post.createdAt).format("DD MMM YYYY")}
      </p>
      <span className="hover:text-pink-500 transition duration-600">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </span>
    </div>
  </div>
);

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const getPostsData = async () => {
    try {
      if (slug) {
        const result = await getSimilarPosts(categories, slug);
        setRelatedPosts(result);
      } else {
        const result = await getRecentPosts(categories, slug);
        setRelatedPosts(result);
      }
    } catch (err) {
      err;
    }
  };
  "THIS IS RESULT ->", relatedPosts;
  useEffect(() => {
    getPostsData();
    // eslint-disable-next-line
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 ">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      <div className="grid gap-y-7">
        {relatedPosts?.map((post) => (
          <RelatedPosts post={post} key={post.title} />
        ))}
      </div>
    </div>
  );
};

export default PostWidget;
