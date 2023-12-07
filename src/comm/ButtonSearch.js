import { FaSearch } from "react-icons/fa";

const ButtonSearch = ({handleClick}) => {
    return (
        <button className="flex w-full h-full justify-center items-center" onClick={handleClick}>
            <FaSearch className=""/>
        </button>
    )
}

export default ButtonSearch
