import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import API from "../api/axios";
import "../styles/blog-details.css";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

// Utility to extract plain text from ReactMarkdown children
function getTextFromReactChildren(children) {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map(getTextFromReactChildren).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    return getTextFromReactChildren(children.props.children);
  }
  return "";
}

// Custom hook to fetch blog post data
function useBlog(id) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    API.get(`/api/posts/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => {
        setBlog(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch blog post:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { blog, loading, error };
}

// Custom hook to fetch and manage comments
function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    API.get(`/api/posts/${postId}/comments/`)
      .then((res) => {
        // If API returns an object with 'results', use that
        const data = Array.isArray(res.data)
          ? res.data
          : (res.data.results ?? []);
        setComments(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch comments:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [postId]);

  return { comments, setComments, loading, error };
}

function CommentsList({ comments }) {
  if (!Array.isArray(comments) || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <ul className="comments-list">
      {comments.map((comment) => (
        <li key={comment.id}>
          <strong>{comment.user?.user_name ?? "Anonymous"}:</strong>{" "}
          {comment.comment_body}
          <br />
          <small>{new Date(comment.created_at).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
}

function CommentForm({ onSubmit, value, onChange }) {
  return (
    <form onSubmit={onSubmit} className="comment-form">
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Write a comment..."
        rows="3"
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
}

function BlogDetails() {
  const { id } = useParams();

  const { blog, loading: blogLoading, error: blogError } = useBlog(id);
  const {
    comments,
    setComments,
    loading: commentsLoading,
    error: commentsError,
  } = useComments(id);

  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await API.post(
        `/api/posts/${id}/comments/`,
        { comment_body: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
      // Optionally: show user error message here
    }
  };

  // Generate heading components with correct id attributes for TOC links
  const components = useMemo(() => {
    if (!blog?.toc) return {};

    const headingComponents = {};
    const usedLevels = new Set(blog.toc.map((item) => item.level));

    usedLevels.forEach((level) => {
      const tag = `h${level}`;
      headingComponents[tag] = ({ children }) => {
        const text = getTextFromReactChildren(children);
        const match = blog.toc.find(
          (item) => item.text === text && item.level === level,
        );
        const id = match?.slug ?? undefined;
        const HeadingTag = tag;
        return <HeadingTag id={id}>{children}</HeadingTag>;
      };
    });

    return headingComponents;
  }, [blog]);

  if (blogLoading) return <p>Loading blog post...</p>;
  if (blogError) return <p>Error loading blog post.</p>;

  return (
    <div className="blog-details">
      <div className="container">
        <div className="blog-details-content">
          {blog.image && (
            <div className="blog-header-image">
              <img src={blog.image} alt={blog.title} className="header-image" />
            </div>
          )}

          <h1 className="title">{blog.title}</h1>
          <p className="author">
            By {blog.user?.user_name ?? "Unknown"} on{" "}
            {new Date(blog.created_at).toLocaleDateString()}
          </p>

          {/* Table of Contents */}
          <div className="toc">
            <h2>Contents</h2>
            <ul>
              {blog.toc.map(({ level, text, slug }) => (
                <li key={slug} style={{ marginLeft: (level - 1) * 20 }}>
                  <a href={`#${slug}`}>{text}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Content */}
          <div className="content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize, rehypeHighlight]}
              components={components}
            >
              {blog.body}
            </ReactMarkdown>
          </div>

          <hr />

          <div className="comments-section">
            <h2>Comments</h2>

            {commentsLoading ? (
              <p>Loading comments...</p>
            ) : commentsError ? (
              <p>Error loading comments.</p>
            ) : (
              <CommentsList comments={comments} />
            )}

            <CommentForm
              onSubmit={handleSubmit}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
