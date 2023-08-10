"use client";
import Login from '../login';

const Header = () => {
    return (
      <div className="flex flex-row text-right bg-white font-mono text-gray-500 border-b border-gray-400 absolute top-0 w-full">
        <div className='basis-1/2 text-left'>
          <h1 className="text-4xl font-bold pl-16 py-1">MyFoodList</h1>
        </div>
        <div className='basis-1/2 text-right pr-8'>
          <Login  />
        </div>
            
      </div>
    )
  }
  
  export default Header