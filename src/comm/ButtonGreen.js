const ButtonBlue = ({caption, handleClick}) => {
    return (
        <button onClick={handleClick} 
        className="bg-bt hover:bg-green-900 rounded-full text-white font-bold py-3 px-4 border-0">
            {caption}
        </button>
    )
}

export default ButtonBlue