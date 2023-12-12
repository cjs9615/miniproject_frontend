import { useEffect, useState } from "react";
import { SERVER_URL } from "../comm/constants";
import ButtonGray from "../comm/ButtonGray"

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value})
    }

    const login = () => {
        
        fetch(SERVER_URL + 'login', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(user)
        })
        .then(Response => {
            const jwtToken = Response.headers.get('Authorization');
            if (jwtToken !== null) {
                sessionStorage.setItem("token", jwtToken);
                sessionStorage.setItem("username", user.username)
                setAuth(true);
            }
            else{
                alert("일치하는 회원이 없습니다.")
                return window.location.reload(true)
            }
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        if(isAuthenticated){
            return window.location.replace("/mycalorie")
        }
    }, [isAuthenticated])

    return (
        <div className="flex w-screen h-screen justify-center">
            <div className="flex w-3/5 h-full justify-center">
                <div className="w-1/2 h-1/2 mt-20 bg-white rounded-lg shadow dark:border xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-2xl" style={{fontFamily: "Noto Sans KR", fontWeight: "800"}}>
                            로그인
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>
                                    아이디
                                </label>
                                <input type="username"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{fontFamily: "Noto Sans KR", fontWeight: "400"}}>
                                    비밀번호
                                </label>
                                <input type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" 
                                    onChange={handleChange}/>
                            </div>
                            <ButtonGray caption="로그인" handleClick={login} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login
