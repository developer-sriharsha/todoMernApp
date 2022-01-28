import React, {useState, useContext, useRef, useEffect} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer from "simple-peer";
import socketIOClient from "socket.io-client";
import {Button, notification} from "antd";
console.log("lksdjflkdfj",socketIOClient)
const socket = socketIOClient('https://ayur-care.ayurway.com:8050');
const VidCon = ({ children }) => {
    const [idToCall, setIdToCall] = useState('');
    const connectionRef = useRef();
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();

    const [name, setName] = useState('');
    const [userStream, setuserStream] = useState();
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const [Audio, setAudio] = useState(true);
    const [Video, setVideo] = useState(true);
    const [screenShareStatus, SetScreenShareStatus] = useState(false);
    const myVideo = useRef();
    const userVideo = useRef();
    const senders = useRef([]);
    useEffect(async () => {
        socket.on('me', (id) => {
                console.log("new sssssssssssssid-",id)
                setMe(id)
            }
        )
        await  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {

                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, []);

    const ShareScreen =async () => {
        SetScreenShareStatus(true)
        navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(strseam => {
            const track = strseam.getTracks()[0];
            connectionRef.current.addStream(strseam);
            userVideo.current.srcObject = strseam;
            track.onended = function () {
                userVideo.current.srcObject = userStream;
                connectionRef.current.removeTrack(track, strseam);
            };
        })
    };

    const answerCall = async (e) => {
        setCallAccepted(true);
        notification.destroy()
        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });
        peer.on('stream', (currentStream) => {

            setuserStream(currentStream)
            userVideo.current.srcObject = currentStream;
            // setuserStream(currentStream)
        });

        peer.signal(call.signal);
        connectionRef.current = peer;

    };

    console.log("hfkjsdhfdsfs",senders)
    const declineCall = () => {
        setCallAccepted(false);
        notification.destroy()
        const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on('signal', (data) => {
            socket.emit('declineCall', { signal: data, to: "declineCall" });
        });

    };
    const callUser = async (e,id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            console.log("djklasjdaldsklajdalskjd",data)
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });
        peer.on('stream', (currentStream) => {
            console.log("djklasjdaldsklajdalskjd",currentStream)

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
    const handleAudio=()=>{
        setAudio(!Audio)
        const myTracks = stream.getTracks();
        const myAudio = myTracks.filter(track => track.kind === "audio")[0];
        console.log("fhkdsjfsdf",!Audio)
        myAudio.enabled = !Audio;
    }
    const handleVideo=()=>{
        setVideo(!Video)
        const myTracks = stream.getTracks();
        const myVideo = myTracks.filter(track => track.kind === "video")[0];
        myVideo.enabled = !Video;
    }
    const callReciever=()=>{
        const key = `1`;
        const btn2 = (
            <Button type="primary" size="small" onClick={answerCall}>
                Accept
            </Button>
        );
        const btn = (<div className="flex mt-20">
                <div >
                    <Button type="primary" size="small" onClick={declineCall}>
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
            message: `Call from ${call.name}`,
            description:
            btn,
        });
    }

    console.log("fkjldsfjksldjfdfj",me)
    return (
        <div >
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
                            <div  className="col-md-12  " >
                                <div className="col-md-12 userInfoSection mt-15">
                                    <div className="col-md-6 mb20 ">
                                        <table className="table table-bordered presPaTable">
                                            <tbody>
                                            <tr>
                                                <th className="table-heading-bg-prfl width30">
                                                    Patient Id{" "}
                                                </th>
                                                <td>
                                                </td>
                                            </tr>

                                            <tr>
                                                <th className="table-heading-bg-prfl">
                                                    Patient Name
                                                </th>
                                                <td>

                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="table-heading-bg-prfl">
                                                    Consultant
                                                </th>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="table-heading-bg-prfl">
                                                    Final Diagnosis
                                                </th>
                                                <td>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-6 mb20 ">
                                        <div  >
                                            <div  className="flex">
                                                <div className="col-md-2">      <p >User Name</p></div>
                                                <div className="col-md-6">                                                    <input className="form-control name-input" type="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                                                </div>
                                                <div className="col-md-2"> <CopyToClipboard text={me} >
                                                    <button  className="btn btn-primary" variant="contained" color="primary" >
                                                        Copy Invite ID
                                                    </button>
                                                </CopyToClipboard></div>


                                            </div>
                                            <div className="flex mt-20">
                                                <div className="col-md-2">      <p >Make a call</p></div>
                                                <div className="col-md-6">
                                                    <input className="form-control name-input" type="name" label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />

                                                </div>
                                                <div className="col-md-2">     {callAccepted && !callEnded ? (
                                                    ""
                                                ) : (
                                                    <button  className="btn btn-primary" variant="contained" color="primary" onClick={(e) => callUser(e,idToCall)} >
                                                        Call
                                                    </button>
                                                )}  </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div  className="col-md-12 mt-25 mb-50" >
                                <div  className=" user-Vid-Cntr ">
                                    <div className="col-md-3">  <div className="flex">
                                        <div className="user-Vid ">
                                            {stream && (
                                                <div>
                                                    <div   className="user-Vid-pan">
                                                        <h5  >{name || ''}</h5>
                                                        <video playsInline muted ref={myVideo} autoPlay width="320" height="240" />
                                                    </div>
                                                    <div className="user-Vid-pan-cotrols flex mt-25">
                                                        <div className="col-md-6">
                                                            <div className="vid-mic-On-off">
                                                                {
                                                                    Audio? <a className="mr-30P cursor">
                                                                            <i className="fas fa-microphone-alt fsz-25 cursor " onClick={handleAudio}></i>

                                                                        </a> :
                                                                        <a className="mr-30P cursor">
                                                                            <i className="fas fa-microphone-slash fsz-25 cursor" onClick={handleAudio}></i>
                                                                        </a>
                                                                }


                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="vid-mic-On-off">
                                                                {
                                                                    Video?<a className="mr-30P ">
                                                                            <img src="assets/icon/playVideo.png" onClick={ShareScreen}/>
                                                                        </a>
                                                                        :<a className="mr-30P ">
                                                                            <img src="assets/icon/offVideo.png" onClick={ShareScreen}/>
                                                                        </a>
                                                                }
                                                            </div>  </div>
                                                        <div className="col-md-6">
                                                            <div className="vid-mic-On-off">
                                                                {callAccepted && !callEnded ? (
                                                                    <button  className="btn btn-primary" variant="contained" color="secondary"  onClick={leaveCall} >
                                                                        Leave
                                                                    </button>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>  </div>

                                                    </div>
                                                </div>

                                            )}
                                        </div>

                                    </div></div>
                                    <div className="col-md-9">    <div className="caller-user-Vid">
                                        {callAccepted && !callEnded && (
                                            <div >
                                                <h5 >{call.name || ''}</h5>
                                                <div className="caller-user-Vid-pan">
                                                    <video playsInline ref={userVideo} autoPlay width={900} height={500}/>
                                                </div>
                                            </div>
                                        )}
                                    </div></div>


                                    {call.isReceivingCall && !callAccepted && (
                                        callReciever()
                                    )}

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