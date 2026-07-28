import subprocess
import json


CHANNEL = "https://www.youtube.com/@ItsOnlySkillz/shorts"


result = subprocess.run(
    [
        "yt-dlp",
        "--flat-playlist",
        "--dump-json",
        "--playlist-end",
        "50",
        CHANNEL
    ],
    capture_output=True,
    text=True
)


shorts = []


for line in result.stdout.splitlines():

    try:

        video = json.loads(line)

        shorts.append({

            "title": video.get("title"),
            "id": video.get("id")

        })


    except:
        pass



with open("shorts.json","w",encoding="utf-8") as f:

    json.dump(
        shorts,
        f,
        indent=4,
        ensure_ascii=False
    )
