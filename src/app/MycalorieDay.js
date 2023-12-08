// import { SERVER_URL } from "../comm/constants";

import { useRef } from "react"

const MycalorieDay = () => {
    const date = useRef()

    const handleChangeDate = (event) => {
    }

    return (
        <div className="flex w-screen h-screen justify-center">
            <div className="w-3/5 h-full">
                <div className='mt-5 mb-3 pb-2 border-b-2 border-b-black text-2xl' style={{fontFamily: "Noto Sans KR", fontWeight: "800"}}>
                    날짜 영양 정보
                </div>
                <div className="flex">
                    <div className="flex mb-4 ml-5 mr-3 justify-end items-center">날짜 :</div>
                    <div className="w-3//6">
                        <input ref={date} type="date" id="date" name="date" onChange={handleChangeDate} />
                    </div>
                </div>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>시간</th>
                            <th>음식이름</th>
                            <th>그램수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {dietTag} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MycalorieDay
