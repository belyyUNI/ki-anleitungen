---
name: "epiCRealism SD 1.5"
type: "checkpoint"
category: "stable-diffusion"
description: "Fotorealistischer SD-1.5-Finetune. Gut fur Portrats und Szenen, niedrigere VRAM-Anforderungen als SDXL."
source: "civitai"
downloadUrl: "https://civitai.com/models/25694/epicrealism"
fileSize: "2 GB"
vramRequirement: "4 GB"
license: "Civitai AI Model License"
tags: ["sd15", "finetune", "fotorealismus", "portrat", "checkpoint"]
publishedAt: 2025-05-04
featured: false
---

epiCRealism ist ein SD-1.5-basierter Checkpoint fur fotorealistische Ergebnisse. Durch die SD-1.5-Basis lauft er mit deutlich weniger VRAM als SDXL-Modelle.

## Wichtige Eigenschaften

- **Basis**: Stable Diffusion 1.5
- **Native Auflosung**: 512x512 (kann mit Upscaling auf 1024+ gehen)
- **VRAM**: ~4 GB bei fp16 - ideal fur GPUs mit wenig Speicher
- **Starken**: Hauttexturen, realistische Portrats

## Download

```bash
cd /data/pool/m4z-d1t/comfyui-project/models/checkpoints
wget -c --show-progress -O epicrealism_naturalSin.safetensors "DIREKTER_DOWNLOAD_LINK"
```

## Zielordner

```
models/checkpoints/
```

## Wann SD 1.5 statt SDXL?

- Wenn die GPU weniger als 8 GB VRAM hat
- Wenn du schnelle Iterationen willst (512px rendert 4x schneller als 1024px)
- Wenn du spezielle SD-1.5-LoRAs nutzen willst
