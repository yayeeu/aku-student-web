// Configure once
const HEADTTS_URL = import.meta.env.VITE_HEADTTS_URL || "http://localhost:8882";

type SynthesizeResponse = {
  audio: string;                 // base64 WAV
  visemes: string[];             // e.g., ["aa","E","I","O","U","PP","SS","TH","CH","FF","kk","nn","RR","DD","sil"]
  vtimes: number[];              // ms from start
  vdurations: number[];          // ms durations
  words?: string[];
  wtimes?: number[];
  wdurations?: number[];
  audioEncoding?: "wav" | "pcm";
  sampleRate?: number;
};

export async function synthesizeHeadTTS(input: string, opts?: {
  voice?: string;
  language?: string;
  speed?: number;
  audioEncoding?: "wav" | "pcm";
}) {
  const body = {
    input,
    voice: opts?.voice ?? "af_bella",
    language: opts?.language ?? "en-us",
    speed: opts?.speed ?? 1,
    audioEncoding: opts?.audioEncoding ?? "wav"
  };

  const res = await fetch(`${HEADTTS_URL}/v1/synthesize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`HeadTTS error: ${res.status} ${res.statusText}`);

  // If your server returns binary + sidecar JSON (multipart), switch to res.blob()/arrayBuffer().
  const json = (await res.json()) as SynthesizeResponse;

  const audioBuf = base64WavToArrayBuffer(json.audio);
  return { audioBuf, meta: json };
}

function base64WavToArrayBuffer(b64: string) {
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export async function playAudioBuffer(audioBuf: ArrayBuffer) {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const decoded = await ctx.decodeAudioData(audioBuf.slice(0)); // Safari-safe copy
  const src = ctx.createBufferSource();
  src.buffer = decoded;
  src.connect(ctx.destination);
  const t0 = ctx.currentTime + 0.06; // tiny delay to line up animation
  src.start(t0);
  return { ctx, src, t0 }; // t0 = audio start time (seconds)
}
