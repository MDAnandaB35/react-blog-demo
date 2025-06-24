import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postSlice";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  // Use state to manage form inputs
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({ id: Date.now(), title, body }));
    navigate("/");
  };

  // Render the form
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Create New Post
        </h2>
        <div className="mb-5">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter a catchy title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 transition"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="body"
          >
            Body
          </label>
          <textarea
            id="body"
            placeholder="Write your post here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 transition min-h-[120px]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
