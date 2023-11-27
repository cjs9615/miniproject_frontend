import { useEffect, useState, useRef } from "react";
import { SERVER_URL } from "../comm/constants";
import ButtonBlue from "../comm/ButtonBlue"
const Mycalorie = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    const date = useRef()
    const [foodtable, setFoodtable] = useState(<></>);

    const handleChangeDate = (event) => {
        console.log(event.target.value)
        fetch(SERVER_URL + 'api/private/memberfoodget', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: event.target.value
        })
        .then(Response => Response.json())
        .then((data) => console.log(data))
        .catch(err => console.error(err))
    }

    const handleChangeTime = (event) => {
        console.log(event.target.value)
    }

    const handleChangeName = (event) => {
    }

    const handleChangeGram = (event) => {
    }


    const save = () => {
        fetch(SERVER_URL + 'api/private/save', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify()
        })
        .then(Response => Response.json())
        .then((data) => console.log(data))
        .catch(err => console.error(err))
    }

    useEffect(() => {
        date.current.value = formattedDate
        fetch(SERVER_URL + 'api/private/memberfoodget', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: formattedDate
        })
        .then(Response => Response.json())
        .then((data) => console.log(data))
        .catch(err => console.error(err))
    }, [formattedDate])

    return (
        <div>
            <div className="text-5xl mx-96 mb-3">내 식단 입력</div>
            <div className="mx-96">
                <div>날짜 입력</div>
                <input ref={date} type="date" id="date" name="date" onChange={handleChangeDate}/>
            </div>
            <div className="flex">
                <div className="flex m-5">
                    <div>시간 입력</div>
                    <input type="time" id="time" name="time" onChange={handleChangeTime}/>
                </div>
                <div className="flex m-5">
                    <div>음식 이름</div>
                    <input type="text" id="name" name="name" onChange={handleChangeName}/>
                </div>
                <div className="flex m-5">
                    <div>그램수</div>
                    <input type="text" id="gram" name="gram" onChange={handleChangeGram}/>
                </div>
                <div className="flex m-5">
                    <ButtonBlue caption='추가' handleClick={save}/>
                </div>
            </div>
            {foodtable}
            <div className="mx-96">
                <ButtonBlue caption='저장' handleClick={save}/>
            </div>
        </div>
    ); 
}

export default Mycalorie
