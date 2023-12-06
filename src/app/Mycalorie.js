import CircleButton from "../comm/CircleButton"

const Mycalorie = () => {
    const handleClickInsert = () => {
        window.location.replace("/mycalorieinsert")
    }
    const handleClickView = () => {
        window.location.replace("/mycalorieview")
    }

    return (
        // <div className="flex h-screen bg-slate-200">
        //     <div className="flex w-1/2 justify-center items-center" onClick={handleClickInsert}>
        //         <div className="flex w-80 h-80 rounded-full bg-white border-4 border-orange-200 justify-center items-center font-bold text-4xl">
        //             내 식단 입력
        //         </div>
        //     </div>
        //     <div className="flex w-1/2 justify-center items-center" onClick={handleClickView}>
        //         <div className="flex w-80 h-80 rounded-full bg-white border-4 border-blue-200 justify-center items-center font-bold text-4xl">
        //             내가 섭취한 칼로리
        //         </div>
        //     </div>
        // </div>
        <div className="flex py-20 space-x-20 justify-center ">
            <div onClick={handleClickInsert}>
                <CircleButton name="내 식단 입력" color="#AEC3AE" background="white" onClick={handleClickInsert}/>
            </div>
            <div onClick={handleClickView}>
                <CircleButton name="내가 섭취한 칼로리(일별/주별/월별)" color="#EEC759" background="white" onClick={handleClickView}/>
            </div>
        </div>
    ); 
}

export default Mycalorie
