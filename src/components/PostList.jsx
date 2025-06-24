import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, fetchImages } from "../features/posts/postSlice";
import { Link } from "react-router-dom";
import ScrollableCard from "./ScrollableCard";

// Declare max cards per page for pagination
const CARDS_PER_PAGE = 20;

const PostList = () => {
  const dispatch = useDispatch();
  // Get posts and local posts from Redux store
  const posts = useSelector((state) => state.posts.posts);
  const localPosts = useSelector((state) => state.posts.localPosts);
  const status = useSelector((state) => state.posts.status);
  // const images = useSelector((state) => state.posts.images);
  // Track current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Combine local posts and fetched posts
  const allPosts = localPosts.concat(posts);
  // Calculate total pages
  const totalPages = Math.ceil(allPosts.length / CARDS_PER_PAGE);

  // Get posts for current page
  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
      // dispatch(fetchImages());
    }
  }, [dispatch, status]);

  return (
    <div className="my-10">
      <div>
        <div className="my-34">
          <h1 className="text-3xl font-semibold text-start my-2 text-black">
            Blogs.
          </h1>
          <h1 className="text-3xl font-semibold text-start my-2 text-gray-500">
            Read your favourite blogs right from the author.
          </h1>
        </div>
        <div className="w-full">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-3xl font-bold text-start my-1 text-black">
              Trending Posts.
            </h2>
            <h2 className="text-3xl font-bold text-start my-1 text-gray-400">
              Check what's been happening.
            </h2>
          </div>
          <ScrollableCard />
        </div>
      </div>
      <div className="my-10">
        <div className="flex flex-row items-center gap-2 my-5">
          <h2 className="text-3xl font-bold text-start my-1 text-black">
            New Posts.
          </h2>
          <h2 className="text-3xl font-bold text-start my-1 text-gray-400">
            Right from the writer's fingertips.
          </h2>
        </div>
        <div className="flex flex-wrap justify-between m-0 gap-6">
          {paginatedPosts.map((post) => {
            // Generate a random number between 1 and 23 for hours ago
            const hoursAgo = Math.floor(Math.random() * 23) + 1;
            // Generate a random number between 1 and 100 for random image id
            const randomImgId = Math.floor(Math.random() * 100) + 1;
            return (
              <div key={post.id} className="flex-1 min-w-[320px] max-w-sm">
                <Link to={`/post/${post.id}`}>
                  <div
                    className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  transition duration-200 ease-in-out hover:shadow-2xl hover:scale-105 
                  border
                  border-gray-100
                  hover:border-gray-300
                  flex flex-col
                  overflow-hidden
                  group
                "
                  >
                    <img
                      className="w-full h-48 object-cover"
                      src={`https://picsum.photos/id/${post.id}/600/300`}
                      alt={`https://picsum.photos/id/${randomImgId}/600/300`}
                      onError={(e) => {
                        // Only swap once to avoid infinite loop if alt also fails
                        if (e.target.src !== e.target.alt) {
                          e.target.src = e.target.alt;
                        }
                      }}
                    />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="font-semibold text-xl text-gray-900 mb-2 line-clamp-1">
                        {post.title}
                      </div>
                      <p className="text-gray-500 text-base mb-4 line-clamp-2">
                        {post.body}
                      </p>
                      <div className="mt-auto flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-gray-300"></span>
                        <span className="text-xs text-gray-400">
                          {hoursAgo} hours ago
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-200 text-white hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-white hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-gray-200 text-white hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostList;
