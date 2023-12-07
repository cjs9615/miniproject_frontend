import { useEffect, useState, useRef } from "react";
import { SERVER_URL } from "../comm/constants";
import ButtonBlue from "../comm/ButtonGreen"
import ModalSearch from "./ModalSearch";
import ModalUpdate from "./ModalUpdate";

const MycalorieInsert = () => {
    const today = new Date();
    const todayMonth = today.getMonth() + 1 < 10 ? '0' + today.getMonth() + 1 : today.getMonth() + 1 
    const todayDate = today.getDate() < 10 ? '0' + today.getDate() : today.getDate
    const formattedDate = `${today.getFullYear()}-${todayMonth}-${todayDate}`
    const date = useRef()
    const [dietList, setDietList] = useState([]);
    const [dietTag, setDietTag] = useState(<></>)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
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
    const [insertFood, setInsertFood] = useState()
    const [updateFood, setUpdateFood] = useState()

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
        .then((data) => setDietList(data))
        .catch(err => console.error(err))
        setMemberFood({...memberFood, [event.target.name] : event.target.value})
    }

    const handleChangeTime = (event) => {
        setMemberFood({...memberFood, [event.target.name] : event.target.value})
    }

    const handleClickName = () => {
        setIsSearchOpen(true)
    }

    const handleChangeGram = (event) => {
        setMemberFood({...memberFood, [event.target.name] : event.target.value})
    }

    const foodInsert = () => {
        let isDuplicate = false
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
        dietList.map((item) => {if(time.current.value === item[3] && foodName.current.value === item[1].name){
                isDuplicate = true
            }
            return item
        })
        if(isDuplicate) {
            alert('같은 시간 같은 음식은 추가할 수 없습니다.')
            return
        }
        fetch(SERVER_URL + 'api/private/memberfoodinsert', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(memberFood)
        })
        .then(Response => {
            let tempList = dietList.map((item) => item)
            const temp = [time.current.value+insertFood.name,insertFood,gram.current.value,time.current.value,'']
            tempList.push(temp)
            setDietList(tempList)
        })
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
        .then((data) => setDietList(data))
        .catch(err => console.error(err))
    }, [formattedDate])

    useEffect(() => {
        const temp = dietList
        .sort((a, b) => parseInt(a[3].split(':')[0]) - parseInt(b[3].split(':')[0]) === 0 ? parseInt(a[3].split(':')[1]) - parseInt(b[3].split(':')[1]) : parseInt(a[3].split(':')[0]) - parseInt(b[3].split(':')[0]))
        .map((item) => 
            <tr className="hover:bg-gray-400" key={item[0]} onClick={() => {setIsUpdateOpen(true)
                                                                              setUpdateFood(item)}}>
                <td className="text-center">{item[3]}</td>
                <td>{item[1].name}</td>
                <td className="text-right">{item[2]}</td>
            </tr>
        )
        setDietTag(temp)
    }, [dietList])

    return (
        <div className="flex w-screen h-screen justify-center">
            <div className="w-3/5 h-full">
                <div className="h-1/4">
                    <div className='mt-5 mb-3 pb-2 border-b-2 border-b-black text-2xl' style={{fontFamily: "Noto Sans KR"}}>
                        내 식단 입력
                    </div>
                    <div className="border-2 border-gray-200 rounded-xl">
                        <div className="flex ml-2 mt-3 items-center">
                            <div className="w-1/6">
                                <input ref={date} type="date" id="date" name="date" onChange={handleChangeDate}/>
                            </div>
                        </div>
                        <div className="flex ml-2 items-center">
                            <div className="flex w-1/5">
                                <div>
                                    <input ref={time} type="time" id="time" name="time" onChange={handleChangeTime}/>
                                </div>
                            </div>
                            <div className="flex w-3/12 mr-2">
                                <div className="flex mb-3 w-1/3 items-center justify-center">음식</div>
                                <div className="w-2/3">
                                    <input ref={foodName} type="text" id="name" name="name" placeholder="클릭하세요" readOnly onClick={handleClickName}/>
                                    <ModalSearch isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} foodName={foodName} memberFood={memberFood} setMemberFood={setMemberFood} setInsertFood={setInsertFood}/>
                                </div>
                            </div>
                            <div className="flex w-3/12 mr-2">
                                <div className="flex mb-3 w-1/3 items-center justify-center">그램</div>
                                <div className="w-2/3">
                                    <input ref={gram} type="text" id="gram" name="gram" onChange={handleChangeGram}/>
                                </div>
                            </div>
                            <div className="flex w-1/12">
                                <ButtonBlue caption='추가' handleClick={foodInsert}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th className="text-center">시간</th>
                                <th className="w-1/2 text-center">음식이름</th>
                                <th className="text-center">그램수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dietTag}
                        </tbody>
                    </table>
                    {date.current === undefined ? <></> : <ModalUpdate isOpen={isUpdateOpen} setIsOpen={setIsUpdateOpen} date={date} updateFood={updateFood} dietList={dietList} setDietList={setDietList}/>}
                </div>
            </div>
        </div>
    ); 
}

export default MycalorieInsert
