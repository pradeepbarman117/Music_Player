import React, { createContext, useState } from "react";
import Logo from "./Logo/Logo";
import "./Header.css";
import Search from "./Search/Search";
import LoginSide from "./Login/LoginSide";
import SongApi from "../../API/SongApi";
import Sidebar from "../Sidebar/Sidebar";

const getSearchValue = createContext();

const Header = () => {
  // let getRandomSong = 1;
  // const randomSong = ['saans','jee le zara','kumar sanu','shreya ghosal','arjit singh']
  const [searchVal,setSearchVal] = useState('kumar sanu')
  const [getSearchVal,setGetSearchVal] = useState()
  // get search value
  const seachValue = (val) => {
    setGetSearchVal(val)
  };
  // send search value when button is clicked
  const searchValBtn = ()=>{
    if(getSearchVal){
      setSearchVal(getSearchVal)
    }
  }

  return (
    <>
      <div className="header_wrpr">
        <div className="header_inner_wrpr">
          <Logo />
          <Search getInputVal={seachValue} clickBtn={searchValBtn} />
          <LoginSide />
        </div>
      </div>
      <Sidebar />
      <getSearchValue.Provider value={searchVal} >
        <SongApi />
      </getSearchValue.Provider>
    </>
  );
};

export default Header;
export {getSearchValue}
