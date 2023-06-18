import React, { useContext, useEffect, useRef, useState } from "react";
import "./PlayerTrack.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import song from "./SongList/first.mp3";
import { curSongUrl } from "../Search_Result/SearchResult";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const PlayerTrack = (props) => {
  const { getData, isAutoPlay } = useContext(curSongUrl);
  const [isPause, setIsPause] = useState(isAutoPlay);
  const [min_duration, setMinDuration] = useState("0");
  const [sec_duration, setSecDuration] = useState("0");
  const [curDuration, setCurDuraction] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentMinTime, setCurrentMinTime] = useState(0);
  const [duration, setTotalDuration] = useState();
  const [actualSecond, setAtctualSocond] = useState();
  const [isShow, setIsShow] = useState(false);
  const [volume, setVolume] = useState(10);
  const [muteIcon, setMuteIcon] = useState(false);
  const [NextSong, setNextSong] = useState(false);
  const [count, setCount] = useState(0);
  let getAudio = useRef(); // get the dom

  const onLoadedMetadata = () => {
    if (getAudio.current) {
      let SongDuration = getAudio.current.duration;
      setTotalDuration(SongDuration);
      let min_Duration = Math.floor(getAudio.current.duration / 60);
      let sec_Duraration = Math.floor(getAudio.current.duration % 60);
      if (getAudio.current.duration) {
        // otherwise it will throw an error
        setMinDuration(min_Duration);
        setSecDuration(sec_Duraration);
      }
      let currTime = getAudio.current.currentTime;
      setAtctualSocond(currTime);
      let getCurrentTime = currTime % 60;
      let getCurrentMin = Math.floor(currTime / 60);
      setCurDuraction(getCurrentTime.toFixed(0));
      setCurrentMinTime(getCurrentMin);
      let progressBar = (currTime / SongDuration) * 100;
      setProgress(progressBar); // this is for track width
      getAudio.current.volume = volume / 10; // because input range is 5
      if (getAudio.current.volume === 0) {
        setMuteIcon(true);
      } else {
        setMuteIcon(false);
      }
    }
  };
  useEffect(() => {
    setIsPause(isAutoPlay); // play icon active when song to be played.
  }, [getData]);

  const pausePlay = () => {
    setIsPause(!isPause);
    if (isPause) {
      if (getData[0]) {
        getAudio.current.pause();
      }
    } else {
      getAudio.current.play();
    }
  };

  // play song when progress bar is clicked
  const playSong = (e) => {
    // console.log(getData[0])
    if (getData[0]) {
      let currentTiming = (e.clientX / e.target.clientWidth) * duration;
      getAudio.current.currentTime = currentTiming;
      console.log(e.clientX,e.target.clientWidth,duration,currentTiming)
      // console.log(e.clientX,e.target.clientWidth,duration)
    }
  };

  // play next song on click next button

  const playNextSong = () => {
    console.log(getData[4]);
    setNextSong(true);
  };

  return (
    <>
      <div className="player_track_wrpr">
        <div className="player_track_inner_wrpr">
          <div className="player_track_box">
            <audio
              src={NextSong ? getData[4][0].link : getData[0]}
              controls
              autoPlay
              onTimeUpdate={onLoadedMetadata}
              ref={getAudio}
            ></audio>
            <div className="player_track_song_details">
              <div className="player_track_song_img">
                <span>
                  <img src={getData[2]?.link} alt="" />
                </span>
              </div>
              <div className="player_track_song_details_txt">
                <h2 className="player_track_song_heading">{getData[1]}</h2>
                <p className="player_track_song_disc">{getData[3]}</p>
              </div>
            </div>
            <div className="payer_track_song_controll">
              <div className="player_track_song_controll_icon">
                <SkipPreviousIcon />
              </div>
              <div
                className="player_track_song_controll_icon"
                onClick={pausePlay}
              >
                {isPause ? <PauseIcon /> : <PlayArrowIcon />}
              </div>
              <div
                className="player_track_song_controll_icon"
                onClick={() => playNextSong(setCount(count + 1))}
              >
                <SkipNextIcon />
              </div>
            </div>
            <div className="player_track_song_timer">
              <div className="player_track_song_time">
                <span className="player_track_song_time_disc">
                  {currentMinTime}:
                  {curDuration.length === 1
                    ? `0${curDuration}`
                    : `${curDuration}`}
                  /
                </span>
                <span className="player_track_song_time_disc">
                  {min_duration}:
                  {sec_duration.length === 1
                    ? `0${sec_duration}`
                    : `${sec_duration}`}
                </span>
              </div>
              <div className="payer_track_song_action_btn">
                <span className="player_track_song_action_icon dots">
                  <MoreHorizIcon />
                </span>
                <span
                  className="player_track_song_action_icon valume"
                  onClick={() => setIsShow(!isShow)}
                >
                  {muteIcon ? <VolumeOffIcon /> : <VolumeUpIcon />}
                </span>
                <span className="player_track_song_action_icon fullScreen">
                  <OpenInFullIcon />
                </span>
                <div className={isShow ? "volume_box active" : "volume_box"}>
                  <input
                    type="range"
                    max={10}
                    name=""
                    id=""
                    onInput={(e) => setVolume(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="song_duration_line_bar" onClick={playSong} />
        <div
          className="song_duration_line"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </>
  );
};

export default PlayerTrack;
