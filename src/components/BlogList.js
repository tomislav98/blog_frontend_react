// src/components/BlogList.jsx
import { useEffect, useState } from "react";
import "../styles/blog-list.css";
import { UserRound } from "lucide-react";
import { CalendarDays } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import Pagination from "./Pagination";

import {
  fetchAllBlogPost,
  fetchAllBlogPostByUrl,
} from "../services/blogService";

export default function BlogList({ ordering }) {
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetchAllBlogPost(ordering, page);
      console.log(response);

      setBlogs(response.data.results);
      setCount(response.data.count);
      setNext(response.data.next);
      setPrevious(response.data.previous);
      setCurrentPage(page); // ✅ Update current page
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [ordering]);

  return (
    <div className="blog-list">
      <div className="container">
        <div className="blog-list-content" key={currentPage}>
          {blogs.map((blog) => (
            <Link to={`/blogs/${blog.id}`}>
              <div className="card" key={blog.id}>
                {blog.image && (
                  <div className="header-image">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="header-image"
                    />
                  </div>
                )}

                <div className="content">
                  <div className="content-header">
                    <h3>{blog.title}</h3>
                  </div>
                  <div className="content-card">
                    <ReactMarkdown>
                      {blog.body
                        .split(" ")
                        .slice(0, 18)
                        .join(" ")
                        .toLowerCase() + "..."}
                    </ReactMarkdown>
                  </div>
                  <div className="card-footer">
                    <div className="author-section">
                      <div className="label-2">
                        <CalendarDays className="icon" />
                        {new Date(blog.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="label-1">
                        <UserRound className="icon" />
                        {blog.user?.user_name || "Unown"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {loading && <p>Loading...</p>}
        </div>
        <Pagination
          count={count}
          blogsPerPage={blogsPerPage}
          currentPage={currentPage}
          onPageChange={fetchBlogs}
        />
      </div>
    </div>
  );
}
