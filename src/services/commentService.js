import API from "./axios"; // adjust the path if needed

export const postComment = async (postId, commentBody) => {
  return API.post(
    `/api/posts/${postId}/comments/`,
    {
      comment_body: commentBody,
      post: postId,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    },
  );
};

export const fetchComments = async (postId) => {
  const response = await API.get(`/api/posts/${postId}/comments/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  const data = Array.isArray(response.data)
    ? response.data
    : (response.data.results ?? []);
  return data;
};
