import TailFooter from "../comm/TailFooter"
import FoodList from "./FoodList"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import RouteNav from "../comm/RouteNav"
import Login from "./Login"
import Mycalorie from "./Mycalorie"
import Signup from "./Signup"
import Profile from "./Profile"
import MycalorieInsert from "./MycalorieInsert"
import MycalorieView from "./MycalorieView"
import MycalorieWeek from "./MycalorieWeek"

const Main = () => {
    return (
        <BrowserRouter>
            <div className="flex flex-col w-full mx-auto h-screen">
                <RouteNav/>
                <div className='grow flex flex-col'>
                    <Routes>
                        <Route path="/" element={<FoodList/>}/>
                        <Route path="/mycalorie" element={<Mycalorie/>}/>
                        <Route path="/mycalorieinsert" element={<MycalorieInsert/>}/>
                        <Route path="/mycalorieview" element={<MycalorieView/>}/>
                        <Route path="/mycalorieweek" element={<MycalorieWeek/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                    </Routes>
                </div>
                <TailFooter />
            </div>
        </BrowserRouter>
    )
}

export default Main
