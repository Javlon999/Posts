import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// importing all redux data
import {
  remainedPosts,
  flagState,
  updatedPost,
  addedposts,
  allposts,
  allFilteredPosts,
  filterStatus,
  allStatus,
  getPosts,
} from "../redux/postSlice";

import PostList from "./PostList";
import "./Posts.css";

export function Posts() {
  //calling redux data

  const dispatch = useDispatch();
  const addedOne = useSelector(addedposts);
  const upDatedPost = useSelector(updatedPost);
  const flag = useSelector(flagState);
  const posts = useSelector(allposts);
  const status = useSelector(allStatus);
  const filters = useSelector(allFilteredPosts);
  const filterstatus = useSelector(filterStatus);
  const remained = useSelector(remainedPosts);
  let mergedData = [...addedOne, ...posts];

  useEffect(() => {}, [localStorage.getItem("posts")]);

  //storing data to localhost when add or delete  or update

  if (flag) {
    if (remained.length > 1) {
      localStorage.setItem("posts", JSON.stringify(remained));
    }
    localStorage.setItem("posts", JSON.stringify(mergedData));
  }
  if (upDatedPost.length > 0 && flag) {
    let updated = posts.map((item: any) => {
      for (let i = 0; i < upDatedPost.length; i++) {
        if (upDatedPost[i].id == item.id) {
          item = upDatedPost[i];
        }
      }
      return item;
    });
    localStorage.setItem("posts", JSON.stringify([...addedOne, ...updated]));
  }

  let getlocalstorageData: any = localStorage.getItem("posts");
  let parsedData = JSON.parse(getlocalstorageData);

  // make condition inside useEffect to not load fake json data every time when update or delete post it gets data from localhost
  // not from fake json thats way there is  a condition

  useEffect(() => {
    if (parsedData.length <= 1) {
      dispatch(getPosts());
    }
  }, [dispatch, parsedData, localStorage.getItem("posts")]);

  // making props child components
  return (
    <>
      <div className="MainBlock">
        <PostList
          posts={parsedData}
          allpost={parsedData}
          status={status}
          filterstatus={filterstatus}
          filters={filters}
        />
      </div>
    </>
  );
}
export default React.memo(Posts);
