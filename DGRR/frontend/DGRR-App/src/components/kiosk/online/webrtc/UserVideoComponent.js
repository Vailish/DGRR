import React from 'react'
import OpenViduVideoComponent from './OvVideo'
import './UserVideo.css'
const UserVideoComponent = streamManager => {
  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager.streamManager} />
        </div>
      ) : null}
    </div>
  )
}

export default UserVideoComponent
