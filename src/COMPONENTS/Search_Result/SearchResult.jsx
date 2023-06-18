import React, { createContext, useContext, useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./searchResult.css";
import { getSearchResult } from "../../API/SongApi";
import PlayerTrack from "../Player_Track/PlayerTrack";
import PauseIcon from "@mui/icons-material/Pause";

const curSongUrl = createContext();

const SearchResult = () => {
  const [getData, setData] = useState([]);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const { data } = useContext(getSearchResult);
  const isUndefined = data?.results[0]?.name;
  const [isActiveSong, setIsActiveSong] = useState(false);
  const [changeSongUrl, setChangeSongUrl] = useState();
  

  
  const getSongData = (url, title, image, artistName, curSong, songList) => {
    let nextPrevSong = [];
    const getSongList = songList.map((items, index) => {
      if (items === curSong) {
        const nextSong = {
          link: data.results[index].downloadUrl[4].link,
          name: data.results[index].name,
          image: data.results[index].image[2],
          artist: data.results[index ].primaryArtists,
        };
        nextPrevSong.push(nextSong);
      }
    });
    // console.log(getSongList)

    // const restOfSong =  songList.filter((song,index)=> {
    //   if(song !== curSong){
        
    //   }
    // })
    // console.log(restOfSong)
    setData([url, title, image, artistName, nextPrevSong]);
    setIsAutoPlay(true);
  };

  return (
    <>
      <h2 className="songs_card_heading_txt">Did you get your query ?</h2>
      <div className="songs_card_box">
        {data?.results.map((items, index) => {
          // console.log(items)
          if (isUndefined !== "Undefined") {
            return (
              <>
                <div className="songs_card_list_wrpr">
                  <div className="songs_card_list_box">
                    <div
                      className={`songs_card_list_img_box ${
                        isActiveSong === items && "active"
                      }`}
                    >
                      <img
                        src={items.image[2].link}
                        alt=""
                        className="songs_card_list_img"
                      />
                      <div className="song_card_play_box">
                        <div className="song_card_play_cta">
                          <span
                            onClick={() => {
                              getSongData(
                                items.downloadUrl[4].link,
                                items.name,
                                items.image[2],
                                items.primaryArtists,
                                items,
                                data.results,
                                // setCount(count+1)
                              );
                              setIsActiveSong(items);
                            }}
                          >
                            {isActiveSong === items ? (
                              <PauseIcon />
                            ) : (
                              <PlayArrowIcon />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h2 className="songs_card_list_song_title">
                      {items?.name}
                    </h2>
                    <p className="songs_card_list_song_disc">
                      {items.primaryArtists}
                    </p>
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>

      <curSongUrl.Provider value={{ getData, isAutoPlay }}>
        <PlayerTrack />
      </curSongUrl.Provider>
    </>
  );
};

export default SearchResult;
export { curSongUrl };
