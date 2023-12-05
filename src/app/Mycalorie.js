
const Mycalorie = () => {
    const handleClickInsert = () => {
        window.location.replace("/mycalorieinsert")
    }

    return (
        <div className="flex h-screen bg-slate-200">
            <div className="flex w-1/2 justify-center items-center" onClick={handleClickInsert}>
                <div className="w-80 h-80 rounded-full bg-white border-4 border-orange-200 align-middle text-center text-4xl">
                    내 식단 입력
                </div>
            </div>
            <div className="w-1/2text-center" >
                내가 섭취한 칼로리
            </div>
        </div>
    ); 
}

export default Mycalorie
