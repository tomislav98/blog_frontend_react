import { useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import API from "../services/axios";
import "../styles/blog-editor.css";
import { Heading1, Tags, NotebookPen, Folder } from "lucide-react";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);

  const [tagInput, setTagInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const [tagNames, setTagNames] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);

  const handleEditorChange = ({ text }) => {
    setBody(text);
  };

  const addTags = () => {
    const parsed = tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag && !tagNames.includes(tag));
    setTagNames([...tagNames, ...parsed]);
    setTagInput("");
  };

  const addCategories = () => {
    const parsed = categoryInput
      .split(",")
      .map((cat) => cat.trim())
      .filter((cat) => cat && !categoryNames.includes(cat));
    setCategoryNames([...categoryNames, ...parsed]);
    setCategoryInput("");
  };

  const removeTag = (tagToRemove) => {
    setTagNames(tagNames.filter((tag) => tag !== tagToRemove));
  };

  const removeCategory = (catToRemove) => {
    setCategoryNames(categoryNames.filter((cat) => cat !== catToRemove));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("status", status.trim());
    formData.append("body", body.trim());

    tagNames.forEach((tag) => formData.append("tag_names", tag));
    categoryNames.forEach((cat) =>
      formData.append("category_names_input", cat),
    );

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await API.post("/api/posts/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Blog created:", response.data);
      alert("Blog successfully created");
    } catch (error) {
      console.error(
        "Error creating blog:",
        error.response?.data || error.message,
      );
      alert("Failed to create blog");
    }
  };

  return (
    <div className="blog-editor">
      <div className="container">
        <div className="section-1">
          <h3>Title</h3>
          <div className="input-container" style={{ marginBottom: "20px" }}>
            <Heading1 />
            <input
              className="form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title here..."
            />
          </div>

          <h3>Status</h3>
          <div className="drop-down-container" style={{ marginBottom: "20px" }}>
            <select
              className="form-control-drop-down"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">-- Select Status --</option>
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>
          </div>

          <h3>Tags</h3>
          <div className="input-container" style={{ marginBottom: "10px" }}>
            <Tags />
            <input
              className="form-control"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onBlur={addTags}
              placeholder="e.g. react, javascript"
            />
          </div>
          <div className="chip-container">
            {tagNames.map((tag, i) => (
              <span className="chip" key={i} onClick={() => removeTag(tag)}>
                {tag} &times;
              </span>
            ))}
          </div>

          <h3>Categories</h3>
          <div className="input-container" style={{ marginBottom: "10px" }}>
            <Folder />
            <input
              className="form-control"
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onBlur={addCategories}
              placeholder="e.g. frontend, tutorials"
            />
          </div>
          <div className="chip-container">
            {categoryNames.map((cat, i) => (
              <span
                className="chip"
                key={i}
                onClick={() => removeCategory(cat)}
              >
                {cat} &times;
              </span>
            ))}
          </div>

          <h3>Image</h3>
          <div className="image-container">
            <input
              className="image-input"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            onClick={handleSave}
            className="btn btn-primary"
            style={{ marginTop: 20 }}
          >
            Publish
          </button>
        </div>

        <div className="section-2">
          <h3>
            <NotebookPen /> Body (Markdown)
          </h3>
          <MdEditor
            value={body}
            style={{ height: "400px" }}
            renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
}
