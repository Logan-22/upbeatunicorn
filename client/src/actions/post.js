import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES
} from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/post");
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/post/like/${postId}`
    );
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId: postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/post/unlike/${postId}`
    );
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId: postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/post/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId
    });
    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(
      "http://localhost:5000/api/post/",
      formData,
      config
    );
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert("Post Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/post/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(
      `http://localhost:5000/api/post/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/post/comment/${postId}/${commentId}`
    );
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId
    });
    dispatch(setAlert("Comment Deleted", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
