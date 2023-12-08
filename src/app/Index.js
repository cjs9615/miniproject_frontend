import React from 'react'
//import vegetable from '../img/vegetable.jpg'
import salad from '../img/salad1.png'

// const StyledComponentWithBackground = styled.div`
//   background-image: url(${vegetable});
//   width: 200px;
//   height: 1000px;
//   display: flex;
// `;



const Index = () => {
    return (
        <div className='w-screen h-screen'>
            <div className='flex flex-col h-1/2 items-center bg-nav'>
                <div className='flex flex-col w-3/5'>
                    <div className='flex text-green-900 justify-center text-4xl' style={{fontFamily: "Open Sans"}}>
                        Diet Diary
                    </div>
                    <img className='w-60 h-60' src={salad} alt='vegetable'/>
                    
                </div>
            </div>
            <div className='h-1/2 bg-main'>           
            </div>
        </div>
    )
}

export default Index
