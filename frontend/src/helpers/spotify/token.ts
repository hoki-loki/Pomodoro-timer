class Spotify {
    constructor() {}
    public async getToken() {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                "Authorization": "Basic " + btoa(import.meta.env.VITE_SPOTIFY_CLIENT_ID + ":" + import.meta.env.SPOTIFY_CLIENT_SECRET).split("=").join(""),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: 'grant_type=client_credentials'
        })

        const data = await result.json();
        return data.access_token;

    }
}

const spotify = new Spotify()

export default spotify