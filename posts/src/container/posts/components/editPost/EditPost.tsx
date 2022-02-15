import React, { useState } from "react";
import Modal from "../useModal/modal";
import { useSelector, useDispatch } from "react-redux";
import { updatePost, addedposts, allposts } from "../../../redux/postSlice";

export interface Props {
  isShowing: Boolean;
  toggle: any;
  editValue: any;
}

const EditPost = ({ isShowing, toggle, editValue }: Props) => {
  const dispatch = useDispatch();
 
  const titleValue = editValue?.title;
  const bodyValue = editValue?.body;
  const [title, setTitle] = useState<any>(titleValue);
  const [body, setBody] = useState<any>(bodyValue);

  // submitting edited value 
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let data = {
      body: body,
      id: editValue?.id,
      title: title,
      userId: editValue?.userId,
    };
    dispatch(updatePost(data));
    toggle();
  };

  return (
    <Modal isShowing={isShowing} hide={toggle} title="Редактировать Пост">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Заголовок</label>
          <input
            type="text"
            placeholder="заголовок"
            defaultValue={titleValue}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="form-group">
          <label>Основной текст</label>
          <textarea
            placeholder=" Основной текст"
            defaultValue={bodyValue}
            onChange={(e) => setBody(e.target.value)}
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

export default EditPost;
