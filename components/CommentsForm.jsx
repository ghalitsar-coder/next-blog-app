import React, { useEffect, useRef, useState } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();
  const handleComment = async (e) => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObj = { name, email, comment, slug };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    await submitComment(commentObj);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 500);
  };

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  ("infinite loop ?");
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 ">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4 ">
        Leave a reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          name="comment"
          ref={commentEl}
          placeholder="Comment"
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 "
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          ref={nameEl}
          placeholder="Name"
          className="px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 "
        />
        <input
          type="text"
          name="email"
          ref={emailEl}
          placeholder="Email"
          className="px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 "
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            ref={storeDataEl}
            id="storeData"
            name="storeData"
            className="w-[15px] h-[15px] bg-pink-600 text-white "
          />
          <label htmlFor="storeData" className="text-xs text-pink-600">
            Save my e-mail and name for the next time I comment{" "}
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All Fields are required</p>}
      <div className="mt-8 ">
        <button
          className="hover:bg-pink-600 hover:text-white border-2 border-pink-600 text-pink-600 transition duration-500 w-full font-semibold p-4 rounded-lg "
          type="button"
          onClick={handleComment}
        >
          {showSuccessMessage ? "Commented!" : "Comment"}
        </button>
      </div>
    </div>
  );
};

export default CommentsForm;
