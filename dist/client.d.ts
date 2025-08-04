import { ClientSocket, ClientToServerEvents } from "./types.ts";
export declare function createSocketClient(serverUrl: string): {
    socket: ClientSocket;
    send: <E extends keyof ClientToServerEvents>(event: E, ...args: Parameters<ClientToServerEvents[E]>) => void;
    disconnect: () => ClientSocket;
    connect: () => ClientSocket;
};
