import React from 'react'
import { Link } from 'react-router-dom'
const TailLink = ({href, title, handleClick}) => {
    return (
        <Link to={href} style={{fontFamily: "Noto Sans KR", fontWeight: "800"}} className="hover:bg-slate-200 visited:bg-nav hover:rounded-lg p-2 m-2" onClick={handleClick}>{title}</Link>
    )
}

export default TailLink

