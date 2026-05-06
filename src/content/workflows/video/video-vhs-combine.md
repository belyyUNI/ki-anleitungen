---
title: "Video-Generierung mit VideoHelperSuite"
description: "Bilder zu Video zusammensetzen mit VHS Video Combine. Bildsequenz als Input, MP4 als Output."
category: "video"
difficulty: "experte"
comfyuiVersion: "aktuell"
requiredNodes: ["ComfyUI-VideoHelperSuite"]
requiredModels: ["SDXL-Checkpoint"]
tags: ["video", "vhs", "videocombine", "animation"]
publishedAt: 2025-05-04
featured: false
---

Generierte Einzelbilder mit dem VHS Video Combine-Node zu einem MP4-Video zusammensetzen. Zeigt die grundlegende Video-Pipeline in ComfyUI.

## Benotigte Custom Nodes

- **ComfyUI-VideoHelperSuite** (`Kosinkadink/ComfyUI-VideoHelperSuite`)

```bash
cd /data/pool/m4z-d1t/comfyui-project/custom_nodes
git clone https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git
sudo docker exec -it comfyui_data pip install -r /app/custom_nodes/ComfyUI-VideoHelperSuite/requirements.txt
sudo docker stop comfyui_data && sudo docker start comfyui_data
```

## Benotigte Nodes

- Standard txt2img/img2img-Pipeline (Checkpoint, CLIP, KSampler, VAE)
- `VHS Video Combine` (aus VideoHelperSuite)

## Schritte

1. Batch von Bildern generieren (z.B. 60 Bilder = 2 Sekunden bei 30fps)
2. `VAEDecode`-Ausgang mit `VHS Video Combine`-Eingang verbinden
3. Im VHS-Node:
   - `frame_rate`: 30
   - `format`: `video/h264-mp4`
   - `pix_fmt`: `yuv420p`
4. Ausgabe mit `SaveImage` (VHS-spezifisch) verbinden

## Typische Fehler

- **libGL.so.1 not found**: Systembibliotheken fehlen → `apt-get install libgl1 ffmpeg`
- **ffmpeg not found**: `apt-get install ffmpeg`
- Siehe auch: "Wie behebe ich libGL.so.1- oder ffmpeg-Fehler?"

## Tipps

- Batch Size im KSampler: Anzahl der Bilder pro Batch
- 30fps = flussiges Video, 24fps = Film-Look
- Erst mit 30 Bildern testen, dann hochskalieren
