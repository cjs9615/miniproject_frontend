const ButtonGray = ({caption, handleClick}) => {
    return (
        <button onClick={handleClick} 
        className="bg-slate-500 hover:bg-slate-700 rounded-lg text-white font-bold py-3 px-4 border-0">
            {caption}
        </button>
    )
}

export default ButtonGray