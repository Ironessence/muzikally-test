import React, {useState, useRef } from 'react';
//adding components
import Player from './components/Player';
import Song from './components/Song';
//import styles
import './styles/App.scss';
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {

  //ref

  const audioRef = useRef(null);
  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  })
  const [libraryStatus, setLibraryStatus] = useState(false);


  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: current, duration})
  }

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
     await setCurrentSong(songs[(currentIndex + 1) % songs.length])
     if(isPlaying) audioRef.current.play();
    }


  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
      <Library
      libraryStatus={libraryStatus}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}
      isPlaying={isPlaying}
      audioRef={audioRef} 
      
      songs={songs} />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHandler}></audio>
        
    </div>
    
  );
}

export default App;
