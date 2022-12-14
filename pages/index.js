import Head from "next/head";
import React from "react";
import { Categories, PostCard, PostWidget } from "../components";
import { CarouselPosts } from "../sections";
import { getPosts } from "../services";

// const posts = [
//   { title: "React Testing", excerpt: "Learn React Testing" },
//   { title: "React With Tailwind", excerpt: "Learn React With Tailwind" },
// ];

const Home = ({ posts }) => {
  return (
    <div className="container mx-auto px-10 mb-8 ">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CarouselPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1 grid gap-y-5">
          {posts.map((post, idx) => (
            <PostCard key={idx} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget categories={"Web Development"} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}

export default Home;
