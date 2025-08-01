import { useEffect, useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { CircleUser } from "lucide-react";
import { postComment, fetchComments } from "../services/commentService";
import "github-markdown-css/github-markdown.css";
import "../styles/blog-details.css";

function getTextFromReactChildren(children) {
  if (typeof children === "string") return children;
  if (Array.isArray(children))
    return children.map(getTextFromReactChildren).join("");
  if (children && typeof children === "object" && "props" in children)
    return getTextFromReactChildren(children.props.children);
  return "";
}

function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchComments(postId);
        if (mounted) {
          setComments(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.error("Failed to fetch comments:", err);
          setError(err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [postId]);

  return { comments, setComments, loading, error };
}

function groupComments(comments) {
  const map = {};
  comments.forEach((c) => (map[c.id] = { ...c, replies: [] }));
  const nested = [];
  comments.forEach((c) => {
    if (c.parent && map[c.parent]) {
      map[c.parent].replies.push(map[c.id]);
    } else {
      nested.push(map[c.id]);
    }
  });
  return nested;
}

function CommentsList({
  comments,
  replyingTo,
  setReplyingTo,
  replyText,
  setReplyText,
  handleReplySubmit,
}) {
  const nestedComments = useMemo(() => groupComments(comments), [comments]);

  function toggleReply(commentId) {
    if (replyingTo === commentId) {
      setReplyingTo(null);
      setReplyText("");
    } else {
      setReplyingTo(commentId);
      setReplyText("");
    }
  }

  if (!nestedComments.length) return <p>No comments yet.</p>;

  return (
    <ul className="comments-list">
      {nestedComments.map((comment) => (
        <li key={comment.id} className="user-comment-container">
          <UserProfileIcon imageUrl="" size={40} />
          <div className="user-comment-content">
            <strong>{comment.user?.user_name ?? "Anonymous"}</strong>
            <small>{new Date(comment.created_at).toLocaleString()}</small>
            <p>{comment.comment_body}</p>

            <div className="comment-actions">
              {comment.replies.length > 0 && (
                <button
                  onClick={() => toggleReply(comment.id)}
                  className="toggle-replies-button"
                >
                  {replyingTo === comment.id
                    ? "Hide Replies"
                    : `View Replies (${comment.replies.length})`}
                </button>
              )}

              <button
                onClick={() =>
                  replyingTo === comment.id
                    ? setReplyingTo(null)
                    : setReplyingTo(comment.id)
                }
                className="reply-toggle-button"
              >
                {replyingTo === comment.id ? "Cancel Reply" : "Reply"}
              </button>
            </div>

            {replyingTo === comment.id && (
              <div className="reply-dropdown">
                <CommentForm
                  onSubmit={(e) => handleReplySubmit(e, comment.id)}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>
            )}

            {comment.replies.length > 0 && replyingTo === comment.id && (
              <ul className="replies-list">
                {comment.replies.map((reply) => (
                  <li key={reply.id} className="reply-item">
                    <UserProfileIcon imageUrl="" size={30} />
                    <div className="reply-content">
                      <strong>{reply.user?.user_name ?? "Anonymous"}</strong>
                      <small>
                        {new Date(reply.created_at).toLocaleString()}
                      </small>
                      <p>{reply.comment_body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
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
        rows={3}
        required
        className="text-section"
      />
      <div className="submit-section">
        <button type="submit" className="btn btn-dark">
          Post Comment
        </button>
      </div>
    </form>
  );
}

function Toc({ blog }) {
  return (
    <aside className="toc">
      <ul>
        {blog.toc.map(({ level, text, slug }) => (
          <li key={slug}>
            <a href={`#${slug}`}>{text}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function UserProfileIcon({ imageUrl, size = 40, className, style }) {
  return (
    <div
      className="profile-container"
      style={{ display: "inline-block", ...style }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="User Profile"
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <CircleUser size={size} color="#555" />
      )}
    </div>
  );
}

function UserProfileDetail({ blog }) {
  return (
    <div className="user-profile-detail-container">
      <h4>Written by</h4>
      <div className="flex-row">
        <UserProfileIcon />
        <p className="">{blog.user.user_name}</p>
      </div>
    </div>
  );
}

function BlogDetails({ blog, id }) {
  const {
    comments,
    setComments,
    loading: commentsLoading,
    error: commentsError,
  } = useComments(id);

  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  async function handleSubmit(e, parent = null) {
    e.preventDefault();
    const content = parent ? replyText : newComment;
    if (!content.trim()) return;

    try {
      const res = await postComment(id, content, parent);
      setComments((prev) => [...prev, res.data]);
      if (parent) {
        setReplyText("");
        setReplyingTo(null);
      } else {
        setNewComment("");
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  }

  const components = useMemo(() => {
    if (!blog?.toc) return {};
    const headingComponents = {};
    const usedLevels = new Set(blog.toc.map(({ level }) => level));
    usedLevels.forEach((level) => {
      const tag = `h${level}`;
      headingComponents[tag] = ({ children }) => {
        const text = getTextFromReactChildren(children);
        const match = blog.toc.find(
          (item) => item.text === text && item.level === level,
        );
        const id = match?.slug;
        const HeadingTag = tag;
        return <HeadingTag id={id}>{children}</HeadingTag>;
      };
    });
    return headingComponents;
  }, [blog]);

  return (
    <div className="blog-details">
      <div className="flex-row-container">
        <div className="blog-details-content">
          <main className="main-content">
            <article className="markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize, rehypeHighlight]}
                components={components}
              >
                {blog.body}
              </ReactMarkdown>
            </article>

            {/* <section className="comments-section">
              <h2>Comments</h2>
              <p className="comments-count">{comments.length} Comments</p>
              <hr className="divider" />
              <div className="form-header">
                <UserProfileIcon imageUrl="" size={40} />
                <CommentForm
                  onSubmit={handleSubmit}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>

              {commentsLoading ? (
                <p>Loading comments...</p>
              ) : commentsError ? (
                <p>Error loading comments.</p>
              ) : (
                <CommentsList
                  comments={comments}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  handleReplySubmit={handleSubmit}
                />
              )}
            </section>*/}
          </main>
        </div>
        <div className="aside-container">
          <Toc blog={blog} />
          <UserProfileDetail blog={blog} />
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
