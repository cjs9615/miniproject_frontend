import { useState, useEffect, useRef } from "react";
import { SERVER_URL } from "../comm/constants";

const MycalorieWeek = () => {
    const today = new Date();
    const [dietList, setDietList] = useState([])
    const [weekTag, setWeekTag] = useState()
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
        date.current.value = formattedLastWeekOne
        fetch(SERVER_URL + 'api/private/memberfoodgetall', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: formattedLastWeekOne + "," + formattedLastWeekSeven + "," + sessionStorage.getItem("username")
        })
        .then(Response => Response.json())
        .then((data) => setDietList(data))
        .catch(err => console.error(err))
    }, [formattedLastWeekOne, formattedLastWeekSeven])

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
                            <td className="text-center">{item[0]}</td>
                            <td className="text-right">{carbohydrates.toFixed(3)}</td>
                            <td className="text-right">{protein.toFixed(3)}</td>
                            <td className="text-right">{fat.toFixed(3)}</td>
                            <td className="text-right">{calorie.toFixed(3)}</td>
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
        setAvgTag(<tr key='avg'>
                    <td className="text-center">일일평균</td>
                    <td className="text-right">{(allCarbohydrates/7).toFixed(3)}</td>
                    <td className="text-right">{(allProtein/7).toFixed(3)}</td>
                    <td className="text-right">{(allFat/7).toFixed(3)}</td>
                    <td className="text-right">{(allCalorie/7).toFixed(3)}</td>
                </tr>
        )
    }, [dietList,formattedLastWeekOne,formattedLastWeekTwo,formattedLastWeekThree,formattedLastWeekFour,formattedLastWeekFive,formattedLastWeekSix,formattedLastWeekSeven])

    return (
        <div>
            <div className="text-center mb-10 font-bold text-4xl">
                주별 칼로리
            </div>
            <div className="mx-96">
                <div>시작 날짜</div>
                <input ref={date} type="date" id="date" name="date" onChange={handleChangeDate}/>
            </div>
            <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="text-center">날짜</th>
                            <th className="text-center">총 탄수화물(g)</th>
                            <th className="text-center">총 단백질(g)</th>
                            <th className="text-center">총 지방(g)</th>
                            <th className="text-center">총 칼로리(kcal)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weekTag}
                        {avgTag}
                    </tbody>
                </table>
        </div>
    )
}

export default MycalorieWeek