import * as express from 'express';
import * as cors from 'cors';
import axios from 'axios';
export class App {
    public readonly app: express.Application;
    public readonly port: number;
    public readonly redirect_uri: string;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.redirect_uri = 'http://localhost:300/callback';
    }

    public initialize() {
        // cors
        this.app.use(cors({
            credentials: true,
            origin: [
                "http://localhost:5173",
            ],
            preflightContinue: true,
        }));

        this.app.use(express.json());

        /// get playlist route
        this.app.get('/token' , async (req, res) => {
            try {
                let result = await axios.post('https://accounts.spotify.com/api/token',{}, {
                    headers: {
                        "Authorization": "Basic " + btoa(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).split("=").join(""),
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    params: {
                        grant_type: 'client_credentials',
                    }
                })

                res.json({
                    token: result.data.access_token,
                })
            } catch (e) {
                res.json(btoa(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET));
            }
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on:  http://localhost:${this.port}`);
        });
    }
}

export default App;
