import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Style.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  allposts,
  selectedPost,
  postId,
  commentbyId,
  comments,
} from "../../../redux/postSlice";

export const SelectedPosts = () => {
  // inside every posts there are comments for every post

  const { slug } = useParams();
  const allcomments = useSelector(commentbyId);
  const PostbyId = useSelector(postId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (slug) {
      dispatch(comments(slug));
      dispatch(selectedPost(slug));
    }
  }, [dispatch]);

  return (
    <div className="posts">
      <ul className="PostsById">
        <div className="backTo">
          {" "}
          <Link to="/" className="linkStyle">
            <p>Вернуться на главную страницу</p>
          </Link>
        </div>
        <li>
          <h4>{PostbyId.title}</h4>
          <p>{PostbyId.body}</p>
          <p className="comments">Комментарии</p>

          {allcomments?.map((item: any) => {
            return (
              <li key={item.id}>
                <h4 style={{ fontSize: "16px" }}>{item.name}</h4>
                <h5>{item.body}</h5>
                <h5>{item.email}</h5>
              </li>
            );
          })}
        </li>
      </ul>
    </div>
  );
};
export default SelectedPosts;
