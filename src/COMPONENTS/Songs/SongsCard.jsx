import React, { useContext } from "react";
// import { getSearchResult, trendingSong } from "../../API/SongApi";
import SearchResult from "../Search_Result/SearchResult";
import "./SongsCard.css";
import TrendingSong from "./Trending/TrendingSong";

const SongsCard = () => {
  
  return (
    <>
      <div className="songs_card_wrpr">
        <div className="songs_card_inner_wrpr">
          <SearchResult/>
        </div>
      </div>
    </>
  );
};

export default SongsCard;
