import { useState, useEffect, useRef } from "react";
import { SERVER_URL } from "../comm/constants";

const MycalorieWeek = () => {
    const token = sessionStorage.getItem("token")
    const today = new Date();
    const [dietList, setDietList] = useState([])
    const [weekTag, setWeekTag] = useState()
    const [sumTag, setSumTag] = useState()
    const [avgTag, setAvgTag] = useState()

    const date = useRef()

    let lastWeek = new Date()
    lastWeek.setDate(today.getDate() - 7);
    const [formattedLastWeekOne, setFormattedLastWeekOne] = useState(lastWeek.toISOString().slice(0, 10));
    lastWeek.setDate(lastWeek.getDate() + 1);
    const [formattedLastWeekTwo, setFormattedLastWeekTwo] = useState(lastWeek.toISOString().slice(0, 10))
    lastWeek.setDate(lastWeek.getDate() + 1);
    const [formattedLastWeekThree, setFormattedLastWeekThree] = useState(lastWeek.toISOString().slice(0, 10))
    lastWeek.setDate(lastWeek.getDate() + 1);
    const [formattedLastWeekFour, setFormattedLastWeekFour] = useState(lastWeek.toISOString().slice(0, 10))
    lastWeek.setDate(lastWeek.getDate() + 1);
    const [formattedLastWeekFive, setFormattedLastWeekFive] = useState(lastWeek.toISOString().slice(0, 10))
    lastWeek.setDate(lastWeek.getDate() + 1);
    const [formattedLastWeekSix, setFormattedLastWeekSix] = useState(lastWeek.toISOString().slice(0, 10))
    lastWeek.setDate(lastWeek.getDate() + 1);
    const [formattedLastWeekSeven, setFormattedLastWeekSeven] = useState(lastWeek.toISOString().slice(0, 10))

    // console.log(formattedLastWeekOne)
    // console.log(formattedLastWeekTwo)
    // console.log(formattedLastWeekThree)
    // console.log(formattedLastWeekFour)
    // console.log(formattedLastWeekFive)
    // console.log(formattedLastWeekSix)
    // console.log(formattedLastWeekSeven)

    const handleChangeDate = (event) => {
        const dateArray = event.target.value.split("-");
        const year = parseInt(dateArray[0], 10);
        const month = parseInt(dateArray[1], 10) - 1;
        const day = parseInt(dateArray[2], 10);

        let convertedDate = new Date(year, month, day);
        convertedDate.setDate(convertedDate.getDate() + 1);
        setFormattedLastWeekOne(convertedDate.toISOString().slice(0, 10))
        convertedDate.setDate(convertedDate.getDate() + 1);
        setFormattedLastWeekTwo(convertedDate.toISOString().slice(0, 10))
        convertedDate.setDate(convertedDate.getDate() + 1);
        setFormattedLastWeekThree(convertedDate.toISOString().slice(0, 10))
        convertedDate.setDate(convertedDate.getDate() + 1);
        setFormattedLastWeekFour(convertedDate.toISOString().slice(0, 10))
        convertedDate.setDate(convertedDate.getDate() + 1);
        setFormattedLastWeekFive(convertedDate.toISOString().slice(0, 10))
        convertedDate.setDate(convertedDate.getDate() + 1);
        setFormattedLastWeekSix(convertedDate.toISOString().slice(0, 10))
        convertedDate.setDate(convertedDate.getDate() + 1);
        setFormattedLastWeekSeven(convertedDate.toISOString().slice(0, 10))
    }

    useEffect(() => {
        if(!token){
            window.location.replace("/login")
            return
        }
        date.current.value = formattedLastWeekOne
        fetch(SERVER_URL + 'api/private/memberfoodgetweek', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' ,
                        "Authorization" : token },
            body: formattedLastWeekOne + "," + formattedLastWeekSeven + "," + sessionStorage.getItem("username")
        })
        .then(Response => Response.json())
        .then((data) => setDietList(data))
        .catch(err => console.error(err))
    }, [formattedLastWeekOne, formattedLastWeekSeven, token])

    useEffect(() => {
        const week = [formattedLastWeekOne,formattedLastWeekTwo,formattedLastWeekThree,formattedLastWeekFour,formattedLastWeekFive,formattedLastWeekSix,formattedLastWeekSeven]
        const temp = week.map((item) => {
            let tempList = dietList.filter((i) => i[3] === item)
            tempList.unshift(item)
            return tempList
        })

        const tempTag = temp.map((item) => {
            let carbohydrates = 0
            let fat = 0
            let protein = 0
            let calorie = 0
            if(item[1] === undefined){
                return  <tr key={item[0]}>
                            <td className="text-center">{item[0]}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
            }
            else {
                item.map((i) => {
                    if(i[1].carbohydrates === undefined) return i
                    let gram = i[2] / 100
                    carbohydrates += i[1].carbohydrates * gram
                    fat += i[1].fat * gram
                    protein += i[1].protein * gram
                    calorie += i[1].calorie * gram
                    return i
                })
                return  <tr key={item[0]}>
                            <td className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{item[0]}</td>
                            <td className="text-right text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{carbohydrates.toFixed(3)}</td>
                            <td className="text-right text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{protein.toFixed(3)}</td>
                            <td className="text-right text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{fat.toFixed(3)}</td>
                            <td className="text-right text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{calorie.toFixed(3)}</td>
                        </tr>
            }
        })
        setWeekTag(tempTag)
        let allCarbohydrates = 0
        let allProtein = 0
        let allFat = 0
        let allCalorie = 0
        dietList.map((item) => {
            let gram = item[2] / 100
            allCarbohydrates += item[1].carbohydrates * gram
            allProtein += item[1].protein * gram
            allFat += item[1].fat * gram
            allCalorie += item[1].calorie * gram
            return item
        })
        setSumTag(<tr key='sum'>
                    <td className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>총합</td>
                    <td className="text-right text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{allCarbohydrates.toFixed(3)}</td>
                    <td className="text-right text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{allProtein.toFixed(3)}</td>
                    <td className="text-right text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{allFat.toFixed(3)}</td>
                    <td className="text-right text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{allCalorie.toFixed(3)}</td>
                </tr>
        )
        setAvgTag(<tr key='avg'>
                    <td className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>일일평균</td>
                    <td className="text-right text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{(allCarbohydrates/7).toFixed(3)}</td>
                    <td className="text-right text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{(allProtein/7).toFixed(3)}</td>
                    <td className="text-right text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{(allFat/7).toFixed(3)}</td>
                    <td className="text-right text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>{(allCalorie/7).toFixed(3)}</td>
                </tr>
        )
    }, [dietList,formattedLastWeekOne,formattedLastWeekTwo,formattedLastWeekThree,formattedLastWeekFour,formattedLastWeekFive,formattedLastWeekSix,formattedLastWeekSeven])

    return (
        <div className="flex w-screen h-screen justify-center">
            {!token ? <></> :
            <div className="w-3/5 h-full">
                <div className='mt-16 mb-3 pb-2 border-b-2 border-b-black text-2xl' style={{fontFamily: "Noto Sans KR", fontWeight: "800"}}>
                    {formattedLastWeekOne} ~ {formattedLastWeekSeven} 영양 성분
                </div>
                <div className="flex">
                    <div className="flex mb-4 ml-5 mr-3 justify-end items-center">시작 날짜 :</div>
                    <div className="w-3//6">
                        <input ref={date} type="date" id="date" name="date" onChange={handleChangeDate} />
                    </div>
                </div>
                <table className="table-fixed">
                    <thead>
                        <tr>
                            <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>날짜</th>
                            <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>탄수화물(g)</th>
                            <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>단백질(g)</th>
                            <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>지방(g)</th>
                            <th className="text-center text-sm" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>열량(kcal)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weekTag}
                        {sumTag}
                        {avgTag}
                    </tbody>
                </table>
            </div>
            }
        </div>
    )
}

export default MycalorieWeek