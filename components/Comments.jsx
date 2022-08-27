import parse from "html-react-parser";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getComments } from "../services";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    try {
      const res = await getComments(slug);
      setComments(res);
    } catch (err) {}
  };
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      {comments.length && (
        <div className=" bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} Comments
          </h3>
          {comments.map((item) => (
            <div
              className="border-b border-gray-100 mb-4 pb-4"
              key={item.createdat}
            >
              <p className="mb-4">
                <span className="font-semibold">{item.name}</span> on{" "}
                {moment(item.createdAt).format("MMM DD, YYYY")}
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full  ">
                {parse(item.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
