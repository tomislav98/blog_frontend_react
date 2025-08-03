import API from "./axios"; // Adjust the path if needed

export const fetchBlogPost = async (id) => {
  const response = await API.get(`/api/posts/${id}/`, {});
  return response.data;
};

export const fetchAllBlogPost = async (ordering = "-created_at", page = 1) => {
  const response = await API.get(
    `/api/posts/?ordering=${ordering}&page=${page}`,
  );
  return response;
};

export const fetchAllBlogPostByUrl = async (url) => {
  const response = await API.get(url);
  return response;
};

export const fetchAllTags = async () => {
  const response = await API.get(`/api/tags/`, {});
  return response.data.results;
};

export const getPostBySlug = async (slug) => {
  const response = await API.get(`/api/posts/by-slug/?slug=${slug}`);
  return response;
};
