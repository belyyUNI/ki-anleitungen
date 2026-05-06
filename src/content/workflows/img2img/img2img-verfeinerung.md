---
title: "img2img Bildverfeinerung mit SDXL"
description: "Bestehendes Bild mit SDXL verfeinern - Starke anpassen, Details erhalten, Stil ubertragen."
category: "img2img"
difficulty: "fortgeschritten"
comfyuiVersion: "aktuell"
requiredNodes: []
requiredModels: ["SDXL-Checkpoint"]
tags: ["img2img", "sdxl", "verfeinerung", "bild-zu-bild"]
publishedAt: 2025-05-04
featured: false
---

Klassischer img2img-Workflow: Ein bestehendes Bild laden, mit SDXL variieren und verbessern. Nutzlich fur Bildverfeinerung, Stil-Transfer oder Variationen.

## Benotigte Nodes

- `LoadImage`
- `CheckpointLoaderSimple`
- `CLIPTextEncode` (2x)
- `KSampler` (mit `denoise`-Parameter)
- `VAEDecode`
- `SaveImage`

## Benotigte Modelle

- 1 SDXL-Checkpoint in `models/checkpoints/`

## Schritte

1. Bild per Drag-and-drop in ComfyUI laden (oder `LoadImage` verwenden)
2. Checkpoint auswahlen
3. Prompt eingeben, das zum Bild und Ziel passt
4. **Denoise-Starke ist der Schlussel**:
   - `0.1-0.3`: Bild leicht verbessern, Details erhalten
   - `0.4-0.6`: Deutliche Veranderungen, Stil anpassen
   - `0.7-1.0`: Komplett neues Bild, nur grobe Komposition bleibt
5. Sampler: `euler_ancestral` fur kreative Variationen

## Tipps

- Je niedriger der Denoise-Wert, desto naher am Original
- Bei Denoise > 0.7 braucht das Prompt mehr Details
- Original-Bildgroae sollte zur nativen Checkpoint-Auflosung passen
