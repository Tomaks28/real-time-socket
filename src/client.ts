import { io } from "socket.io-client";

import { ClientSocket, ClientToServerEvents } from "./types.ts";

export function createSocketClient(serverUrl: string) {
  const socket: ClientSocket = io(serverUrl);

  socket.on("connect", () => {
    console.log("🟢 Connecté au serveur socket :", socket.id);
  });

  socket.on("disconnect", (reason: string) => {
    console.log("🔴 Déconnecté :", reason);
  });

  socket.on("pong", (data) => {
    console.log("📨 Reçu pong :", data);
  });

  function send<E extends keyof ClientToServerEvents>(
    event: E,
    ...args: Parameters<ClientToServerEvents[E]>
  ): void {
    socket.emit(event, ...args);
  }

  return {
    socket,
    send,
    disconnect: () => socket.disconnect(),
    connect: () => socket.connect(),
  };
}
