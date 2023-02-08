import React from "react";
import OpenViduVideoComponent from "./OvVideo";

const UserVideoComponent = (streamManager) => {
  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent" >
          <OpenViduVideoComponent streamManager={streamManager.streamManager} />
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;