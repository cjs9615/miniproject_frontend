import { useState } from "react";
import { SERVER_URL } from "../comm/constants";
import ButtonBlue from "../comm/ButtonBlue"
const Mycalorie = () => {
    //const [dateTime, setDateTime] = useState(',');
    const [myfood, setMyfood] = useState({
        dateTime: ','
    })

    const handleChangeDate = (event) => {
        setMyfood({dateTime : event.target.value + ',' + myfood.dateTime.split(',')[1]})
    }

    const handleChangeTime = (event) => {
        setMyfood({dateTime : myfood.dateTime.split(',')[0] + ',' + event.target.value})
    }

    const save = () => {
        console.log(myfood)
        fetch(SERVER_URL + 'api/private/save', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(myfood)
        })
        .then(Response => Response.json())
        .then((data) => console.log(data))
        .catch(err => console.error(err))
    }


    return (
        <div>
            <div>
                <input type="date" id="date" name="date" onChange={handleChangeDate}/>
            </div>
            <div>
                <input type="time" id="time" name="time" onChange={handleChangeTime}/>
            </div>
            <div>
                <ButtonBlue caption='저장' handleClick={save}/>
            </div>
        </div>
    ); 
}

export default Mycalorie
