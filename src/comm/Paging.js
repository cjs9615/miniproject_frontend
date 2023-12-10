import '../app/Paging.css';
import Pagination from "react-js-pagination";

const Paging = ({page, countPerPage, count, setPage}) => {
    return (
        <Pagination
            activePage={page}
            itemsCountPerPage={countPerPage}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={setPage}
        />
    )
}

export default Paging
