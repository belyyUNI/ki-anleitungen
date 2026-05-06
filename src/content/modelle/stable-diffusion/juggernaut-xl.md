---
name: "Juggernaut XL"
type: "checkpoint"
category: "stable-diffusion"
description: "Vielseitiger SDXL-Finetune mit Fokus auf fotorealistische und kunstlerische Ergebnisse. Einer der beliebtesten Community-Checkpoints."
source: "civitai"
downloadUrl: "https://civitai.com/models/133005/juggernaut-xl"
fileSize: "6.9 GB"
vramRequirement: "8 GB"
license: "Civitai AI Model License"
tags: ["sdxl", "finetune", "fotorealismus", "checkpoint"]
publishedAt: 2025-05-04
featured: true
---

Juggernaut XL ist ein SDXL-Finetune, der auf fotorealistische Ergebnisse optimiert ist, aber auch kunstlerische Styles beherrscht. Er gehort zu den meistgenutzten Community-Modellen.

## Wichtige Eigenschaften

- **Starken**: Fotorealismus, Hauttexturen, Portrats, Architektur
- **Prompt-Style**: Reagiert gut auf detaillierte, beschreibende Prompts
- **CFG Scale**: 3-7 (niedriger als SDXL Base)
- **Steps**: 25-35 reichen meist

## Download

Modell von Civitai herunterladen (kostenloser Account erforderlich):

1. Civitai-Seite aufrufen: https://civitai.com/models/133005
2. Auf "Download" klicken
3. `wget`-Befehl mit direktem Link:

```bash
cd /data/pool/m4z-d1t/comfyui-project/models/checkpoints
wget -c --show-progress -O juggernautXL_v8.safetensors "DIREKTER_DOWNLOAD_LINK"
```

## Zielordner

```
models/checkpoints/
```

## Tipps

- Funktioniert gut mit SDXL-LoRAs
- Negatives Prompt kann kurz bleiben
- Sampler: DPM++ 2M Karras oder Euler a
