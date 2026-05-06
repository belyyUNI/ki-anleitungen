---
title: "4x-Upscaling mit Upscale Model"
description: "Bilder auf 4-fache Auflosung skalieren mit ESRGAN-Upscaler. 1024px → 4096px ohne Qualitatsverlust."
category: "upscaling"
difficulty: "fortgeschritten"
comfyuiVersion: "aktuell"
requiredNodes: []
requiredModels: ["SDXL-Checkpoint", "4x-Ultrasharp Upscaler"]
tags: ["upscaling", "4x", "esrgan", "hochauflosend"]
publishedAt: 2025-05-04
featured: false
---

Hochwertiges Upscaling mit einem ESRGAN-Upscale-Model. Generiert zuerst ein Basisbild und skaliert es dann auf die 4-fache Groae - ideal fur druckbare Ergebnisse.

## Benotigte Nodes

- `CheckpointLoaderSimple`
- `CLIPTextEncode` (2x)
- `KSampler`
- `UpscaleModelLoader`
- `ImageUpscaleWithModel`
- `SaveImage`

## Benotigte Modelle

- SDXL-Checkpoint in `models/checkpoints/`
- 4x-Ultrasharp Upscaler (`4x-Ultrasharp.pth`) in `models/upscale_models/`

## Schritte

1. Basis-Workflow mit Checkpoint und KSampler aufbauen
2. `VAEDecode` fur das Basisbild
3. `UpscaleModelLoader` → `ImageUpscaleWithModel` zwischen VAE-Decode und SaveImage
4. Upscaler `4x-Ultrasharp` auswahlen
5. Prompt fur 1024x1024 optimieren, dann auf 4096x4096 hochskalieren

## Upscaler herunterladen

```bash
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/upscale_models
wget -c --show-progress \
  -O /data/pool/m4z-d1t/comfyui-project/models/upscale_models/4x-Ultrasharp.pth \
  "https://huggingface.co/lokCX/4x-Ultrasharp/resolve/main/4x-Ultrasharp.pth"
```

## Tipps

- Erste Generation in 1024x1024 (SDXL-nativ)
- Erst dann hochskalieren - spart VRAM und Zeit
- Alternative: `UltimateSDUpscale`-Custom-Node fur KI-gestutztes Upscaling
