import React, { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import { useDispatch } from "react-redux";
import { storeData, flagStatus, afterDelete } from "../../../redux/postSlice";
import EditPost from "../editPost/EditPost";
import useModal from "../useModal/useModal";
import List from "./Lists";
import Paginations from "./Paginations";
import DeletePost from "../deletePost/DeletePost";
export const PaginatedPosts = (props: any) => {
  // there are child components for delete update posts  and modal to confirm and make changes

  const { isShowing, toggle } = useModal();
  const { isShowing: isDeleteShowing, toggle: isDeleteToggle } = useModal();
  const {
    loading,
    allpost,
    paginatedPosts,
    setSelectedPage,
    setSelectedTitle,
  } = props;

  const dispatch = useDispatch();
  const [editValue, setEditValue] = useState<any>();
  const [selectedId, setSelectedId] = useState<any>();
  let getlocalstorageData: any = localStorage.getItem("posts");
  let parsedData = JSON.parse(getlocalstorageData);

  // pagination numbers showed in footer by every pagination calculated there

  const paginated: any = [];
  const pagination = () => {
    let count = Math.floor(allpost.length / 10);
    for (let i: number = 0; i < count; i++) {
      paginated.push(i);
    }
  };
  pagination();

  useEffect(() => {
    dispatch(storeData(parsedData));
  }, [dispatch, localStorage.getItem("posts")]);

  // update logic for posts

  const editItem = (id: number) => {
    let edited = parsedData.find((item: any) => id == item.id);
    setEditValue(edited);
    toggle();
    dispatch(flagStatus(true));
  };

  // open modal for delete post
  const openToggle = (id: any) => {
    setSelectedId(id);
    isDeleteToggle();
  };

  return (
    <>
      <div className="posts">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <List
            editItem={editItem}
            toggle={openToggle}
            setSelectedTitle={setSelectedTitle}
            paginatedPosts={paginatedPosts}
          />
        )}
      </div>
      <DeletePost
        toggle={isDeleteToggle}
        selectedId={selectedId}
        isShowing={isDeleteShowing}
      />
      <EditPost editValue={editValue} toggle={toggle} isShowing={isShowing} />
      <Paginations paginated={paginated} setSelectedPage={setSelectedPage} />
    </>
  );
};
