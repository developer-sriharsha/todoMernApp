import React, { useEffect } from 'react';
import Routes from './components/routes/Routes';
import Toaster, { toastMessage } from './components/tools/Toaster';
import { intiateUserSocketConnection, getSocketIOInstance } from './components/coreComponents/SocketIO';
import { broadCastUpdates } from './components/Redux/userActions/UserTodoAction';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    intiateUserSocketConnection();
    let socket = getSocketIOInstance();
    socket.on("Todo", (message) => {
      toastMessage(message.message, "info");
      dispatch(broadCastUpdates(true));
    });
  }, []);
  return (
    <React.Fragment>
      <Routes />
      <Toaster />
    </React.Fragment>
  );
}

export default App;
