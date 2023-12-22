import { io, Socket } from "socket.io-client";

const token = localStorage.getItem("token");

const URL: string =
  process.env.NODE_ENV === "production"
    ? "/"
    : "http://localhost:3000";

const socket: Socket = io(URL, {
  query: { token },
});

export default socket;
