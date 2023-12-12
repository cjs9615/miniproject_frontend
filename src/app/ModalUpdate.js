import ReactModal from "react-modal"
import { SERVER_URL } from "../comm/constants"
import { useState,useEffect, useRef } from "react"
import ButtonGray from "../comm/ButtonGray"
const ModalUpdate = ({isOpen, setIsOpen, date, updateFood, dietList, setDietList}) => {
    const token = sessionStorage.getItem("token")
    const [memberFood, setMemberFood] = useState({
        date: '',
        time: '',
        foodId: '',
        gram: '',
        comment: '',
        memberUsername: ''
    })
    const [isUpdate, setIsUpdate] = useState(false)
    const gram = useRef()
    const comment = useRef()
    const [foodGram,setFoodGram] = useState()
    const [foodComment,setFoodComment] = useState()

    const handleDelete = () => {
        if (window.confirm("삭제하시겠습니까?")) {
            fetch(SERVER_URL + 'api/private/memberfooddelete', {
                method: 'DELETE',
                headers: { 'Content-Type':'application/json' ,
                            "Authorization" : token },
                body: JSON.stringify(memberFood)
            })
            .then(Response => {
                let temp = dietList.map((item) => item)
                temp = temp.filter((item) => item[1].id !== memberFood.foodId || item[3] !== memberFood.time)
                setDietList(temp)
                setIsOpen(false)
            })
            .catch(err => console.error(err))

        } else {}
    }

    const handleUpdate = () => {
        setIsUpdate(true)
    }

    const handleConfirm = () => {
        if((foodGram === undefined && foodComment === undefined) || (foodGram === memberFood['gram'] && foodComment === memberFood['comment']) || (foodGram === memberFood['gram'] && foodComment === undefined) || (foodGram === undefined && foodComment === memberFood['comment'])) {
            alert('수정한 내용이 없습니다.')
            return
        }
        if(foodGram !== undefined && (isNaN(foodGram) || foodGram === '')){
            alert('무게는 숫자만 입력이 가능합니다.')
            return
        }
        if (window.confirm("수정하시겠습니까?")) {
            fetch(SERVER_URL + 'api/private/memberfoodupdate', {
                method: 'PUT',
                headers: { 'Content-Type':'application/json' ,
                            "Authorization" : token },
                body: JSON.stringify({
                    date: memberFood['date'],
                    time: memberFood['time'],
                    foodId: memberFood['foodId'],
                    gram: foodGram === undefined ? null : foodGram,
                    comment: foodComment === undefined ? null : foodComment,
                    memberUsername: memberFood['memberUsername']
                })
            })
            .then(Response => {
                let temp = dietList.map((item) => item)  
                if(foodGram !== undefined && foodComment !== undefined){
                    gram.current.value = foodGram
                    comment.current.value = foodComment
                    setMemberFood({...memberFood, 'gram' : foodGram, 'comment' : foodComment})
                    temp = temp.map((item) => {
                        if(item[1].id === memberFood.foodId && item[3] === memberFood.time) {
                            item[2] = foodGram
                            item[4] = foodComment
                            return item
                        }
                        else return item
                    })
                }
                else if(foodGram !== undefined){
                    gram.current.value = foodGram
                    setMemberFood({...memberFood, 'gram' : foodGram})
                    temp = temp.map((item) => {
                        if(item[1].id === memberFood.foodId && item[3] === memberFood.time) {
                            item[2] = foodGram
                            return item
                        }
                        else return item
                    })
                }
                else{
                    comment.current.value = foodComment
                    setMemberFood({...memberFood, 'comment' : foodComment})
                    temp = temp.map((item) => {
                        if(item[1].id === memberFood.foodId && item[3] === memberFood.time) {
                            item[4] = foodComment
                            return item
                        }
                        else return item
                    })
                }
                setDietList(temp)
                setIsUpdate(false)
            })
            .catch(err => console.error(err))

        } else {}
    }

    const handleCancle = () => {
        comment.current.value = updateFood[4]
        setIsUpdate(false)
    }

    const handleChangeGram = (event) => {
        setFoodGram(event.target.value)
    }

    const handleChangeComment = (event) => {
        setFoodComment(event.target.value)
    }

    useEffect(() => {
        if(updateFood === undefined) return
        setMemberFood({'date' : date.current.value , 'time' : updateFood[3] , 'foodId' : updateFood[1].id, 'gram' : updateFood[2], 'comment' : updateFood[4], 'memberUsername' : sessionStorage.getItem('username')})
    }, [isOpen, updateFood, date])

    useEffect(() => {
        if(!isUpdate) {
            setFoodComment(undefined)
            setFoodGram(undefined)
            return
        }
        gram.current.value = memberFood['gram']
        comment.current.value = memberFood['comment']
    }, [isUpdate, memberFood])

    if (updateFood === undefined) return <></>
    else{
        return (
            <ReactModal style={{content: {top: "10%", bottom: "10%", left: "20%", right: "20%"}}} isOpen={isOpen} onRequestClose={() => {setIsOpen(false)
                                                               setIsUpdate(false)}}>
                <div className="flex w-full h-full justify-center">
                    <div className="w-full h-full">
                        <div className="flex mt-3 h-7">
                            <div className="mr-2">
                                음식 : 
                            </div>
                            <div>
                                {updateFood[1].name}
                            </div>
                        </div>
                        <div className="flex h-7">
                            <div className="mr-2">
                                시간 :
                            </div>
                            <div>
                                {updateFood[3]}
                            </div>
                        </div>
                        <div className="flex h-7">
                            <div className="mr-2">
                                무게(g) : 
                            </div>
                            <div>
                                {isUpdate ? <input style={{width: "200px", height: "20px"}} ref={gram} type="text" id="gram" name="gram" onChange={handleChangeGram}/> : updateFood[2]}
                            </div>
                        </div>
                        <div>
                            <div>
                                comment
                            </div>
                            <div>
                                {isUpdate
                                ?<textarea ref={comment} id="comment" name="comment" onChange={handleChangeComment} rows="5" cols="33">
                                </textarea>
                                :<textarea id="commentReadOnly" name="commentReadOnly" rows="5" cols="33" readOnly={true} defaultValue={updateFood[4]}/>
                                }
                            </div>
                        </div>
                        <div className="mt-4">
                            <table className="table-fixed">
                                <thead>
                                    <tr>
                                        <th className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>탄수화물(g)</th>
                                        <th className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>단백질(g)</th>
                                        <th className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>지방(g)</th>
                                        <th className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>열량(kcal)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={updateFood[1].id}>
                                        <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{(updateFood[1].carbohydrates * (updateFood[2] / 100)).toFixed(3)}</td>
                                        <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{(updateFood[1].protein * (updateFood[2] / 100)).toFixed(3)}</td>
                                        <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{(updateFood[1].fat * (updateFood[2] / 100)).toFixed(3)}</td>
                                        <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{(updateFood[1].calorie * (updateFood[2] / 100)).toFixed(3)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <table className="table-fixed">
                                <thead>
                                    <tr>
                                        <th className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>당류(g)</th>
                                        <th className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>나트륨(mg)</th>
                                        <th className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>콜레스테롤(mg)</th>
                                        <th className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>포화지방산(g)</th>
                                        <th className="text-center text-sm" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>트랜스지방산(g)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={updateFood[1].id}>
                                        <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{(updateFood[1].sugar * (updateFood[2] / 100)).toFixed(3)}</td>
                                        <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{(updateFood[1].sodium * (updateFood[2] / 100)).toFixed(3)}</td>
                                        <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{(updateFood[1].cholesterol * (updateFood[2] / 100)).toFixed(3)}</td>
                                        <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{(updateFood[1].saturatedfattyacids * (updateFood[2] / 100)).toFixed(3)}</td>
                                        <td className="text-right text-xs" style={{ fontFamily: "Noto Sans KR", fontWeight: "400" }}>{(updateFood[1].transfattyacids * (updateFood[2] / 100)).toFixed(3)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex mt-16 mx-10">
                            {isUpdate
                                ? <><ButtonGray caption='확인' handleClick={handleConfirm}/>
                                    <ButtonGray caption='취소' handleClick={handleCancle}/></>
                                : <><ButtonGray caption='수정' handleClick={handleUpdate}/>
                                    <ButtonGray caption='삭제' handleClick={handleDelete}/>
                                    <ButtonGray caption='닫기' handleClick={() => { setIsOpen(false) }}/>
                                </>}
                        </div>
                    </div>
                </div>
            </ReactModal>
        )
    }
}

export default ModalUpdate
