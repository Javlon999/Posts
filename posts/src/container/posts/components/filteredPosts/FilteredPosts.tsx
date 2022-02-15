import Spinner from "../spinner/Spinner";
import { Link } from 'react-router-dom';
export const FilteredPosts = (props: any) => {
  const { loading, filters, setSelectedTitle } = props;
  
  // filtered posts showing data 
  return (
      <>
        <div className="posts">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          filters?.map((item: any) => {
            return (
              <ul className="listOfPosts" key={item.id}>
                <li onClick={() => setSelectedTitle(item.id)}>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                  <Link to={`/post/${item.id}`} ><button
                      className="fullInfo" >
                  {'more'}
                </button></Link>
                </li>
              </ul>
            );
          })
        )}
      </div>
      </>
    )
}