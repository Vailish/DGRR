import React, { Component } from 'react'
import { OpenVidu } from 'openvidu-browser'
import axios from 'axios'
import UserVideoComponent from './UserVideoComponent';
import './test.css'
const APPLICATION_SERVER_URL = "https://i8b102.p.ssafy.io:8443/openvidu/";
class KioskVideo extends Component {
  constructor(props) {
    super(props);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: this.onRandomSession(),
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      subscribers: [],
      test: {}
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  onRandomSession(length = 50) {
    return Math.random().toString(16).substr(2, length)
  }
  componentDidMount() {
    if (!this.state.session) {
      this.joinSession();

    }
    window.addEventListener("beforeunload", this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then((token) => {
          console.log("Token" + token.token)
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token.token, { clientData: this.state.myUserName })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                piublshAudio: false, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "1920x1080", // The resolution of your video
                frameRate: 50, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Obtain the current video device in use
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter((device) => device.kind === "videoinput");
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
      test: undefined
    });
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div>
        {/* {this.state.session === undefined ? (
          <div>
            <div>
              <h1> Join a video session </h1>
              <form onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label> Session: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input
                    className="btn btn-lg btn-success"
                    name="commit"
                    type="submit"
                    value="JOIN"
                  />
                </p>
              </form>
            </div>
          </div>
        ) : null} */}

        {this.state.session !== undefined ? (
          <div>
            <div>

              <input

                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              />
              {/* <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={this.switchCamera}
                value="Switch Camera"
              /> */}
            </div>

            {this.state.mainStreamManager !== undefined ? (
              <div id="main-video">
                <UserVideoComponent streamManager={this.state.mainStreamManager} />
              </div>
            ) : null}
            <div>
              {/* {this.state.publisher !== undefined ? (
                <div
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() => this.handleMainVideoStream(this.state.publisher)}
                >
                  <UserVideoComponent streamManager={this.state.publisher} />
                </div>
              ) : null} */}
              {this.state.subscribers.map((sub, i) => (
                <div key={sub.id}>
                  <span>{sub.id}</span>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  async getToken() {
    console.log(this.state.mySessionId)
    console.log("test합시다." + this.state.test.sessionId)

    const testRes = await this.getSession();
    console.log("내 sessionId" + this.state.mySessionId)
    for (let i = 0; i < testRes.data.content.length; i++) {
      console.log(testRes.data.content[i].sessionId)
      if (this.state.mySessionId === testRes.data.content[i].sessionId) {
        this.setState({
          test: testRes.data.content[i]
        })
        return await this.createToken(this.state.test.sessionId)
      }
    }
    const testSessionId = await this.createSession(this.state.mySessionId)
    this.setState({
      test: testSessionId
    })
    return await this.createToken(this.state.test.sessionId)
    // console.log(testSessionId.sessionId)

    // return await this.createToken(this.state.test.sessionId);

    // } else if (typeof (this.state.test.sessionId) !== undefined) {
    //   return await this.createToken(this.state.mySessionId);

    // }
    // if (!sessionIdTest) {
    //   sessionIdTest = await this.createSession(testId);
    //   const test = sessionIdTest.sessionId
    //   return await this.createToken(test);
    // } else {

    // }

  }
  async getSession() {
    const response = await axios.get(APPLICATION_SERVER_URL + `api/sessions`,
      {
        headers: {
          "Content-Type": "application/json", "Authorization": "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU"
        },
      })
    return response;
  }
  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + `api/sessions`,
      {
        "mediaMode": "ROUTED",
        "recordingMode": "MANUAL",
        "customSessionId": sessionId,
        "forcedVideoCodec": "VP8",
        "allowTranscoding": false,
        "defaultRecordingProperties": {
          "name": "MyRecording",
          "hasAudio": false,
          "hasVideo": true,
          "outputMode": "COMPOSED",
          "recordingLayout": "BEST_FIT",
          "resolution": "1280x720",
          "frameRate": 25,
          "shmSize": 536870912,
          "mediaNode": {
            "id": "media_i-0c58bcdd26l11d0sd"
          }
        },
        "mediaNode": {
          "id": "media_i-0c58bcdd26l11d0sd"
        }
      },
      {
        headers: {
          "Content-Type": "application/json", "Authorization": "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU"
        },
      }
    );

    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + `api/sessions/${sessionId}/connection`,
      {
        "type": "WEBRTC",
        "data": "My Server Data",
        "record": true,
        "role": "PUBLISHER",
        "kurentoOptions": {
          "videoMaxRecvBandwidth": 1000,
          "videoMinRecvBandwidth": 300,
          "videoMaxSendBandwidth": 1000,
          "videoMinSendBandwidth": 300,
          "allowedFilters": ["GStreamerFilter", "ZBarFilter"]
        },
        "customIceServers": [
          {
            "url": "turn:turn-domain.com:443",
            "username": "usertest",
            "credential": "userpass"
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json", "Authorization": "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
      }
    );
    return response.data; // The token
  }
}

export default KioskVideo
