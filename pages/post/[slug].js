import React from "react";
import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  PostCard,
  PostDetail,
  PostWidget,
} from "../../components";
import { getPostDetails, getPosts } from "../../services";

const PostDetails = ({ post }) => {
  "THIS IS POST =>", post;
  return (
    <div className="container mx-auto px-10 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
        <div className="col-span-1 lg:col-span-8 grid gap-y-5 ">
          <PostCard post={post} detail />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4 ">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
export const getStaticPaths = async () => {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const data = await getPostDetails(params.slug);
  return {
    props: { post: data },
  };
};
