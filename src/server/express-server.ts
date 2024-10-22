import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import routes from "@/routes";

export class ExpressServer {
	private app: Application;

	constructor() {
		this.app = express();
		this.setupMiddleware();
		this.setupRoutes();
	}

	private setupMiddleware() {
		const corsOptions = {
			origin: "http://inventory.test/", // Replace with your actual frontend domain
			methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
			credentials: true, // Allow credentials like cookies or authorization headers
			allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Specify headers allowed in requests
			optionsSuccessStatus: 204, // Prevents failing OPTIONS requests on older browsers
		};

		this.app.use(cors(corsOptions));
		this.app.use(express.json());
	}

	private setupRoutes() {
		this.app.use("/", routes);

		this.app.all("*", (_: Request, res: Response) =>
			res.status(404).json({ error: "URL not found" }),
		);
	}

	public getApp(): Application {
		return this.app;
	}
}
