---
title: "SDXL mit LoRA und Refiner"
description: "Erweiterter txt2img-Workflow mit LoRA-Unterstutzung. Detail-LoRA fur bessere Texturen und Details."
category: "txt2img"
difficulty: "fortgeschritten"
comfyuiVersion: "aktuell"
requiredNodes: []
requiredModels: ["SDXL-Checkpoint", "SDXL LoRA (z.B. Detail LoRA)"]
tags: ["txt2img", "sdxl", "lora", "details"]
publishedAt: 2025-05-04
featured: false
---

Erweiterter txt2img-Workflow, der einen SDXL-Checkpoint mit einer Detail-LoRA kombiniert. Das Ergebnis sind detailreichere Bilder mit besserer Textur.

## Benotigte Nodes

- `CheckpointLoaderSimple`
- `Load LoRA`
- `CLIPTextEncode` (2x)
- `KSampler`
- `VAEDecode`
- `SaveImage`

## Benotigte Modelle

- 1 SDXL-Checkpoint in `models/checkpoints/`
- 1 SDXL-LoRA (z.B. `add_detail_sdxl.safetensors`) in `models/loras/`

## Schritte

1. Checkpoint auswahlen
2. `Load LoRA`-Node zwischen Checkpoint und CLIP/KSampler einfugen
3. LoRA-Datei auswahlen, Starke auf 0.4 setzen
4. Positives Prompt: "cinematic portrait of a woman, natural lighting, 8k, highly detailed skin texture, professional photography"
5. Negatives Prompt: "blurry, painting, illustration, plastic skin, oversaturated"
6. Steps: 30, CFG: 6, Batch: 1

## Tipps

- LoRA-Starke 0.3-0.5: subtil, naturlich
- LoRA-Starke 0.6-0.8: starker Effekt, kann ubertrieben wirken
- Verschiedene LoRAs lassen sich in Reihe schalten
