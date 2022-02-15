import React, { useState, useEffect, useCallback } from "react";

import { useDispatch } from "react-redux";
import { searchPosts } from "../../../redux/postSlice";
import "./Filter.css";

export interface Options {
  label: string;
  value: number;
}

export const Options = [
  {
    label: "Выберите автора ",
  },
  {
    label: "Первый автор",
    value: 1,
  },
  {
    label: "Второй автор",
    value: 2,
  },
  {
    label: "Третий автор",
    value: 3,
  },
  {
    label: "Четвертый автор",
    value: 4,
  },
  {
    label: "Пятый автор",
    value: 5,
  },
  {
    label: "Шестой автор",
    value: 6,
  },
  {
    label: "Седьмой автор",
    value: 7,
  },
  {
    label: "Восьмой автор",
    value: 8,
  },
  {
    label: "Девятый автор",
    value: 9,
  },
  {
    label: "Десятый автор",
    value: 10,
  },
];

export const FilterPost = ({ parentCallback }: any) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const [author, setAuthor] = useState<number>(0);

  // filtering function and callback to parent component

  const FilterChange = (e: any) => {
    setValue(e.target.value);
    parentCallback(e.target.value);
  };
  // changing logic in searching post
  const handleChange = (e: any) => {
    setAuthor(e.target.value);
  };
  useEffect(() => {
    if (author > 0) {
      dispatch(searchPosts(author));
    }
    if (author == 0) {
      dispatch(searchPosts(0));
    }
  }, [dispatch, author]);

  const resetFilter = useCallback(() => {
    setAuthor(0);
  }, [setAuthor]);

  return (
    <div className="FilterValue">
      <div>
        {" "}
        <input
          type="text"
          placeholder="Поиск по названию"
          value={value}
          onChange={FilterChange}
        />
      </div>
      <select name="filterauthor" value={author} onChange={handleChange}>
        {Options.map((item: any) => (
          <>
            {" "}
            <option value={item.value} key={item.label}>
              {item.label}
            </option>{" "}
          </>
        ))}
      </select>
      <button className="resetFilter" onClick={resetFilter}>
        Сбросить Фильтр
      </button>
    </div>
  );
};
