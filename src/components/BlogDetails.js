import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import API from "../api/axios";
import "../styles/blog-details.css";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

// Helper to create slug from heading text (same as your extractHeadings)
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove special chars including emojis
    .trim()
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Recursively get plain text from React children nodes (strings, elements, arrays)
function getTextFromReactChildren(children) {
  if (typeof children === "string") return children;
  if (Array.isArray(children))
    return children.map(getTextFromReactChildren).join("");
  if (children && typeof children === "object" && "props" in children) {
    return getTextFromReactChildren(children.props.children);
  }
  return "";
}

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const url = `/api/posts/${id}/`;

    API.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch blog post:", error);
      });
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  // Extract headings from markdown body for TOC
  function extractHeadings(markdown) {
    const headingRegex = /^(#{2,6})\s+(.+)$/gm;
    const headings = [];
    let match;
    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const slug = slugify(text);
      headings.push({ level, text, slug });
    }
    return headings;
  }

  const headings = extractHeadings(blog.body);

  // Custom heading components assign correct id by extracting full text
  const components = {
    h2: ({ children }) => {
      const text = getTextFromReactChildren(children);
      const id = slugify(text);
      return <h2 id={id}>{children}</h2>;
    },
    h3: ({ children }) => {
      const text = getTextFromReactChildren(children);
      const id = slugify(text);
      return <h3 id={id}>{children}</h3>;
    },
    // Add more if needed for h4, h5...
  };

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
            By {blog.user?.user_name || "Unknown"} on{" "}
            {new Date(blog.created_at).toLocaleDateString()}
          </p>

          {/* Table of Contents */}
          <div className="toc">
            <h2>Contents</h2>
            <ul>
              {headings.map(({ level, text, slug }) => (
                <li key={slug} style={{ marginLeft: (level - 2) * 20 }}>
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
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
