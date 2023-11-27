import TailLink from "./TailLink";
const RouteNav = () => {
    const jwt = sessionStorage.getItem("jwt")

    const authen = () => {
        alert("로그인하세요")
        window.location.replace("/login")
    }

    const logout = () => {
        if (window.confirm("로그아웃하시겠습니까?")) {
            sessionStorage.removeItem("jwt")
            sessionStorage.removeItem("username")
            window.location.replace("/")
        } else {
        }
    }

    return (
        <div className="flex max-w-screen-xl justify-between item-center p-4">
            <div>
                Diet
            </div>
            <nav>
                <TailLink href="/" title="음식칼로리" />
                {jwt === null 
                ?<><TailLink title="나의칼로리" handleClick={authen}/>
                <TailLink href="/login" title="로그인"/>
                <TailLink href="/signup" title="회원가입"/></>
                :<><TailLink href="/mycalorie" title="나의칼로리"/>
                <TailLink title="로그아웃" handleClick={logout}/>
                <TailLink href="/profile" title="프로필"/></>}
            </nav>
        </div>
    )
}

export default RouteNav
