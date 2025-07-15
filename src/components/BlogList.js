// src/components/BlogList.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/blog-list.css";
import { ChevronRight } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { UserRound } from "lucide-react";
import { CalendarDays } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (url = "/api/posts/") => {
    setLoading(true);
    try {
      const response = await API.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      setBlogs(response.data.results);
      setCount(response.data.count);
      setNext(response.data.next);
      setPrevious(response.data.previous);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="blog-list">
      <div className="container">
        <div className="blog-list-content">
          {blogs.map((blog) => (
            <div className="card" key={blog.id}>
              <div className="header-image">
                {" "}
                <img src="/post-1.jpg" alt="hero" className="card-image" />
              </div>
              <div className="content">
                <div className="author-section">
                  <div className="label-1">
                    <UserRound className="icon" />
                    {blog.user?.user_name || "Unown"}
                  </div>
                  <div className="label-2">
                    <CalendarDays className="icon" />
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className="content-header">
                  <p>{blog.title}</p>
                </div>
                <div className="content-card">
                  <ReactMarkdown>
                    {blog.body.split(" ").slice(0, 10).join(" ").toLowerCase() +
                      "..."}
                  </ReactMarkdown>
                </div>
                <div className="card-footer">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
          ))}

          {loading && <p>Loading...</p>}
        </div>
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => previous && fetchBlogs(previous)}
            disabled={!previous}
          >
            Previous
          </button>

          <span style={{ margin: "0 10px" }}>
            Showing {blogs.length} of {count} posts
          </span>

          <button onClick={() => next && fetchBlogs(next)} disabled={!next}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
