import { io, Socket } from "socket.io-client";

export class SocketClient {
  private socket: Socket;

  constructor(serverUrl: string, options?: Parameters<typeof io>[1]) {
    this.socket = io(serverUrl, {
      transports: ["websocket"],
      autoConnect: true,
      ...options,
    });

    this.setupListeners();
  }

  private setupListeners(): void {
    this.socket.on("connect", () => {
      console.log("🟢 Connecté au serveur socket :", this.socket.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("🔴 Déconnecté :", reason);
    });

    this.socket.on("pong", (data) => {
      console.log("📨 Reçu pong :", data);
    });
  }

  public send<T = unknown>(event: string, data: T): void {
    this.socket.emit(event, data);
  }

  public on<T = unknown>(event: string, callback: (data: T) => void): void {
    this.socket.on(event, callback);
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public connect(): void {
    this.socket.connect();
  }

  public getSocket(): Socket {
    return this.socket;
  }
}
