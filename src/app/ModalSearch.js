import { useEffect, useState } from "react";
import ReactModal from "react-modal"
import { SERVER_URL } from "../comm/constants";
import Paging from "../comm/Paging";
const Modal = ({isOpen, setIsOpen, foodName, memberFood, setMemberFood, setInsertFood}) => {
    const [foodList, setFoodList] = useState([]);
    const [foodTag, setFoodTag] = useState();
    const [keyword, setKeyword] = useState();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0)
    const [currentPosts, setCurrentPosts] = useState([]);
    const [postPerPage] = useState(10);
    const indexOfLastPost = page * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value)
    }

    const handlePageChange = (page) => {
        setPage(page);
    };

    useEffect(() => {
        if(keyword === '' || keyword === undefined){
            return
        }
        fetch(SERVER_URL + 'api/public/search', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: keyword
        })
        .then(Response => Response.json())
        .then(data => setFoodList(data))
        .catch(err => console.error(err))
        setPage(1)
    }, [keyword])

    useEffect(() => {
        setCurrentPosts(foodList.slice(indexOfFirstPost, indexOfLastPost));
        setCount(foodList.length)
    }, [foodList, page, indexOfFirstPost, indexOfLastPost])

    useEffect(() => {
        let temp = currentPosts
        .map((item) => 
            <tr className="hover:bg-gray-400" key={item.id} onClick={() => {
                foodName.current.value = item.name
                setMemberFood({...memberFood, 'foodId' : item.id})
                setInsertFood(item)
                setIsOpen(false)
            }}>
                <td className="text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{item.name}</td>
                <td className="text-right text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{item.carbohydrates}</td>
                <td className="text-right text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{item.protein}</td>
                <td className="text-right text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{item.fat}</td>
                <td className="text-right text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{item.calorie}</td>
            </tr>
        )
        setFoodTag(temp)
    }, [currentPosts, foodName, setIsOpen, memberFood, setMemberFood, setInsertFood])

    useEffect(() => {
        if(isOpen === true){
            setFoodTag(<></>)
            setCount(0)
        }
    }, [isOpen])

    return (
        <ReactModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={{content: {left: "20%", right: "20%"}}}>
            <div className="flex w-full h-full justify-center">
                <div className="w-full h-full">
                    <div className="h-1/5">
                        <div className="flex h-24 border-2 border-gray-200 rounded-xl items-center">
                            <input className="ml-14 mr-14 mt-5 w-5/6 h-1/2" 
                                type="text"
                                name="keyword"
                                id="keyword"
                                onChange={handleKeywordChange}
                            />
                        </div>
                    </div>
                    <div className="mt-1 h-3/5">
                        <div className="h-5/6">
                            <table className="table-fixed">
                                <thead>
                                    <tr>
                                        <th className="w-5/12 text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>음식(100g당)</th>
                                        <th className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>탄수화물(g)</th>
                                        <th className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>단백질(g)</th>
                                        <th className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>지방(g)</th>
                                        <th className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>열량(kcal)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foodTag}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="h-1/6">
                        <div>
                            {<Paging page={page} countPerPage={10} count={count} setPage={handlePageChange}/>}
                        </div>
                        <div className="mt-8 mx-40">
                            <button onClick={() => setIsOpen(false)}>닫기</button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    )
}

export default Modal
