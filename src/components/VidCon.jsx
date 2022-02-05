import React, {useEffect, useReducer, useRef, useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Peer from "simple-peer";
import socketIOClient from "socket.io-client";
import {Button, notification} from "antd";
// import TimePicker from "rc-time-picker";
// import moment from "moment";
const socket = socketIOClient('https://ayur-care.ayurway.com:8050');
const VidCon = () => {
    const [idToCall, setIdToCall] = useState('');
    const connectionRef = useRef();

    const screenTrackRef = useRef();

    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [screenShare, setScreenShare] = useState(false)
    const [name, setName] = useState('');
    const [userStream, setuserStream] = useState();
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const [Audio, setAudio] = useState(true);
    const [Video, setVideo] = useState(true);
    const myVideo = useRef();
    const userVideo = useRef();
    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            imageURLS: [],
            imageFiles: [],
            startTimeObject: {},
            endTimeObject: {},
            meetingDetails: {
                Email: "",
                StartTime: "",
                EndTime: "",
                WellnessFirmId: 0,

            }
        }
    );


    useEffect(async () => {
        socket.on('me', (id) => {
                console.log("new sssssssssssssid-", id)
                setMe(id)
            }
        )
        await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: 4096, height: 2160,
                    frameRate: {
                        ideal: 60,
                        min: 30
                    }
                }
            }
        ).then((currentStream) => {

            setStream(currentStream);

            myVideo.current.srcObject = currentStream;
        });

        socket.on('callUser', ({from, name: callerName, signal}) => {
            setCall({isReceivingCall: true, from, name: callerName, signal});
        });
    }, []);

    const capturePic = () => {
        const vid = document.getElementById('userVideo');
        let canvas = document.createElement("canvas");
        canvas.width = vid.videoWidth;
        canvas.height = vid.videoHeight;
        canvas.getContext('2d').drawImage(vid, 0, 0, canvas.width, canvas.height);
        let imageURLS = state.imageURLS
        let imageFiles = state.imageFiles
        return new Promise((res, rej) => {
            canvas.toBlob(res => {
                let blosb = URL.createObjectURL(res);
                imageURLS.push(blosb)
                setState({imageURLS})
                const file = new File([blosb], 'fileName.jpg', {type: "image/jpeg", lastModified: new Date()});
                imageFiles.push(file)
                setState({imageFiles})
            }, 'image/jpeg');

        });

    };
    const handleScreenSharing = () => {

        // if(!myVdoStatus){
        //     message.error("Turn on your video to share the content", 2);
        //     return;
        // }
        if (!screenShare) {
            navigator.mediaDevices
                .getDisplayMedia({ cursor: true })
                .then((currentStream) => {
                    const screenTrack = currentStream.getTracks()[0];


                    // replaceTrack (oldTrack, newTrack, oldStream);
                    connectionRef.current.replaceTrack(
                        connectionRef.current.streams[0]
                            .getTracks()
                            .find((track) => track.kind === 'video'),
                        screenTrack,
                        stream
                    );

                    // Listen click end
                    screenTrack.onended = () => {
                        connectionRef.current.replaceTrack(
                            screenTrack,
                            connectionRef.current.streams[0]
                                .getTracks()
                                .find((track) => track.kind === 'video'),
                            stream
                        );

                        myVideo.current.srcObject = stream;
                        setScreenShare(false);
                    };

                    myVideo.current.srcObject = currentStream;
                    screenTrackRef.current = screenTrack;
                    setScreenShare(true);
                }).catch((error) => {
                console.log("No stream for sharing")
            });
        } else {
            screenTrackRef.current.onended();
        }
    };
    const answerCall = async (e) => {
        setCallAccepted(true);
        notification.destroy()
        const peer = new Peer({initiator: false, trickle: false, stream});

        peer.on('signal', (data) => {
            socket.emit('answerCall', {signal: data, to: call.from});
        });
        peer.on('stream', (currentStream) => {
            setuserStream(currentStream)
            userVideo.current.srcObject = currentStream;
        });
        peer.signal(call.signal);
        connectionRef.current = peer;

    };

    const downloadIMGBlob = (blobUrl, name) => {
        // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)

        // Create a link element
        const link = document.createElement("a");

        // Set link's href to point to the Blob URL
        link.href = blobUrl;
        link.download = name;

        // Append link to the body
        document.body.appendChild(link);

        // Dispatch click event on the link
        // This is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            })
        );

        // Remove link from body
        document.body.removeChild(link);
    }
    const declineCall = () => {
        setCallAccepted(false);
        notification.destroy()
        const peer = new Peer({initiator: false, trickle: false, stream});
        peer.on('signal', (data) => {
            socket.emit('declineCall', {signal: data, to: "declineCall"});
        });

    };
    const handleChangeScheduler = (e) => {
        let meetingDetails = state.meetingDetails;
        meetingDetails["Email"] = e.target.value
        setState({meetingDetails});

    }
    const handleChangeTime = (data, name) => {
        // setState({startTimeObject: data});
        let meetingDetails = state.meetingDetails;
        meetingDetails[name] = data.format();
        setState({meetingDetails});
    };
    const callUser = async (e, id) => {
        const peer = new Peer({initiator: true, trickle: false, stream});

        peer.on('signal', (data) => {
            console.log("djklasjdaldsklajdalskjd", data)
            socket.emit('callUser', {userToCall: id, signalData: data, from: me, name});
        });
        peer.on('stream', (currentStream) => {
            console.log("djklasjdaldsklajdalskjd", currentStream)

            userVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    };
    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    };
    const handlePip = () => {
        const vid = document.getElementById('userVideo');
        vid.requestPictureInPicture();
    }
    const handleAudio = () => {
        setAudio(!Audio)
        const myTracks = stream.getTracks();
        const myAudio = myTracks.filter(track => track.kind === "audio")[0];
        console.log("fhkdsjfsdf", !Audio)
        myAudio.enabled = !Audio;
    }
    const handleVideo = () => {
        setVideo(!Video)
        const myTracks = stream.getTracks();
        const myVideo = myTracks.filter(track => track.kind === "video")[0];
        myVideo.enabled = !Video;
    }
    const callReciever = () => {
        const key = `1`;
        const btn2 = (
            <Button type="primary" size="small" onClick={answerCall}>
                Accept
            </Button>
        );

        const btn = (<div className="flex mt-20">
                <div>
                    <Button type="primary" danger size="small" onClick={declineCall}>
                        Decline
                    </Button>
                </div>
                <div className="ml-150">
                    <Button type="primary" size="small" onClick={answerCall}>
                        Accept
                    </Button>
                </div>
            </div>

        );
        notification.open({
            className: "StatusMsgCal",
            duration: 0,
            closeIcon: (<div></div>),
            message:
                <div>
                    <div className="flex">
                        <div className="col-md-1 p-0 mr-20">
                            <div className="ring-csontainer">
                                <div className="ONL-Green"></div>
                                <div className="IncomingCall"></div>
                            </div>
                        </div>
                        <div className="col-md-11 p-0">
                            <div className="s">
                                <strong>Incoming Call.. </strong>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 ml-40">
                        <p>{call.name}</p>
                    </div>
                </div>,
            description:
            btn,
        });
    }
    console.log("njnkjdnfkskdfn", state)
    return (
        <div>
            <div className="prntInv" id="wrapper">
                <div className="main prntInv  patientTpPt">

                    <div className="prntInv col-md-12 mt-20">
                        <div className="panel prntInv card-Container">
                            <div className="panel-heading no-color flex">
                                <div className="col-md-9">
                        <span className="panel-title my-appoin mt-0 mrb-10">
                       Doctor Consultation
                        </span>
                                </div>
                                <div className="col-md-3">

                                </div>
                                <div className="col-md-3">

                                </div>
                            </div>
                            <div className="col-md-12  ">
                                <div className="col-md-12 userInfoSection mt-15">

                                    <div className="col-md-6 mb20 ">
                                        <div>
                                            <div className="flex">
                                                <div className="col-md-2"><p>User Name</p></div>
                                                <div className="col-md-6"><input className="form-control name-input"
                                                                                 type="name" label="Name" value={name}
                                                                                 onChange={(e) => setName(e.target.value)}
                                                                                 fullWidth/>
                                                </div>
                                                <div className="col-md-2">
                                                    <CopyToClipboard text={me}>
                                                        <button className="btn btn-primary" variant="contained"
                                                                color="primary">
                                                            Copy meeting ID
                                                        </button>
                                                    </CopyToClipboard>
                                                </div>


                                            </div>


                                            <div className="flex mt-20">
                                                <div className="col-md-2"><p>Make a call</p></div>
                                                <div className="col-md-6">
                                                    <input className="form-control name-input" type="name"
                                                           label="ID to call" value={idToCall}
                                                           onChange={(e) => setIdToCall(e.target.value)} fullWidth/>

                                                </div>
                                                <div className="col-md-2">     {callAccepted && !callEnded ? (
                                                    ""
                                                ) : (
                                                    <button className="btn btn-primary" variant="contained"
                                                            color="primary" onClick={(e) => callUser(e, idToCall)}>
                                                        Call
                                                    </button>
                                                )}  </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb20 ">
                                        <div>
                                            <p>Send Meeting Details to Mail</p>
                                            <div className="flex">
                                                <div className="col-md-1 p-0 mt-5"><p>Email:</p></div>
                                                <div className="col-md-6 p-0">

                                                    <input className="form-control name-input" type="name" label="Name"
                                                           value={state.meetingDetails.Email}
                                                           onChange={(e) => handleChangeScheduler(e)}/>
                                                </div>


                                            </div>


                                            <div className="flex mt-20">
                                                <div className="col-md-1 p-0 mt-5"><p>Timings:</p></div>
                                                <div className="col-md-6 ">
                                                    <div className="flex">


                                                        {/*<div className="">*/}
                                                        {/*    <TimePicker*/}
                                                        {/*        clearIcon={() => null}*/}
                                                        {/*        showSecond={false}*/}
                                                        {/*        onChange={(data) =>*/}
                                                        {/*            handleChangeTime(data, "StartTime")*/}
                                                        {/*        }*/}
                                                        {/*        value={state.meetingDetails.StartTime ? moment(*/}
                                                        {/*            state.meetingDetails.StartTime) : ""}*/}
                                                        {/*        className="rc-time-picker mr-15"*/}
                                                        {/*        popupClassName="rc-time-picker-panel-inner"*/}
                                                        {/*        format={"h:mm a"}*/}
                                                        {/*        use12Hours*/}
                                                        {/*    />*/}
                                                        {/*</div>*/}
                                                        {/*<p className="mr-10"> To</p>*/}
                                                        {/*<div className="">*/}
                                                        {/*    <TimePicker*/}
                                                        {/*        clearIcon={() => null}*/}
                                                        {/*        showSecond={false}*/}
                                                        {/*        onChange={(data) =>*/}
                                                        {/*            handleChangeTime(data, "EndTime")*/}
                                                        {/*        }*/}
                                                        {/*        value={state.meetingDetails.EndTime ? moment(*/}
                                                        {/*            state.meetingDetails.EndTime) : ""}*/}
                                                        {/*        className="rc-time-picker mr-15"*/}
                                                        {/*        popupClassName="rc-time-picker-panel-inner"*/}
                                                        {/*        format={"h:mm a"}*/}
                                                        {/*        use12Hours*/}
                                                        {/*    />*/}
                                                        {/*</div>*/}
                                                    </div>

                                                </div>
                                                <div className="col-md-2">     {callAccepted && !callEnded ? (
                                                    ""
                                                ) : (
                                                    <button className="btn btn-primary" variant="contained"
                                                            color="primary" onClick={(e) => callUser(e, idToCall)}>
                                                        Send
                                                    </button>
                                                )}  </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-md-12 mt-25 mb-50">
                                <div className="col-md-3">
                                    <div className=" user-Vid-Cntr ">
                                        <div className="user-Vid ">
                                            {stream && (
                                                <div>
                                                    <p className="wordBreak fsz-17">{name || ''}</p>
                                                    <div className="vidbg">
                                                        <video playsInline muted ref={myVideo} autoPlay width="320"
                                                               height="240"/>
                                                    </div>

                                                    <div className="user-Vid-pan-cotrols flex mt-15">
                                                        <div className="col-md-6">
                                                            <div className="vid-mic-On-off">
                                                                {
                                                                    Audio ?
                                                                        <i className="mr-30P fas fa-microphone-alt fsz-25 cursor-point "
                                                                           onClick={handleScreenSharing}></i>

                                                                        :

                                                                        <i className="mr-30P fas fa-microphone-slash fsz-25 cursor-point"
                                                                           onClick={handleScreenSharing}></i>
                                                                }

                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="vid-mic-On-off">
                                                                {
                                                                    Video ?
                                                                        <img className="cursor-point mr-30P" src="assets/icon/playVideo.png"
                                                                             onClick={handleVideo}/>

                                                                        :
                                                                        <img className="cursor-point mr-30P"
                                                                             src="assets/icon/offVideo.png"
                                                                             onClick={handleVideo}/>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="vid-mic-On-off ">
                                                                {callAccepted && !callEnded ? (
                                                                    <button
                                                                        className="btn btn-primary red fw-600 leaveMeeting"
                                                                        variant="contained" color="secondary"
                                                                        onClick={leaveCall}>
                                                                        Leave
                                                                    </button>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            )}
                                        </div>
                                    </div>


                                </div>
                                <div className="col-md-9">
                                    <div className="caller-user-Vid">
                                        {callAccepted && !callEnded && (
                                            <div>
                                                <div className="col-md-9 p-0">
                                                    <div className="flex mb10">
                                                        <div className="col-md-1 p-0">
                                                            <div className="ring-container  ">
                                                                <div className="ONL-Green"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-11 p-0"><p
                                                            className="fsz-19 wordBrk">{call.name || ''}</p></div>

                                                        <div className="col-md-1">
                                                            <i onClick={handlePip}className="fsz-25 fas fa-photo-video cursor-point"></i>
                                                        </div>
                                                        <div className="col-md-1">
                                                            <i onClick={capturePic} className="fsz-25 fas fa-camera-retro cursor-point"></i>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="caller-user-Vid-pan text-center ">

                                                    <video id="userVideo" playsInline ref={userVideo}
                                                           controls={true} autoPlay width={900}/>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {call.isReceivingCall && !callAccepted && (
                                    callReciever()
                                )}
                                <div className="col-md-12 mt-20">

                                    <div className="caller-user-Vid">
                                        <div className="mb-20">
                                            <p className="fw-600 fsz-19">Snaps</p>
                                        </div>
                                        {
                                            state.imageURLS.map((v, i) => {
                                                return <div className="col-md-3">
                                                    <div className="imgPrevs">
                                                        <button className="imgDwnld"
                                                                onClick={() => downloadIMGBlob(v, `image${1}.png`)}>Download
                                                        </button>
                                                        <img className="img-responsive" src={v} alt=""/>
                                                    </div>
                                                </div>
                                            })
                                        }
                                        <div className="clearfix"></div>
                                    </div>

                                </div>


                            </div>
                            <div className="clearfix"></div>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};


export default VidCon;