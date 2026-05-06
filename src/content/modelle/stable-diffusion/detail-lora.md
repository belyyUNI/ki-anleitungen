---
name: "Add More Details - Detail LoRA"
type: "lora"
category: "stable-diffusion"
description: "SDXL-LoRA fur zusatzliche Details und Textur in Bildern. Funktioniert mit allen SDXL-Checkpoints."
source: "civitai"
downloadUrl: "https://civitai.com/models/122359/detail-tweaker-lora"
fileSize: "280 MB"
vramRequirement: "+0.5 GB"
license: "Civitai AI Model License"
tags: ["sdxl", "lora", "details", "qualitat"]
publishedAt: 2025-05-04
featured: false
---

Diese LoRA fugt Bildern zusatzliche Details und Mikro-Texturen hinzu, ohne den grundlegenden Stil zu verandern. Funktioniert mit praktisch jedem SDXL-Checkpoint.

## Wichtige Eigenschaften

- **Effekt**: Fugt Hautporen, Stofftexturen, feine Oberflachendetails hinzu
- **Starke**: 0.3-0.7 (niedrigere Werte = subtiler)
- **Kompatibel mit**: Allen SDXL-Checkpoints
- **VRAM-Impact**: ~0.5 GB zusatzlich

## Download

```bash
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/loras
cd /data/pool/m4z-d1t/comfyui-project/models/loras
wget -c --show-progress -O add_detail_sdxl.safetensors "DIREKTER_DOWNLOAD_LINK"
```

## Zielordner

```
models/loras/
```

## Verwendung in ComfyUI

`Load LoRA`-Node zwischen Checkpoint-Loader und KSampler einfugen. Starke auf 0.3-0.5 fur naturliche Ergebnisse einstellen.
