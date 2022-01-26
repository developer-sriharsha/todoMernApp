import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { getCacheObject } from "../tools/helpers";
import config from "../tools/config";
const ENDPOINT = config.BASE_URL;
const socket = socketIOClient(ENDPOINT);

export function intiateUserSocketConnection() {
  socket.emit("JoinUser", getCacheObject(config.SESSION_KEY_NAME), (error) => {
    if (error) {
      alert(error);
    }
  });
}

export function getSocketIOInstance() {
  return socket;
}
