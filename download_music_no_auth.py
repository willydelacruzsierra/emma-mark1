import sys
import os
from pytubefix import YouTube

try:
    url = "https://www.youtube.com/watch?v=cPkXeWww0U8"
    yt = YouTube(url, use_oauth=False, allow_oauth_cache=False)
    audio = yt.streams.get_audio_only()
    out_file = audio.download(output_path=".")
    
    target_file = "love_and_happiness.mp3"
    if os.path.exists(target_file):
        os.remove(target_file)
    os.rename(out_file, target_file)
    print("Download complete: " + target_file)
except Exception as e:
    print("Error:", e)
    sys.exit(1)
