import React, { createContext, useContext, useState } from "react";
import songImage from "./img/trendingImage.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper";
import "swiper/css";
import { trendingSong } from "../../../API/SongApi";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlayerTrack from "../../Player_Track/PlayerTrack";





const getUrlContext = createContext()
const TrendingSong = () => {
  const { data } = useContext(trendingSong);
  const [geturl,setUrl] = useState()
  const playSong = (url)=>{
    setUrl(url)
  }
  return (
    <>
      <Swiper>
        <SwiperSlide>
          <div className="songs_card_box">
            {data?.trending.albums.map((item, index) => {
              let data = 14;
              if (data > index) {
                return (
                  <>
                    <div className="songs_card_list_wrpr" key={item.id}>
                      <div className="songs_card_list_box">
                        <div className="songs_card_list_img_box">
                          <img
                            src={item.image[2].link}
                            alt=""
                            className="songs_card_list_img"
                          />
                          <div className="song_card_play_box">
                            <div className="song_card_play_cta">
                              <span  onClick={()=>playSong(item.url)}>
                                <PlayArrowIcon />
                              </span>
                            </div>
                          </div>
                        </div>
                        <h2 className="songs_card_list_song_title">
                          {item.name}
                        </h2>
                        <p className="songs_card_list_song_disc">
                          {item.artists[0].name}
                        </p>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="songs_card_box">
            {data?.trending.albums.map((item, index) => {
              let data = 14;
              if (data < index) {
                return (
                  <>
                    <div className="songs_card_list_wrpr" key={item.id}>
                      <div className="songs_card_list_box">
                        <div className="songs_card_list_img_box">
                          <img
                            src={item.image[2].link}
                            alt=""
                            className="songs_card_list_img"
                          />
                          <div className="song_card_play_box">
                            <div className="song_card_play_cta">
                              <span onClick={()=>playSong(item.url)}>
                                <PlayArrowIcon />
                              </span>
                            </div>
                          </div>
                        </div>
                        <h2 className="songs_card_list_song_title">
                          {item.name}
                        </h2>
                        <p className="songs_card_list_song_disc">
                          {item.artists[0].name}
                        </p>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </SwiperSlide>
      </Swiper>

      <getUrlContext.Provider value={geturl}>
        <PlayerTrack/>
      </getUrlContext.Provider>
    </>
  );
};

export default TrendingSong;
export {getUrlContext}
