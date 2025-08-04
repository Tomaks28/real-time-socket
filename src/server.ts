import { Application } from "express";
import { createServer, Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";

export class SocketServer {
  private readonly app: Application;
  private readonly httpServer: HTTPServer;
  private readonly io: Server;

  constructor(app: Application) {
    this.app = app;
    this.httpServer = createServer(this.app);

    this.io = new Server(this.httpServer);

    this.setupListeners();
  }

  private setupListeners(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log(`✅ Client connecté : ${socket.id}`);

      socket.on("ping", (data) => {
        console.log("📩 Reçu : ping", data);
        socket.emit("pong", { received: true });
      });

      socket.on("disconnect", (reason) => {
        console.log(`❌ Déconnecté : ${socket.id}, raison : ${reason}`);
      });
    });
  }
}
