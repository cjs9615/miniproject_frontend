import { useState } from "react";
import { SERVER_URL } from "../comm/constants";
import ButtonBlue from "../comm/ButtonBlue"
const Signup = () => {
    const [member, setMember] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event) => {
        setMember({...member, [event.target.name] : event.target.value})
    }

    const checkPassword = (event) => {
        setMember({...member, [event.target.name] : event.target.value})
    }

    const checkDouble = () => {
        fetch(SERVER_URL + 'api/public/checkdouble', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: member.username
        })
        .then(Response => Response.json())
        .then((data) => console.log(data))
        .catch(err => console.error(err))
    }

    const signupSuccess = () => {
        fetch(SERVER_URL + 'api/public/signup', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(member)
        })
        .then(Response => {
            return window.location.replace("/login")
        })
        .catch(err => console.error(err))
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            회원가입
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">아이디</label>
                                <input type="username"
                                    name="username"
                                    id="username"
                                    placeholder="name@company.com"
                                    required=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    onChange={handleChange}/>
                            </div>
                            <ButtonBlue caption="중복확인" handleClick={checkDouble} />
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                                <input type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" 
                                    onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호 확인</label>
                                <input type="password"
                                    name="checkpassword"
                                    id="checkpassword"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" 
                                    onChange={checkPassword}/>
                            </div>
                            <ButtonBlue caption="가입완료" handleClick={signupSuccess} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup
