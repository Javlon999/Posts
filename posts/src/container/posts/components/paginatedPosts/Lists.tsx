import { Link } from 'react-router-dom';

const List = ({ paginatedPosts, setSelectedTitle, toggle, editItem }: any) => {

  // showing list of posts card from each posts

  return (
        
    paginatedPosts?.map((item: any) => {
        return (
          <ul className="listOfPosts" key={item.id}>
            <li onClick={() => setSelectedTitle(item.id)}>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
              {item.id && <>
                <div className='actionButtons'>
                <div >
                <Link to={`/post/${item.id}`} ><button
                  className="fullInfo" >
                  {'еще'}
                  </button></Link>
                  </div>
                
                  <div>
                  <button onClick={()=>editItem(item.id)}
                  className="fullInfo" >
                  {'редактировать'}
                  </button>
              <button onClick={()=>toggle(item.id)}
              className="fullInfo" >
              {'Удалить'}
                  </button>
                  </div>
                  </div>
                </>
              }
            </li>
          
          </ul>
        );
      })
    )
}

export default List