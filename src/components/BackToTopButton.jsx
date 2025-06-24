import React, { useEffect, useState } from "react";

// Return to top button component
const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

    // Set visibility based on scroll position
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

    // Scroll to top function when clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      aria-label="Back to top"
    >
      ↑
    </button>
  ) : null;
};

export default BackToTopButton;