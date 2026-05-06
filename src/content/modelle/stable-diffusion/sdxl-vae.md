---
name: "SDXL VAE"
type: "vae"
category: "stable-diffusion"
description: "Separater VAE fur SDXL-Modelle. Bessere Farben und weniger Artefakte als der integrierte VAE."
source: "huggingface"
huggingfaceId: "madebyollin/sdxl-vae-fp16-fix"
fileSize: "335 MB"
vramRequirement: "minimal"
license: "MIT"
tags: ["sdxl", "vae", "qualitat", "fp16"]
publishedAt: 2025-05-04
featured: false
---

Der SDXL VAE (fp16 fix) ist die empfohlene VAE-Datei fur SDXL-Modelle. Er verbessert die Bildqualitat deutlich: sattere Farben, weniger visuelle Artefakte und bessere Details.

## Warum ein separater VAE?

SDXL-Checkpoints haben einen integrierten VAE, der funktioniert - aber nicht optimal. Der separate fp16-fix-VAE behebt bekannte Probleme:

- Ausgewaschene Farben
- Blockartefakte in dunklen Bereichen
- Rauschen in glatten Flachen

## Download

```bash
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/vae
wget -c --show-progress \
  -O /data/pool/m4z-d1t/comfyui-project/models/vae/sdxl_vae.safetensors \
  "https://huggingface.co/madebyollin/sdxl-vae-fp16-fix/resolve/main/sdxl_vae.safetensors"
```

## Zielordner

```
models/vae/
```

## Verwendung in ComfyUI

Im Workflow einen `VAELoader`-Node einfugen und mit dem `VAEDecode`-Node verbinden. Nicht vergessen: Der VAE muss zum Checkpoint passen (SDXL-VAE fur SDXL-Checkpoints).
