import React, { Component, useRef, useEffect } from 'react'
const OpenViduVideoComponent = streamManager => {
  const videoRef = useRef()
  // useEffect(({ streamManager }) => {
  //   if (streamManager && !!videoRef) {
  //     streamManager.streamManager.addVideoElement(videoRef.current);
  //   }
  // });

  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.streamManager.addVideoElement(videoRef.current)
    }
  }, [streamManager])

  return <video autoPlay={true} ref={videoRef} style={{ width: '600px' }} />
}

export default OpenViduVideoComponent
