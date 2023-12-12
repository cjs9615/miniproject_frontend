import { useEffect } from "react";
import CircleButton from "../comm/CircleButton";

const MycalorieView = () => {
    const token = sessionStorage.getItem("token")
    
    useEffect(() => {
        if(!token){
            window.location.replace("/login")
        }
    }, [token])

    return (
        <div className="flex w-screen h-screen justify-center">
            {!token ? <></> :
            <div className="flex w-3/5 h-3/4">
                <div className="flex w-1/2 justify-center items-center" style={{fontFamily: "Noto Sans KR", fontWeight: "800"}}>
                    <CircleButton name="일별 영양성분" color="#f9ebcc" background="white" handleClick={() => window.location.replace("/mycalorieday")}/>
                </div>
                <div className="flex w-1/2 justify-center items-center" style={{fontFamily: "Noto Sans KR", fontWeight: "800"}}>
                    <CircleButton name="주별 영양성분" color="#cde5f7" background="white" handleClick={() => window.location.replace("/mycalorieweek")}/>
                </div>
                {/* <div className="flex w-1/3 justify-center items-center" style={{fontFamily: "Noto Sans KR", fontWeight: "800"}}>
                    <CircleButton name="월별칼로리" color="#D2E0FB" background="white" handleClick={() => window.location.replace("/mycaloriemonth")}/>
                </div> */}
            </div>
        }
        </div>
    );
}

export default MycalorieView
