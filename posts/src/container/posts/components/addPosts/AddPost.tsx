import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addPost,
  remainedPosts,
  addedposts,
  allposts,
} from "../../../redux/postSlice";

import Modal from "../useModal/modal";
import "./AddPost.css";

export interface Props {
  isShowing: Boolean;
  toggle: any;
}
export const AddPost = ({ isShowing, toggle }: Props) => {
  // redux data
  const remained = useSelector(remainedPosts);
  const dispatch = useDispatch();
  const posts = useSelector(allposts);
  const addedOne = useSelector(addedposts);

  // making state for form adding

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const changeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const changeBody = (e: any) => {
    setBody(e.target.value);
  };

  // submitting one new post which is created

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let data = {
      title: title,
      body: body,
      userId: 1,
    };
    dispatch(addPost(data));

    addLocalStorage();
    toggle();
  };

  //localhost logic to update added value from remainded posts if there had been delation in posts otherwise  from fakse api

  function addLocalStorage() {
    if (remained.length > 1) {
      localStorage.setItem("posts", JSON.stringify([...addedOne, ...remained]));
    } else {
      localStorage.setItem("posts", JSON.stringify([...addedOne, ...posts]));
    }
  }

  // make modal to show form

  return (
    <Modal isShowing={isShowing} hide={toggle} title="Добавить Пост">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="заголовок"
            onChange={changeTitle}
            value={title}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder=" Основной текст"
            onChange={changeBody}
            value={body}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Отправить" />
        </div>
      </form>
    </Modal>
  );
};
