import { useEffect } from "react"
import ButtonBlue from "../comm/ButtonGreen"

const Profile = () => {
    const token = sessionStorage.getItem("token")

    useEffect(() => {
        if(!token){
            window.location.replace("/login")
        }
    }, [token])
    
    return (
        <div className="flex w-screen h-screen justify-center">
            {!token ? <></> :
            <div className="w-3/5 h-full">
                <div className="flex w-32 h-10 mt-12 mb-10 border-4 border-slate-950 justify-center items-center font-bold">
                    내정보
                </div>
                <div className="flex flex-col w-1/2 h-1/2 border-4 border-slate-950 justify-center items-center">
                    <div>
                        성별
                    </div>
                    <div>
                        키
                    </div>
                    <div>
                        몸무게
                    </div>
                </div>
                <div className="w-20 mt-5">
                    <ButtonBlue caption='수정'/>
                </div>
            </div>
            }
        </div>
    )
}

export default Profile
