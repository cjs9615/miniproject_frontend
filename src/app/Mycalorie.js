import { useEffect, useState, useRef } from "react";
import { SERVER_URL } from "../comm/constants";
import ButtonBlue from "../comm/ButtonBlue"
import Modal from "../comm/Modal";

const Mycalorie = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    const date = useRef()
    const [dietList, setdietList] = useState([]);
    const [dietTag, setdietTag] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const foodName = useRef()
    const time = useRef()
    const gram = useRef()
    const [memberFood, setMemberFood] = useState({
        date: formattedDate,
        time: '',
        foodId: '',
        gram: '',
        memberUsername: sessionStorage.getItem('username')
    })

    const handleChangeDate = (event) => {
        time.current.value = ''
        foodName.current.value = ''
        gram.current.value = ''
        fetch(SERVER_URL + 'api/private/memberfoodget', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: event.target.value + "," + memberFood.memberUsername
        })
        .then(Response => Response.json())
        .then((data) => setdietList(data))
        .catch(err => console.error(err))
        setMemberFood({...memberFood, [event.target.name] : event.target.value})
    }

    const handleChangeTime = (event) => {
        setMemberFood({...memberFood, [event.target.name] : event.target.value})
    }

    const handleClickName = () => {
        setIsOpen(true)
    }

    const handleChangeGram = (event) => {
        setMemberFood({...memberFood, [event.target.name] : event.target.value})
    }

    const foodInsert = () => {
        if(time.current.value === undefined || time.current.value === ''){
            alert('시간을 입력하세요')
            return
        }
        if(foodName.current.value === undefined || foodName.current.value === ''){
            alert('음식이름을 입력하세요')
            return
        }
        if(isNaN(gram.current.value) || gram.current.value === ''){
            alert('그램에 숫자를 입력하세요')
            return
        }
        fetch(SERVER_URL + 'api/private/memberfoodinsert', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(memberFood)
        })
        .then(Response => setdietTag(
        //     dietTag + <tr key={time.current.value + foodName.current.value}>
        //     <td>{time.current.value}</td>
        //     <td>{foodName.current.value}</td>
        //     <td>{gram.current.value}</td>
        // </tr>
        <></>
            ))
        .catch(err => console.error(err))
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
            body: formattedDate + "," + sessionStorage.getItem("username")
        })
        .then(Response => Response.json())
        .then((data) => setdietList(data))
        .catch(err => console.error(err))
    }, [formattedDate])

    useEffect(() => {
        const temp = dietList
        .sort((a, b) => parseInt(a[3]) - parseInt(b[3]))
        .map((item) => 
            <tr key={item[0]}>
                <td>{item[3]}</td>
                <td>{item[1].name}</td>
                <td>{item[2]}</td>
            </tr>
        )
        setdietTag(temp)
    }, [dietList])

    return (
        <div>
            <div className="text-5xl mx-96 mb-3">내 식단 입력</div>
            <div className="mx-96">
                <div>날짜 입력</div>
                <input ref={date} type="date" id="date" name="date" onChange={handleChangeDate}/>
            </div>
            <div className="flex justify-center">
                <div className="flex m-5">
                    <div>시간 입력</div>
                    <input ref={time} type="time" id="time" name="time" onChange={handleChangeTime}/>
                </div>
                <div className="flex m-5">
                    <div>음식 이름</div>
                    <input ref={foodName} type="text" id="name" name="name" placeholder="클릭하세요" readOnly onClick={handleClickName}/>
                    <Modal isOpen={isOpen} setIsOpen={setIsOpen} foodName={foodName} memberFood={memberFood} setMemberFood={setMemberFood}/>
                </div>
                <div className="flex m-5">
                    <div>그램수</div>
                    <input ref={gram} type="text" id="gram" name="gram" onChange={handleChangeGram}/>
                </div>
                <div className="flex m-5">
                    <ButtonBlue caption='추가' handleClick={foodInsert}/>
                </div>
            </div>
            <div className="mx-40 my-10">
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>시간</th>
                            <th>음식이름</th>
                            <th>그램수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dietTag}
                    </tbody>
                </table>
            </div>
            <div className="mx-96">
                <ButtonBlue caption='저장' handleClick={save}/>
            </div>
        </div>
    ); 
}

export default Mycalorie
