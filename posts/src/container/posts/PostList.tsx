import React, { useState, useEffect } from "react";
import "./Posts.css";
import { FilterPost } from "./components/filter/Filter";
import { Search } from "./components/searchedPosts/Search";
import { FilteredPosts } from "./components/filteredPosts/FilteredPosts";
import { PaginatedPosts } from "./components/paginatedPosts/PaginatedPosts";
import { AddPost } from "./components/addPosts/AddPost";
import useModal from "./components/useModal/useModal";

export function PostList(props: any) {
  const { posts, allpost, status, filterstatus, filters } = props;
  const { isShowing, toggle } = useModal();

  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [selectedTitle, setSelectedTitle] = useState<any>(0);
  const [searchedValue, setSearchedValue] = useState<string>("");

  const loading = status === "loading" ? true : false;
  const isFiltered = filterstatus === "success" ? true : false;

  // making pagination function userId posts there are 10 different userID

  const Pagination = (allPosts: any, selectedPage: any) => {
    const groupedPosts = allPosts.filter((item: any) => {
      return item.userId === selectedPage;
    });

    return groupedPosts;
  };

  useEffect(() => {
    Pagination(posts, selectedPage);
  }, [selectedPage]);

  // calling pagination function
  const paginatedPosts = Pagination(posts, selectedPage);

  //searching title from posts
  const searchedPosts =
    searchedValue &&
    paginatedPosts?.filter((item: any) => item.title.includes(searchedValue));

  // after searching showing searched posts
  if (searchedPosts) {
    return (
      <>
        <div className="titleWithFilter">
          <div className="filter">
            <FilterPost parentCallback={setSearchedValue} />
          </div>
        </div>
        <Search
          loading={loading}
          searchedPosts={searchedPosts}
          setSelectedTitle={setSelectedTitle}
        />
      </>
    );
  }

  // after filtering posts shows only filtered posts
  if (isFiltered && filters.length > 0) {
    return (
      <>
        <div className="titleWithFilter">
          <div className="filter">
            <FilterPost parentCallback={setSearchedValue} />
          </div>
        </div>
        <FilteredPosts
          loading={loading}
          filters={filters}
          setSelectedTitle={setSelectedTitle}
        />
      </>
    );
  }

  // main posts withou filtering and searching
  return (
    <>
      <div className="titleWithFilter">
        <div className="filter">
          <FilterPost parentCallback={setSearchedValue} />
        </div>
        <div onClick={toggle} className="addPost">
          <p>Добавить Пост</p>
        </div>
      </div>
      <AddPost isShowing={isShowing} toggle={toggle} />
      <PaginatedPosts
        allpost={allpost}
        loading={loading}
        paginatedPosts={paginatedPosts}
        setSelectedTitle={setSelectedTitle}
        setSelectedPage={setSelectedPage}
      />
    </>
  );
}

export default PostList;
