from flask import Flask, render_template, request
from spotify_auth import get_access_token
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

app = Flask(__name__)

# ... (rotas e funcionalidades)

@app.route('/')
def index():
    access_token = get_access_token()
    spotify = spotipy.Spotify(auth=access_token)

    results = spotify.current_user_saved_tracks(limit=50)
    tracks = results['items']
    while results['next']:
        results = spotify.next(results)
        tracks.extend(results['items'])

    # Calcular a duração média das músicas
    total_duration = 0
    for track in tracks:
        total_duration += track['track']['duration_ms']
    average_duration = total_duration / len(tracks)

    # ... (agrupar por gênero e outras análises)
    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)