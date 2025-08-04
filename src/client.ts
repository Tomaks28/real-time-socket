import { io } from "socket.io-client";

import { ClientSocket, ClientToServerEvents } from "./types.ts";

export function createSocketClient(serverUrl: string) {
  const socket: ClientSocket = io(serverUrl, {
    reconnection: true, // Activer la reconnexion automatique (true par défaut)
    reconnectionAttempts: 5, // Nombre max de tentatives (0 = infini)
    reconnectionDelay: 1000, // Délai initial avant tentative (en ms)
    reconnectionDelayMax: 5000, // Délai max entre tentatives (en ms)
    randomizationFactor: 0.5, // Variabilité du délai
    timeout: 20000, // Timeout de connexion (20s)
  });

  socket.on("connect", () => {
    console.log("🟢 Connecté au serveur socket :", socket.id);
  });

  socket.on("disconnect", (reason: string) => {
    console.log("🔴 Déconnecté :", reason);
  });

  socket.on("reconnect_attempt", (attemptNumber: number) => {
    console.log(`⏳ Tentative de reconnexion #${attemptNumber}...`);
  });

  socket.on("reconnect_error", (error: Error) => {
    console.error("❌ Erreur lors de la reconnexion :", error);
  });

  socket.on("reconnect_failed", () => {
    console.error("❌ La reconnexion a échoué après toutes les tentatives.");
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
