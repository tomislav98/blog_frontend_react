import Navbar from "../components/Navbar";
import BlogDetails from "../components/BlogDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBlogPost } from "../services/blogService";

function useBlog(id) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchBlogPost(id);
        if (mounted) {
          setBlog(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.error("Failed to fetch blog post:", err);
          setError(err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  return { blog, loading, error };
}

function BlogDetailsPage() {
  const { id } = useParams(); // get id from route params
  const { blog, loading, error } = useBlog(id);

  if (loading) return <p>Loading blog post...</p>;
  if (error) return <p>Error loading blog post.</p>;

  return (
    <div>
      <Navbar blog={blog} />
      <BlogDetails blog={blog} id={id} />
    </div>
  );
}

export default BlogDetailsPage;
