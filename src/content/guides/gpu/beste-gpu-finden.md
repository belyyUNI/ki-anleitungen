---
title: "Wie finde ich die beste GPU fur einen Run?"
description: "Mit nvidia-smi die GPU mit dem meisten freien Speicher und der geringsten Auslastung auswahlen."
difficulty: "fortgeschritten"
topic: "gpu"
tags: ["gpu", "nvidia-smi", "auswahl", "optimierung", "vram"]
publishedAt: 2025-05-02
featured: false
readingTimeMinutes: 4
---

## Frage

Welche GPU sollte ich fur meinen nachsten Run auswahlen?

## Kurze Antwort

Mit `nvidia-smi` die GPU suchen, die moglichst wenig Speicher belegt hat und wenig ausgelastet ist. Dann den Container mit dieser GPU starten.

## Erklarung

Auf einem DGX-Server mit mehreren GPUs teilen sich verschiedene Nutzer die Karten. Eine GPU kann "voll" sein, wahrend die nachste fast leer ist. Deshalb lohnt es sich, vor jedem Run kurz zu prufen.

Worauf du achten solltest, in dieser Reihenfolge:

1. **Freier VRAM**: Die wichtigste Kennzahl. Eine GPU mit 20 GB frei ist besser als eine mit 8 GB frei.
2. **GPU-Util**: Wenn eine GPU schon bei 95 % Auslastung lauft, wird dein Workflow zusatzlich belasten.
3. **Laufende Prozesse**: `nvidia-smi` zeigt unten, welche Prozesse auf welcher GPU laufen.

## Schritt-fur-Schritt: GPU auswahlen

1. Alle GPUs anzeigen:
   ```bash
   nvidia-smi
   ```

2. Die Zeilen interpretieren:
   ```text
   | 0  N/A  N/A    12345      C   python3    20000MiB |
   | 1  N/A  N/A        0                         0MiB |
   | 5  N/A  N/A    12346      C   python3     5000MiB |
   ```

   - GPU 0: 20 GB belegt (von 24) – eher voll
   - GPU 1: 0 MB belegt, kein Prozess – **ideal**
   - GPU 5: 5 GB belegt – auch gut, genug frei

3. Die beste GPU auswahlen (hier: GPU 1, weil komplett frei).

4. Container mit dieser GPU starten:
   ```bash
   sudo docker stop comfyui_data
   sudo docker rm comfyui_data
   sudo docker run -d \
     --name comfyui_data \
     --gpus '"device=1"' \
     -p 8188:8188 \
     -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
     -v /data/pool/m4z-d1t/comfyui-project/output:/app/output \
     -v /data/pool/m4z-d1t/comfyui-project/custom_nodes:/app/custom_nodes \
     -v /data/pool/m4z-d1t/comfyui-project/workflows:/app/user \
     comfyui-custom-torch271
   ```

5. Prufen, ob der Container die richtige GPU sieht:
   ```bash
   sudo docker exec comfyui_data nvidia-smi
   ```

## Wichtige Befehle

```bash
# Alle GPUs ubersichtlich
nvidia-smi

# Nur eine bestimmte GPU
nvidia-smi -i 5

# Live-Ansicht (aktualisiert jede Sekunde)
watch -n 1 nvidia-smi
```

## Merksatz

Vor jedem Run: `nvidia-smi` → GPU mit dem meisten freien Speicher suchen → Container mit dieser GPU starten. 10 Sekunden, die OOM verhindern.
