import { Application } from "express";
import { createServer, Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket, ServerOptions } from "socket.io";

export class SocketServer {
  private readonly app: Application;
  private readonly httpServer: HTTPServer;
  private readonly io: SocketIOServer;

  constructor(app: Application, options?: Partial<ServerOptions>) {
    this.app = app;
    this.httpServer = createServer(this.app);

    this.io = new SocketIOServer(this.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
      ...options,
    });

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

  /**
   * Démarre le serveur HTTP (Express + Socket.IO)
   */
  public listen(port: number, callback?: () => void): void {
    this.httpServer.listen(port, callback);
  }

  /**
   * Accès à l'instance de Socket.IO
   */
  public getIO(): SocketIOServer {
    return this.io;
  }

  /**
   * Accès au serveur HTTP (optionnel)
   */
  public getHttpServer(): HTTPServer {
    return this.httpServer;
  }
}
