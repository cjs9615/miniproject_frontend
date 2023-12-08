import { FaSearch } from "react-icons/fa";

const ButtonSearch = ({handleClick}) => {
    return (
        <button className="flex w-full h-full justify-center items-center bg-slate-500 text-white" onClick={handleClick}>
            <FaSearch className=""/>
        </button>
    )
}

export default ButtonSearch
