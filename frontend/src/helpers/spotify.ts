export class Spotify {
    public api_url: string;
    constructor() {
        this.api_url = 'https://api.spotify.com/v1/playlist/28Sup1y1IlF8Cj4EHSqseN';
    }

    public getPlaylist() {
        return fetch(this.api_url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error(error);
            });
    }
}