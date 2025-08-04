import { type Socket } from "socket.io-client";
export type ServerToClientEvents = {
    pong: (data: {
        time: number;
    }) => void;
};
export type ClientToServerEvents = {
    ping: (data: {
        time: number;
    }) => void;
    hello: (data: {
        name: string;
    }) => void;
};
export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
