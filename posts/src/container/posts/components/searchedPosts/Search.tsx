import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";
export const Search = (props: any) => {
  // searching  child component and click to see full info inside every post

  const { loading, searchedPosts, setSelectedTitle } = props;
  return (
    <div className="posts">
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        searchedPosts?.map((item: any) => {
          return (
            <ul className="listOfPosts" key={item.id}>
              <li onClick={() => setSelectedTitle(item.id)}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
                <Link to={`/post/${item.id}`}>
                  <button className="fullInfo">{"more"}</button>
                </Link>
              </li>
            </ul>
          );
        })
      )}
    </div>
  );
};
