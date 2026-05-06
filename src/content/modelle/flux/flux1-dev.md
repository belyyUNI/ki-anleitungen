---
name: "FLUX.1-dev"
type: "checkpoint"
category: "flux"
description: "Black Forest Labs Text-zu-Bild-Modell. Hervorragendes Prompt-Verstandnis und Text-Rendering, hohere VRAM-Anforderungen."
source: "huggingface"
huggingfaceId: "black-forest-labs/FLUX.1-dev"
fileSize: "23 GB"
vramRequirement: "24 GB"
license: "FLUX.1-dev Non-Commercial License"
tags: ["flux", "text-rendering", "high-end", "checkpoint"]
publishedAt: 2025-05-04
featured: true
---

FLUX.1-dev von Black Forest Labs ist das leistungsfahigste offene Text-zu-Bild-Modell. Es ubertragt SDXL deutlich bei Text-Rendering und komplexen Prompts - braucht aber deutlich mehr VRAM.

## Wichtige Eigenschaften

- **Text-Rendering**: Schreibt Text korrekt in Bilder - etwas, das SDXL kaum kann
- **Prompt-Verstandnis**: Nahe an DALL-E 3 / Midjourney-Niveau
- **VRAM**: 24 GB empfohlen (fp16). Mit fp8 und --gpus mit mehreren Karten auch weniger moglich
- **Bildqualitat**: Herausragend bei fotorealistischen und kunstlerischen Ergebnissen

## Download

```bash
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/checkpoints
wget -c --show-progress \
  -O /data/pool/m4z-d1t/comfyui-project/models/checkpoints/flux1-dev.safetensors \
  "https://huggingface.co/black-forest-labs/FLUX.1-dev/resolve/main/flux1-dev.safetensors"
```

## Zielordner

```
models/checkpoints/
```

## VRAM-Tipps

Falls 24 GB zu viel sind:
- FLUX.1-schnell (kleinere Variante, ahnliche Qualitat)
- fp8-Quantisierung mit `--gpus '"device=0,1"'` (GPU-Pooling)
- ComfyUI mit `--lowvram` starten
