import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import API from "../api/axios";
import "../styles/blog-details.css";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `/api/posts/${id}/`; // make sure to keep the trailing slash if your backend requires it

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
          <div className="content">
            <ReactMarkdown>{blog.body}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
