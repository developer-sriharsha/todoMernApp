import React, {useState, useContext, useRef, useEffect} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer from "simple-peer";
import {io} from "socket.io-client";
const socket = io.connect('http://13.127.206.171:8050' );
const VidCon = ({ children }) => {


    const [idToCall, setIdToCall] = useState('');
    const connectionRef = useRef();
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();

    useEffect(async () => {

        await  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });

        socket.on('me', (id) => {
                console.log("new id-",id)
                setMe(id)
            }

        )

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, []);
    console.log("akjfkandkjasdsadnsadn",stream,me)


    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
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
    console.log("fkjldsfjksldjfdfj",me)
    return (
        <div >
            <div  >
                {stream && (
                    <div >
                        <div >
                            <h5  >{name || 'Name'}</h5>
                            <video playsInline muted ref={myVideo} autoPlay  />
                        </div>
                    </div>
                )}
                {callAccepted && !callEnded && (
                    <div >
                        <div >
                            <h5 >{call.name || 'Name'}</h5>
                            <video playsInline ref={userVideo} autoPlay />
                        </div>
                    </div>
                )}
                {call.isReceivingCall && !callAccepted && (
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <h1>{call.name} is calling:</h1>
                        <button variant="contained" color="primary" onClick={answerCall}>
                            Answer
                        </button>
                    </div>
                )}
                <form   autoComplete="off">
                    <div  className="col-md-5">
                        <div  >
                            <h6 >Account Info</h6>
                            <input className="form-control name-input" type="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                            <CopyToClipboard text={me} >
                                <button  className="btn btn-primary" variant="contained" color="primary" >
                                    Copy Your ID
                                </button>
                            </CopyToClipboard>
                        </div>
                        <div >
                            <h6 >Make a call</h6>
                            <input className="form-control name-input" type="name" label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
                            {callAccepted && !callEnded ? (
                                <button  className="btn btn-primary" variant="contained" color="secondary"  onClick={leaveCall} >
                                    Hang Up
                                </button>
                            ) : (
                                <button  className="btn btn-primary" variant="contained" color="primary" onClick={() => callUser(idToCall)} >
                                    Call
                                </button>
                            )}
                        </div>
                    </div>
                </form>

                {children}
            </div>
        </div>
    );
};

export default VidCon;