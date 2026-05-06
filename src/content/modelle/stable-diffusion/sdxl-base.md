---
name: "SDXL 1.0 Base"
type: "checkpoint"
category: "stable-diffusion"
description: "Das Standard-Basismodell fur hochwertige Bildgenerierung. 1024x1024 native Auflosung, sehr gute Prompt-Verstandnis."
source: "huggingface"
huggingfaceId: "stabilityai/stable-diffusion-xl-base-1.0"
fileSize: "6.9 GB"
vramRequirement: "8 GB"
license: "CreativeML Open RAIL++-M"
tags: ["sdxl", "base", "checkpoint", "1024px"]
publishedAt: 2025-05-04
featured: true
---

SDXL 1.0 Base ist das Standard-Checkpoint-Modell fur die allermeisten Workflows. Es arbeitet nativ mit 1024x1024-Pixel-Bildern und hat ein ausgezeichnetes Prompt-Verstandnis.

## Wichtige Eigenschaften

- **Native Auflosung**: 1024x1024 (nicht 512x512 wie SD 1.5)
- **Prompt-Verstandnis**: Deutlich besser als SD 1.5, besonders bei komplexen Prompts
- **VRAM**: ~8 GB bei fp16, Batch Size 1
- **Zwei Prompt-Felder**: Positives und negatives Prompt-Feld

## Download

```bash
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/checkpoints
wget -c --show-progress \
  -O /data/pool/m4z-d1t/comfyui-project/models/checkpoints/sd_xl_base_1.0.safetensors \
  "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors"
```

## Zielordner

```
models/checkpoints/
```

## Passende VAEs

SDXL braucht einen SDXL-kompatiblen VAE. Der integrierte VAE ist okay, aber fur bessere Qualitat empfiehlt sich ein separater SDXL VAE.
