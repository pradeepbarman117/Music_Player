import React, { createContext, useContext, useEffect, useState } from "react";
import { getSearchValue } from "../COMPONENTS/Header/Header";
import SongsCard from "../COMPONENTS/Songs/SongsCard";

const trendingSong = createContext(); // this is for trending song
const getSearchResult = createContext();

const SongApi = () => {
  const [getSong, setGetSong] = useState();
  const [getQuery, setQuery] = useState();
  let inputVal = useContext(getSearchValue);
  useEffect(() => {
    const url = `https://saavn.me/search/songs?query=${inputVal}&page=5000000000000&limit=100000000`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setQuery(res));
  }, [inputVal]);
  return (
    <>
      <trendingSong.Provider value={{ ...getSong }}>
        <getSearchResult.Provider value={{ ...getQuery }}>
          <SongsCard />
        </getSearchResult.Provider>
      </trendingSong.Provider>
    </>
  );
};

export default SongApi;
export { trendingSong, getSearchResult };
