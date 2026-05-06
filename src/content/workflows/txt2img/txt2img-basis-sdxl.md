---
title: "Basis txt2img mit SDXL"
description: "Einfacher Text-zu-Bild-Workflow mit SDXL-Checkpoint, CLIP-Text-Encoder und KSampler. Der Standard-Einstieg."
category: "txt2img"
difficulty: "anfanger"
comfyuiVersion: "aktuell"
requiredNodes: []
requiredModels: ["SDXL 1.0 Base (oder anderer SDXL-Checkpoint)"]
tags: ["txt2img", "sdxl", "basis", "einstieg"]
publishedAt: 2025-05-04
featured: true
---

Der einfachste txt2img-Workflow fur ComfyUI. Laden eines SDXL-Checkpoints, Prompt eingeben, Bild generieren. Das ist der Workflow, den du nach dem ersten Start von ComfyUI laden kannst.

## Benotigte Nodes

Keine Custom Nodes notig - nur ComfyUI-Standard-Nodes:
- `CheckpointLoaderSimple`
- `CLIPTextEncode` (2x: positiv + negativ)
- `KSampler`
- `VAEDecode`
- `SaveImage`

## Benotigte Modelle

- 1 SDXL-Checkpoint (z.B. `sd_xl_base_1.0.safetensors`) in `models/checkpoints/`

## Schritte

1. Workflow in ComfyUI per Drag-and-drop importieren
2. Checkpoint im `CheckpointLoaderSimple` auswahlen
3. Positives Prompt eingeben (z.B. "a beautiful sunset over mountains, 8k, detailed")
4. Negatives Prompt eingeben (z.B. "blurry, low quality, distorted")
5. Batch size: 1, Steps: 30, CFG: 7
6. "Queue Prompt" klicken

## Tipps

- SDXL versteht lange, beschreibende Prompts besser als kurze
- CFG Scale zwischen 5-8 fur die meisten Bilder
- Sampler: `dpmpp_2m` oder `euler_ancestral` fur gute Ergebnisse
- Scheduler: `karras` oder `normal`
