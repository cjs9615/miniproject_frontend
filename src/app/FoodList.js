import { useEffect, useState } from "react";
import { SERVER_URL } from "../comm/constants";
import ButtonBlue from "../comm/ButtonBlue"
const FoodList = () => {
    const [food, setFood] = useState([]);
    const [foodTag, setFoodTag] = useState();
    const [keyword, setKeyword] = useState('');

    const handleChange = (event) => {
        setKeyword(event.target.value)
    }

    const search = () => {
        if(keyword === ''){
            return
        }
        fetch(SERVER_URL + 'api/public/search', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: keyword
        })
        .then(Response => Response.json())
        .then(data => setFood(data))
        .catch(err => console.error(err))
    }

    useEffect(() => {
        const temp = food
        .map((item) => 
            <div key={item.id}>{item.name}</div>
        )
        console.log(temp)
        setFoodTag(temp) 
    }, [food])
    return (
        <div>
            <input type="text"
                   name="keyword"
                   id="keyword"
                   onChange={handleChange}
            />
            <ButtonBlue caption="검색" handleClick={search}/>
            <div>
                {foodTag}
            </div>
        </div>
    );
}

export default FoodList
