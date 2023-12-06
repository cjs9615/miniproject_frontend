import CircleButton from "../comm/CircleButton";



const MycalorieView = () => {
    return (
        <div className="flex py-20 space-x-20 justify-center ">
            <CircleButton name="일별칼로리" color="#D7E5CA" background="white"/>
            <CircleButton name="주별칼로리" color="#F9F3CC" background="white" handleClick={() => window.location.replace("/mycalorieweek")}/>
            <CircleButton name="월별칼로리" color="#D2E0FB" background="white"/>
        </div>
    );
}

export default MycalorieView
