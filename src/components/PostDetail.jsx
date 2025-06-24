import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  // Get post ID from URL parameters
  const { id } = useParams();
  // Fetch posts from Redux store
  const posts = useSelector((state) => state.posts.posts);
  const localPosts = useSelector((state) => state.posts.localPosts);

  // Find the post with the matching ID
  // Use toString() to ensure ID comparison works for both string and number types
  const post = [...localPosts, ...posts].find(
    (post) => post.id.toString() === id
  );

  // Generate a random minutes read between 1 and 10, seeded by post id for consistency
  const getMinutesRead = (postId) => (parseInt(postId, 10) % 10) + 1;
  const minutesRead = post ? getMinutesRead(post.id) : 1;

  // Comment section state
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  // New comment state
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    body: "",
  });

  // Fetch comments for this post with post ID the same as this post's ID
  useEffect(() => {
    if (!post) return;
    setLoadingComments(true);
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setLoadingComments(false);
      });
  }, [post]);

  // Add comment handler for new comment submission
  const handleAddComment = (e) => {
    e.preventDefault();
    // Prevent empty fields
    if (!newComment.name || !newComment.email || !newComment.body) return;
    setComments([
      ...comments,
      {
        ...newComment,
        id: Date.now(), 
        postId: post.id,
      },
    ]);
    setNewComment({ name: "", email: "", body: "" });
  };

  // Error handler
  if (!post)
    return (
      <div className="text-center text-gray-400 mt-20">Post not found</div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg mt-10 mb-10">
      <img
        src={`https://picsum.photos/id/${post.id}/800/400`}
        alt={post.title}
        className="w-full h-64 object-cover rounded-2xl mb-6 shadow-sm"
      />
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-2 text-gray-400 text-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-gray-300"></span>
          {minutesRead} min read
        </span>
        <span className="text-xs text-gray-400 italic">#{post.id}</span>
      </div>
      <h2 className="text-3xl font-bold mb-3 text-gray-900 leading-tight">
        {post.title}
      </h2>
      <p className="text-gray-600 text-lg leading-relaxed mb-8">{post.body}</p>

      {/* Add Comment Form */}
      <div className="mt-10 mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          Add a Comment
        </h3>
        <form onSubmit={handleAddComment} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={newComment.name}
            onChange={(e) =>
              setNewComment({ ...newComment, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={newComment.email}
            onChange={(e) =>
              setNewComment({ ...newComment, email: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Comment"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] text-gray-700"
            value={newComment.body}
            onChange={(e) =>
              setNewComment({ ...newComment, body: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Post Comment
          </button>
        </form>
      </div>

      {/* Comment Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">Comments</h3>
        {loadingComments ? (
          <div className="text-gray-400">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-gray-400">No comments yet.</div>
        ) : (
          <ul className="space-y-6">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-center mb-2">
                  <span className="font-semibold text-gray-800 mr-2">
                    {comment.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    &lt;{comment.email}&gt;
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-line">
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
