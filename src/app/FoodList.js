import { useEffect, useState } from "react";
import { SERVER_URL } from "../comm/constants";
import ButtonBlue from "../comm/ButtonBlue"
const FoodList = () => {
    const [food, setFood] = useState([]);
    const [foodTag, setFoodTag] = useState();
    const [keyword, setKeyword] = useState('');
    const [footerTag, setFooterTag] = useState(); 

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
        console.log(food.length)
        const temp = food
        .filter((item, i) => i < 10)
        .map((item) => 
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.carbohydrates}</td>
                <td>{item.protein}</td>
                <td>{item.fat}</td>
                <td>{item.sugar}</td>
                <td>{item.sodium}</td>
                <td>{item.cholesterol}</td>
                <td>{item.saturatedfattyacids}</td>
                <td>{item.transfattyacids}</td>
                <td>{item.calorie}</td>
            </tr>
        )
        setFoodTag(temp)

        setFooterTag(
            
        )
    }, [food])

    useEffect(() => {
        setFoodTag(
            <tr>
                <td>쌀밥</td>
                <td>00</td>
                <td>00</td>
                <td>00</td>
                <td>00</td>
                <td>00</td>
                <td>00</td>
                <td>00</td>
                <td>00</td>
                <td>00</td>
            </tr>
        )
    }, [])

    return (
        <div>
            <div className="mx-96">
                <input type="text"
                    name="keyword"
                    id="keyword"
                    onChange={handleChange}
                />
                <ButtonBlue caption="검색" handleClick={search}/>
            </div>
            <div className="mx-10 my-5">
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>음식</th>
                            <th>탄수화물(g)</th>
                            <th>단백질(g)</th>
                            <th>지방(g)</th>
                            <th>당류(g)</th>
                            <th>나트륨(mg)</th>
                            <th>콜레스테롤(mg)</th>
                            <th>포화지방산(g)</th>
                            <th>트랜스지방산(g)</th>
                            <th>열량(kcal)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodTag}
                    </tbody>
                </table>
                <div className="text-center">
                    {footerTag}
                </div>
            </div>
        </div>
    );
}

export default FoodList
