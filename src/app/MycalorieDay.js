import Paging from "../comm/Paging";
import { SERVER_URL } from "../comm/constants";
import { useEffect, useRef, useState } from "react"
import ModalUpdate from "./ModalUpdate";

const MycalorieDay = () => {
    const token = sessionStorage.getItem("token")
    const today = new Date();
    const todayMonth = today.getMonth() + 1 < 10 ? '0' + today.getMonth() + 1 : today.getMonth() + 1 
    const todayDate = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
    const formattedDate = `${today.getFullYear()}-${todayMonth}-${todayDate}`
    const date = useRef()
    const [dietList, setDietList] = useState([])
    const [dietTag, setDietTag] = useState()
    const [page, setPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState([]);
    const [postPerPage] = useState(5);
    const indexOfLastPost = page * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [updateFood, setUpdateFood] = useState()
    const [calorieTag, setCalorieTag] = useState()
    const [detailTag, setDetailTag] = useState()

    const handleChangeDate = (event) => {
        fetch(SERVER_URL + 'api/private/memberfoodget', {
            method: 'POST',
            headers: { 'Content-Type':'application/json',
                        "Authorization" : token },
            body: event.target.value + "," + sessionStorage.getItem("username")
        })
        .then(Response => Response.json())
        .then((data) => setDietList(data))
        .catch(err => console.error(err))
    }

    const handlePageChange = (page) => {
        setPage(page);
    };

    useEffect(() => {
        if(!token){
            window.location.replace("/login")
            return
        }
        date.current.value = formattedDate
        fetch(SERVER_URL + 'api/private/memberfoodget', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' ,
                        "Authorization" : token },
            body: formattedDate + "," + sessionStorage.getItem("username")
        })
        .then(Response => Response.json())
        .then((data) => setDietList(data))
        .catch(err => console.error(err))
    }, [formattedDate, token])

    useEffect(() => {
        let allCarbohydrates = 0
        let allProtein = 0
        let allFat = 0
        let allCalorie = 0
        let allSugar = 0
        let allSodium = 0
        let allCholesterol = 0
        let allSaturatedfattyacids = 0
        let allTransfattyacids = 0
        dietList
        .map((item) => {
            let gram = item[2] / 100
            allCarbohydrates += item[1].carbohydrates * gram
            allProtein += item[1].protein * gram
            allFat += item[1].fat * gram
            allCalorie += item[1].calorie * gram
            allSugar += item[1].sugar * gram
            allSodium += item[1].sodium * gram
            allCholesterol += item[1].cholesterol * gram
            allSaturatedfattyacids += item[1].saturatedfattyacids * gram
            allTransfattyacids += item[1].transfattyacids * gram
            return item
        })
        setCalorieTag(
            <tr key='calorie'>
                <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{allCarbohydrates.toFixed(3)}</td>
                <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{allProtein.toFixed(3)}</td>
                <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{allFat.toFixed(3)}</td>
                <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{allCalorie.toFixed(3)}</td>
            </tr>
        )
        setDetailTag(
            <tr key='detail'>
                <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{allSugar.toFixed(3)}</td>
                <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{allSodium.toFixed(3)}</td>
                <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{allCholesterol.toFixed(3)}</td>
                <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{allSaturatedfattyacids.toFixed(3)}</td>
                <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{allTransfattyacids.toFixed(3)}</td>
            </tr>
        )
    }, [dietList])

    useEffect(() => {
        setCurrentPosts(dietList.slice(indexOfFirstPost, indexOfLastPost));
    }, [dietList, page, indexOfFirstPost, indexOfLastPost])

    useEffect(() => {
        let temp = currentPosts
        .map((item) => 
            <tr className="hover:bg-gray-400" key={item[0]} onClick={() => {
                                                                                setIsUpdateOpen(true)
                                                                                setUpdateFood(item)
                                                                            }}>
                <td className="text-center">{item[3]}</td>
                <td>{item[1].name}</td>
                <td className="text-right">{item[2]}</td>
            </tr>
        )
        setDietTag(temp)
    }, [currentPosts])
    

    return (
        <div className="flex w-screen h-screen justify-center">
            {!token ? <></> :
            <div className="w-3/5 h-full">
                <div className='mt-5 mb-3 pb-2 border-b-2 border-b-black text-2xl' style={{fontFamily: "Noto Sans KR", fontWeight: "800"}}>
                    {date.current === undefined ? '' : date.current.value} 영양 정보
                </div>
                <div className="flex">
                    <div className="flex mb-4 ml-5 mr-3 justify-end items-center">날짜 :</div>
                    <div className="w-3//6">
                        <input ref={date} type="date" id="date" name="date" onChange={handleChangeDate} />
                    </div>
                </div>
                <div className="h-1/3">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="text-center">시간</th>
                                <th className="w-1/2 text-center">음식이름</th>
                                <th className="text-center">무게(g)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dietTag}
                        </tbody>
                    </table>
                    {date.current === undefined ? <></> : <ModalUpdate isOpen={isUpdateOpen} setIsOpen={setIsUpdateOpen} date={date} updateFood={updateFood} dietList={dietList} setDietList={setDietList}/>}
                </div>
                <div>
                    {<Paging page={page} countPerPage={5} count={dietList.length} setPage={handlePageChange}/>}
                </div>
                <div>
                    <table className="mt-4 table-fixed">
                        <thead>
                            <tr>
                                <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>총 탄수화물(g)</th>
                                <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>총 단백질(g)</th>
                                <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>총 지방(g)</th>
                                <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>총 열량(kcal)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calorieTag}
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>총 당류(g)</th>
                                <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>총 나트륨(mg)</th>
                                <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>총 콜레스테롤(mg)</th>
                                <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>총 포화지방산(g)</th>
                                <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>총 트랜스지방산(g)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailTag}
                        </tbody>
                    </table>
                </div>
            </div>
            }
        </div>
    )
}

export default MycalorieDay
