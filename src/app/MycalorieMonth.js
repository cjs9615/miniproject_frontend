import { useEffect, useRef } from "react"

const MycalorieMonth = () => {
    const token = sessionStorage.getItem("token")
    // const today = new Date();
    // const todayMonth = today.getMonth() + 1 < 10 ? '0' + today.getMonth() + 1 : today.getMonth() + 1 

    const month = useRef()

    const handleChangeMonth = () => {

    }

    useEffect(() => {
        if(!token){
            window.location.replace("/login")
        }
    }, [token])

    return (
        <div className="flex w-screen h-screen justify-center">
            {!token ? <></> :
            <div className="w-3/5 h-full">
                <div className='mt-5 mb-3 pb-2 border-b-2 border-b-black text-2xl' style={{fontFamily: "Noto Sans KR", fontWeight: "800"}}>
                    영양 정보
                </div>
                <div className="flex">
                    <div className="flex mb-4 ml-5 mr-3 justify-end items-center">시작 달 :</div>
                    <div className="w-3//6">
                        <input ref={month} type="month" id="month" name="month" onChange={handleChangeMonth} />
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default MycalorieMonth
