import { useEffect, useState, useRef } from "react"
import ButtonGray from "../comm/ButtonGray"
import { SERVER_URL } from "../comm/constants"
const Profile = () => {
    const token = sessionStorage.getItem("token")
    const [isUpdate, setIsUpdate] = useState(false)
    const [profile, setProfile] = useState()
    const [sex, setSex] = useState()
    const height = useRef()
    const weight = useRef()
    const [isMale, setIsMale] = useState(false)
    const [isFemale, setIsFemale] = useState(false)

    const handleUpdate = () => {
        setIsUpdate(true)
    }

    const handleChangeSex = (event) => {
        if(event.target.value === 'male'){
            setSex('M')
            setIsFemale(false)
            setIsMale(true)
        }
        else {
            setSex('F')
            setIsMale(false)
            setIsFemale(true)
        }
    }

    const handleChangeHeight = (event) => {
        height.current.value = event.target.value
    }

    const handleChangeWeight = (event) => {
        weight.current.value = event.target.value
    }

    const handleConfirm = () => {
        if(height.current.value !== undefined && (isNaN(height.current.value) || height.current.value === '')){
            alert('키는 숫자만 입력가능합니다.')
            return
        }
        if(weight.current.value !== undefined && (isNaN(weight.current.value) || weight.current.value === '')){
            alert('몸무게는 숫자만 입력가능합니다.')
            return
        }
        if (window.confirm("수정하시겠습니까?")) {
            fetch(SERVER_URL + 'api/private/profileupdate', {
                method: 'PUT',
                headers: { 'Content-Type':'application/json' ,
                            "Authorization" : token },
                body: JSON.stringify({
                    sex: sex,
                    height: height.current.value,
                    weight: weight.current.value,
                    username: sessionStorage.getItem("username")
                })
            })
            .then(Response => {
                return window.location.replace("/profile")
            })
            .catch(err => console.error(err))
        }
    }

    const handleCancle = () => {
        setSex(undefined)
        setIsMale(false)
        setIsFemale(false)
        setIsUpdate(false)
    }


    useEffect(() => {
        if(!token){
            window.location.replace("/login")
            return
        }
        fetch(SERVER_URL + 'api/private/profileget', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' ,
                        "Authorization" : token },
            body: sessionStorage.getItem("username")
        })
        .then(Response => Response.json())
        .then((data) => setProfile(data))
        .catch(err => console.error(err))
    }, [token])

    useEffect(() => {
        if(!isUpdate || profile === undefined || height.current === undefined || weight.current === undefined) return
        height.current.value = profile[0][1]
        weight.current.value = profile[0][2]
        if(profile[0][0] === 'M') setIsMale(true)
        else if(profile[0][0] === 'F') setIsFemale(true)
    }, [isUpdate, profile])
    
    return (
        <div className="flex w-screen h-screen justify-center">
            {!token ? <></> :
            <div className="flex w-3/5 h-full justify-center">
                <div className="w-1/2 h-2/5 mt-20 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-2xl" style={{fontFamily: "Noto Sans KR", fontWeight: "800"}}>
                            내 정보
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div className="flex">
                                <div className="w-1/2" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>
                                    성별
                                </div>
                                {isUpdate
                                ?<div>
                                    <input type="radio" name="sex" id="male" value='male' checked={isMale} onChange={handleChangeSex}/>
                                    <label style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>
                                        남
                                    </label>
                                    <input type="radio" name="sex" id="female" value='female' checked={isFemale} onChange={handleChangeSex}/>
                                    <label style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>
                                        여
                                    </label>
                                </div>
                                :<div style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>
                                    {profile === undefined
                                    ? ''
                                    : profile[0][0] === 'M'
                                    ? '남'
                                    : profile[0][0] === "F"
                                    ? '여'
                                    : ''
                                    }
                                </div>
                                }
                            </div>
                            <div className="flex">
                                <div className="w-1/2" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>
                                    키
                                </div>
                                {isUpdate
                                ? <input style={{width: "200px", height: "20px", marginBottom: "0px"}} ref={height} type="text" id="height" name="height" onChange={handleChangeHeight}/>
                                :<div style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>
                                    {profile === undefined
                                    ? ''
                                    :profile[0][1]}
                                </div>
                                }   
                            </div>
                            <div className="flex">
                                <div className="w-1/2" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>
                                    몸무게
                                </div>
                                {isUpdate
                                ? <input style={{width: "200px", height: "20px" ,marginBottom: "0px"}} ref={weight} type="text" id="weight" name="weight" onChange={handleChangeWeight}/>
                                :<div style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>
                                    {profile === undefined
                                    ? ''
                                    :profile[0][2]}
                                </div>
                                }      
                            </div>
                            {isUpdate
                            ?<div className="flex">
                                <ButtonGray caption="확인" handleClick={handleConfirm} />
                                <ButtonGray caption="취소" handleClick={handleCancle} />
                            </div>
                            :<ButtonGray caption="수정" handleClick={handleUpdate} />
                            }
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Profile
