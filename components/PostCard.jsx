import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
const PostCard = ({ post, detail = false }) => {
  "CURRENT POST =>", post;
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <Image
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg     ">
      <div className="relative overflow-hidden shadow-md ">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          className="object-cover w-full h-full "
          layout="responsive"
          width={"100%"}
          height={"80%"}
        />
      </div>
      <div
        className={` p-5 grid ${!detail && "place-items-center"}   gap-y-5 `}
      >
        <h1
          className={`transition duration-500 text-center  cursor-pointer hover:text-pink-600 text-3xl font-semibold  ${
            detail && "order-2 !text-left"
          } `}
        >
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h1>
        <div
          className={`${
            detail ? "flex justify-between order-1" : "  grid gap-y-5"
          }`}
        >
          <div className={`flex items-center gap-x-2 relative  `}>
            <div className="w-10">
              <Image
                src={post.author.photo.url}
                layout="responsive"
                width={30}
                height={30}
                className="rounded-full object-cover w-full h-full"
                alt={post.author.name}
              />
            </div>
            <p className="text-gray-700 text-lg  ">{post.author.name}</p>
          </div>
          <div className={`flex items-center ${detail && "order-3"} `}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm ">
              {" "}
              {moment(post.createdAt).format("MMM DD, YYYY")}{" "}
            </span>
          </div>
        </div>

        <div className="text-center grid gap-y-5 order-4">
          <div className={`text-slate-600 text-sm ${detail && "!text-left"}`}>
            {detail
              ? post.content?.raw?.children.map((obj, idx) => {
                  const children = obj.children.map((item, itemIdx) =>
                    getContentFragment(itemIdx, item.text, item)
                  );
                  return getContentFragment(idx, children, obj, obj.type);
                })
              : post.excerpt}
          </div>
          {!detail && (
            <Link href={`/post/${post.slug}`}>
              <span className="text-white bg-pink-500 px-8 py-3 rounded-lg transition duration-500 transform hover:-translate-y-1 cursor-pointer w-max mx-auto  ">
                Continue Reading
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
