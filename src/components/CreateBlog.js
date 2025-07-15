// src/components/Login.js
import "../styles/create-blog.css";
import BlogEditor from "./BlogEditor";

function CreateBlog() {
  return (
    <section className="create-blog">
      <div className="container">
        <div className="create-blog-content">
          <div className="header-section">
            <h1 className="create-blog-heading text-xxl">Blog with the best</h1>
            <p>Enjoy modern technology for creating blogs effortlessly.</p>
          </div>
          <BlogEditor />
        </div>
      </div>
    </section>
  );
}

export default CreateBlog;
