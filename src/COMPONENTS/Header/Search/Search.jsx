import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './Search.css'
const Search = (props) => {
    const [isActive,setIsActive] = useState(false)
    const focusInput = e =>{
       setIsActive(true)
    }

  return (
    <>
        <div className='header_search_bar'> 
            <div className={isActive ? 'header_search_box active' :'header_search_box'} onClick={focusInput} >
                <input type="text" placeholder='Search.....'  className='header_search_field' onChange={(e)=>props.getInputVal(e.target.value)}  />
                <button className="header_search_btn" onClick={()=>props.clickBtn()}   ><SearchIcon/></button>
            </div>
        </div>
    </>
  )
}

export default Search