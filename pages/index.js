import React, { useEffect, useState, useRef } from 'react';
import YouTube from 'react-youtube';
import Head from 'next/head';

import radioList from '../radios';
import Back from '../components/back';
import Next from '../components/next';

const loadingArray = [
  'Memanaskan mesin mobil...',
  'Packing-packing baju...',
  'Menyiapkan snack untuk perjalanan...',
  'Mengecek air radiator...',
  'Mencari kunci mobil...',
];


export default function Home() {
  const audioElement = useRef(null);
  const [videoObj, setVideoObj] = useState(null);
  const [showOverlay, toggleOverlay] = useState(true);
  const [showStartButton, toggleStartButton] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [activeRadioIdx, setActiveRadioIdx] = useState(0);
  
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 5);
    const randomRadioIndex = Math.floor(Math.random() * 6);
    setLoadingMsg(loadingArray[randomIndex]);
    setActiveRadioIdx(randomRadioIndex);
    
  }, [])

  const opts = {
    height: '560',
    width: '640',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      controls: 0,
      disablekb: 0,
      enablejsapi: 1,
      loop: 1
    },
  }; 

  function onReady(e) { 
    setVideoObj(e);
    e.target.playVideo();
    setLoadingMsg('');
    toggleStartButton(true);
  }

  function handleBerangkat() {
    videoObj && videoObj.target.playVideo();
    audioElement.current.play();
    toggleOverlay(false);
    toggleStartButton(false);
  }
  
  function handleVideoStateChange(e) {
    e.target.data < 0 && e.target.playVideo();
  }

  function handleNext() {
    const appliedNextIndex = Math.min(5, activeRadioIdx + 1);
    setActiveRadioIdx(appliedNextIndex);
  }

  function handlePrev() {
    const appliedNextIndex = Math.max(0, activeRadioIdx - 1);
    setActiveRadioIdx(appliedNextIndex);
  }

  const overlayClass = showOverlay ? 'show' : 'hide';
  const hudClass = showOverlay ? 'hide' : 'show';
  const activeRadio = radioList[activeRadioIdx];
  
  return (
    <>
      <Head>
        <title>Mudik dan Radio</title>
        <meta name="description" content="Nyetir di tol Trans Jawa sambil dengar radio" />
        <meta name="title" content="Mudik dan radio" />
        <meta property="og:site_name" content="Mudik dan Radio"/>
        <meta property="og:title" content="Mudik dan Radio"/>
        <meta property="og:description" content="Nyetir di tol Trans Jawa sambil dengar radio"  />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://www.youtube.com/iframe_api" />
      </Head>
      <div className='bg'>
        <YouTube containerClassName='playerContainer' className='video' videoId="Nu2LwfIFuD4" opts={opts} onReady={onReady} onStateChange={handleVideoStateChange} />
      </div>
      <div className={`${overlayClass} overlay`}>
          <h2>{loadingMsg}</h2>
          <button style={{ display: showStartButton ? 'block' : 'none' }}onClick={handleBerangkat}>Berangkat</button>
      </div>
      <audio ref={audioElement} src={activeRadio.source} preload="auto" />
      <div className='HUD'>
        <div className={`HUDcontainer ${hudClass}`}>
          <div className='center videoTitle'>Tangerang Selatan - Madiun via Tol Trans Jawa</div>
          <div className='center controller'>
            <div onClick={handlePrev}><Back/></div>
            <div>{activeRadio.name}</div>
            <div onClick={handleNext}><Next /></div>
          </div>
          <a className='center source a' href='https://www.youtube.com/watch?v=Nu2LwfIFuD4' rel='noopener noreferrer'>Sumber Video</a>
        </div>
      </div>
      <style jsx global>{`
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          background: #000;
        }
        .center {
          text-align: center
        }
        .overlay {
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
          background: #000000fe;
          position: fixed;
          transition: opacity ease 3s;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .show {
          z-index: 100;
          opacity: 1;
        }
        .hide {
          zIndex: -1;
          opacity: 0;
        }
        .bg {
          width: 100%;
          height: 100%;
          position: fixed;
          z-index: 0;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .video {
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          position: relative;
          min-width: 100%;
          transform: scale(3);
        }
        .dim {
          opacity: 0.3
        }
      `}</style>
    </>
  )
}
