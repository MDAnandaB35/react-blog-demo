import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postSlice";
import { Link } from "react-router-dom";

const ScrollableCard = () => {
  const dispatch = useDispatch();
  // Get posts and local posts from Redux store
  const posts = useSelector((state) => state.posts.posts);
  const localPosts = useSelector((state) => state.posts.localPosts);
  const status = useSelector((state) => state.posts.status);

  // Ref for the scroll container
  const scrollRef = useRef(null);
  // Ref for pause timeout
  const pauseTimeout = useRef(null);
  // State to manage pause state
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  // Auto-scroll effect with pause on interaction
  useEffect(() => {
    if (paused) return; // Do nothing if paused

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollStep = 2; // Number of pixels to scroll each step
    const scrollDelay = 20; // Interval delay in milliseconds

    const interval = setInterval(() => {
      // Reset scroll position if at the end
      if (
        scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
        scrollContainer.scrollWidth
      ) {
        // Reset to start when reaching the end
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollStep;
      }
    }, scrollDelay);

    // Cleanup interval when paused
    return () => clearInterval(interval);
  }, [posts, localPosts, paused]);

  // Pause auto-scroll on user interaction
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const pause = () => {
      setPaused(true);
      if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
      pauseTimeout.current = setTimeout(() => setPaused(false), 3000);
    };

    scrollContainer.addEventListener("wheel", pause, { passive: true });
    scrollContainer.addEventListener("touchmove", pause, { passive: true });

    return () => {
      scrollContainer.removeEventListener("wheel", pause);
      scrollContainer.removeEventListener("touchmove", pause);
      if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    };
  }, []);

  // Combine and limit to 20 cards
  const cards = localPosts.concat(posts).slice(0, 10);

  return (
    <div className="w-full max-w-screen overflow-x-auto scrollbar-hide relative m-3">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-gray-100 via-gray-100/60 to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-gray-100 via-gray-100/60 to-transparent" />
      <div
        className="flex flex-nowrap space-x-4 py-4 overflow-x-auto scrollbar-hide relative"
        ref={scrollRef}
      >
        {cards.map((card) => (
          <Link to={`/post/${card.id}`} key={card.id}>
            <div className="w-70 h-60 bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0 transition duration-200 ease-in-out hover:shadow-2xl hover:scale-105 ">
              <img
                src={`https://picsum.photos/200/120?random=${card.id}`}
                alt={card.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-black truncate">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {card.body}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ScrollableCard;
