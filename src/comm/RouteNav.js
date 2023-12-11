import TailLink from "./TailLink";
import { CgProfile } from "react-icons/cg";
const RouteNav = () => {
    const token = sessionStorage.getItem("token")

    const authen = () => {
        alert("로그인이 필요한 서비스입니다.")
        window.location.replace("/login")
    }

    const logout = () => {
        if (window.confirm("로그아웃하시겠습니까?")) {
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("username")
            window.location.replace("/")
        } else {}
    }

    return (
        <div className="flex w-screen justify-center bg-nav">
            <div className="flex w-3/5 justify-between p-4 items-center">
                <div className="text-index" onClick={() => {window.location.replace("/")}} style={{fontFamily: "Open Sans:", fontStyle: "italic", fontWeight: "700"}}>
                    Diet Diary
                </div>
                <div className="flex justify-center w-1/3 text-xs" style={{fontFamily: "Open Sans:", fontWeight: "400"}}>
                    {sessionStorage.getItem("username") === null
                    ?<></>
                    :sessionStorage.getItem("username") + "님 환영합니다"} 
                </div>
                <nav>
                    <TailLink href="/searchfood" title="영양정보검색" />
                    {token === null 
                    ?<><TailLink title="나의식단" handleClick={authen}/>
                    <TailLink href="/login" title="로그인"/>
                    <TailLink href="/signup" title="회원가입"/></>
                    :<><TailLink href="/mycalorie" title="나의식단"/>
                    <TailLink title="로그아웃" handleClick={logout}/>
                    <TailLink href="/profile" title={<CgProfile size={30}/>}/></>}
                </nav>
            </div>
        </div>
    )
}

export default RouteNav
