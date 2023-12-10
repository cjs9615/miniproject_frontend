import { useEffect, useState } from "react";
import { SERVER_URL } from "../comm/constants";
import Paging from "../comm/Paging";
import ButtonSearch from "../comm/ButtonSearch";

const FoodList = () => {
    const [foodList, setFoodList] = useState([]);
    const [foodTag, setFoodTag] = useState();
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState([]);
    const [postPerPage] = useState(10);
    const indexOfLastPost = page * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    
    const handleKeywordChange = (event) => {
        setKeyword(event.target.value)
    }

    const search = () => {
        if(keyword === ''){
            alert('키워드가 입력되지 않았습니다.')
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
    }

    const handlePageChange = (page) => {
        setPage(page);
    };

    useEffect(() => {
        setCurrentPosts(foodList.slice(indexOfFirstPost, indexOfLastPost));
    }, [foodList, page, indexOfFirstPost, indexOfLastPost])

    useEffect(() => {
        let temp = currentPosts
        .map((item) => 
            <tr key={item.id}>
                <td className="text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{item.name}</td>
                <td className="text-right text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{item.carbohydrates}</td>
                <td className="text-right text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{item.protein}</td>
                <td className="text-right text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{item.fat}</td>
                <td className="text-right text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{item.calorie}</td>
            </tr>
        )
        temp.length === 0 
        ? setFoodTag(<tr>
                    <td className="text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>(ex)멥쌀, 백미, 밥</td>
                    <td className="text-right text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>00</td>
                    <td className="text-right text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>00</td>
                    <td className="text-right text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>00</td>
                    <td className="text-right text-xs" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>00</td>
                </tr>)
        : setFoodTag(temp)
    }, [currentPosts])

    return (
        <div className="flex w-screen h-screen justify-center">
            <div className="w-3/5 h-full">
                <div className="h-1/5">
                    <div className='mt-5 mb-3 pb-2 border-b-2 border-b-black text-2xl' style={{fontFamily: "Noto Sans KR", fontWeight: "800"}}>
                        영양정보 검색
                    </div>
                    <div className="flex h-24 border-2 border-gray-200 rounded-xl items-center">
                        <input className="ml-14 mt-5 w-5/6 h-1/2" 
                            type="text"
                            name="keyword"
                            id="keyword"
                            onChange={handleKeywordChange}
                        />
                        <div className="mr-14 w-1/6 h-1/2">
                            <ButtonSearch handleClick={search}/>
                        </div>
                    </div>
                </div>
                <div className="mt-1 h-2/4">
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
                <div className="h-1/5 mt-3">
                    {<Paging page={page} countPerPage={10} count={foodList.length} setPage={handlePageChange}/>}
                </div>
            </div>
        </div>
    );
}

export default FoodList
