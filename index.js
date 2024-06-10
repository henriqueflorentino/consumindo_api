const { createApp } = Vue;

createApp({
    data() {
        return {
            albums: [],
            albumTracks: [],
            selectedAlbum: null,
            searchText: '',
            showSearch: false,
            loading: false
        };
    },
    computed: {
        filteredAlbums() {
            return this.albums.filter(album =>
                album.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                album.artist.name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }
    },
    methods: {
        async fetchAlbums() {
            this.loading = true;
            const apiKey = '43EC814E3419631DDAFF97CA5FF26BC0'; // 
            const artist = 'Pink Floyd'; 
            const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${apiKey}&format=json`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                this.albums = data.topalbums.album;
                this.showSearch = true;
            } catch (error) {
                console.error('Error fetching albums:', error);
            } finally {
                this.loading = false;
            }
        },
        async fetchAlbumTracks(album) {
            const apiKey = '43EC814E3419631DDAFF97CA5FF26BC0'; 
            const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${album.artist.name}&album=${album.name}&api_key=${apiKey}&format=json`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                this.albumTracks = data.album.tracks.track;
                this.selectedAlbum = album;
            } catch (error) {
                console.error('Error fetching album tracks:', error);
            }
        }
    }
}).mount("#app");
