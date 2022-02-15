const Paginations = ({ paginated, setSelectedPage }: any) => {
  // pagination child component
  return (
    <div className="pagination">
      {paginated.map((item: any, index: number) => {
        let num = index + 1;
        return (
          <div className="paginationButton" key={item}>
            {num < 11 && (
              <button className="element" onClick={() => setSelectedPage(num)}>
                {num}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Paginations;
