import { Application } from "express";
export declare class SocketServer {
    private readonly app;
    private readonly httpServer;
    private readonly io;
    constructor(app: Application);
    private setupListeners;
}
