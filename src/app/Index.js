import React from 'react'
//import vegetable from '../img/vegetable.jpg'

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
                {/* <img className='w-96 h-96' src={vegetable} alt='vegetable'/> */}
                <div className='text-green-900 text-4xl' style={{fontFamily: "Noto Sans KR"}}>
                    식단 저장소
                </div>
            </div>
            <div className='h-1/2 bg-main'>           
            </div>
        </div>
    )
}

export default Index
