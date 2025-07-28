import { useEffect, useState, useMemo } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../styles/posts.css";
import { fetchAllBlogPost, fetchAllTags } from "../services/blogService";
import { ChevronRight } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import BlogList from "../components/BlogList";

function Post() {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const [ordering, setOrdering] = useState("-created_at");

  const [tags, setTags] = useState([]);

  useEffect(() => {
    const loadAllTags = async () => {
      const data = await fetchAllTags();
      setTags(data);
    };
    loadAllTags();
  }, []);

  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };
  return (
    <section className="post">
      <div className="container">
        <div className="flex-row">
          <div className="filter-content">
            <div className="btn-filter">
              <span className="flex-row items-center gap">
                <SlidersHorizontal />
                Filter
              </span>
            </div>
            <div className="pagination">
              {" "}
              <p>Showing 1-12 of 10000+ blog</p>
            </div>
            <div className="dropdown">
              <span>Sort By: </span>
              <button onClick={toggleDropdown} className="dropbtn">
                Default
                <ChevronDown />
              </button>

              {dropDownOpen && (
                <div className="dropdown-content">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setOrdering("-created_at");
                      setDropDownOpen(false);
                    }}
                  >
                    Newest
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setOrdering("created_at");
                      setDropDownOpen(false);
                    }}
                  >
                    Oldest
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setOrdering("-view_count");
                      setDropDownOpen(false);
                    }}
                  >
                    Most popular
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-row">
          <div className="post-content">
            <BlogList ordering={ordering} />
          </div>
          <div className="flex-col">
            {" "}
            <div className="card category-card">
              <h3 className="header-category">Categories</h3>
              <ul className="option-category">
                <li>
                  <span className="flex-row items-center">
                    {" "}
                    <ChevronRight />
                    Technology
                  </span>
                </li>
                <li>
                  <span className="flex-row items-center">
                    {" "}
                    <ChevronRight />
                    Design
                  </span>
                </li>
                <li>
                  <span className="flex-row items-center">
                    {" "}
                    <ChevronRight />
                    Business
                  </span>
                </li>
                <li>
                  <span className="flex-row items-center">
                    {" "}
                    <ChevronRight />
                    Nature
                  </span>
                </li>
                <li>
                  <span className="flex-row items-center">
                    {" "}
                    <ChevronRight />
                    News
                  </span>
                </li>
                <li>
                  <span className="flex-row items-center">
                    {" "}
                    <ChevronRight />
                    Health
                  </span>
                </li>
              </ul>
            </div>
            <div className="card tag-card">
              <h3 className="header-tag">Tags</h3>
              <ul className="option-tag">
                {tags.map((tag) => (
                  <li key={tag.id}>{tag.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Post;
