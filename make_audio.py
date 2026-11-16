# 게임 음성(MP3) 생성: python make_audio.py  (edge-tts, ko-KR-SunHiNeural)
import asyncio, json, os, edge_tts
HERE = os.path.dirname(os.path.abspath(__file__))
VOICE, RATE, PITCH = "ko-KR-SunHiNeural", "-8%", "+4Hz"
lines = json.load(open(os.path.join(HERE, "lines.json"), encoding="utf-8"))
async def one(k, t):
    p = os.path.join(HERE, "audio", k + ".mp3")
    if not os.path.exists(p):
        await edge_tts.Communicate(t, VOICE, rate=RATE, pitch=PITCH).save(p)
async def main():
    for i in range(0, len(lines), 8):
        await asyncio.gather(*[one(k, t) for k, t in list(lines.items())[i:i+8]])
asyncio.run(main()); print(len(lines), "clips")
