---
title: "Wie starte ich ComfyUI mit einer bestimmten GPU neu?"
description: "GPU-Zuordnung andern: Container stoppen, loschen und mit neuer GPU-Nummer neu erstellen."
difficulty: "fortgeschritten"
topic: "comfyui"
tags: ["comfyui", "gpu", "docker", "run", "container"]
publishedAt: 2025-02-14
featured: false
readingTimeMinutes: 6
---

## Frage

Wie andere ich die GPU, auf der ComfyUI lauft?

## Kurze Antwort

Die GPU wird beim `docker run` festgelegt und kann nachtraglich nicht geandert werden. Deshalb muss der Container entfernt und neu erstellt werden:

```bash
sudo docker stop comfyui_data
sudo docker rm comfyui_data
sudo docker run -d \
  --name comfyui_data \
  --gpus '"device=5"' \
  -p 8188:8188 \
  -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
  -v /data/pool/m4z-d1t/comfyui-project/output:/app/output \
  -v /data/pool/m4z-d1t/comfyui-project/custom_nodes:/app/custom_nodes \
  -v /data/pool/m4z-d1t/comfyui-project/workflows:/app/user \
  comfyui-custom-torch271
```

## Erklarung

Die GPU-Zuordnung ist ein **Erstellungsparameter** des Containers. Sie wird mit `--gpus` beim `docker run` gesetzt und kann nicht durch einen einfachen Neustart geandert werden.

Warum? Docker weist die GPU beim Erstellen des Containers zu. Ein laufender Container hat einen festen Satz an GPU-Ressourcen. Um das zu andern, muss der Container neu erstellt werden.

**Wichtig**: Daten gehen dabei **nicht verloren**, weil alle wichtigen Ordner per `-v` (Volume-Mount) eingebunden sind. Die Modelle, Outputs und Workflows liegen auf dem Host in `/data/pool/`.

## Schritt-fur-Schritt: GPU wechseln

1. Vorher: Freie GPU mit `nvidia-smi` finden:
   ```bash
   nvidia-smi
   ```
   Achte auf `Memory-Usage` und `GPU-Util`. Eine GPU mit wenig belegtem Speicher ist ideal.

2. Aktuellen Container stoppen:
   ```bash
   sudo docker stop comfyui_data
   ```

3. Container loschen:
   ```bash
   sudo docker rm comfyui_data
   ```

4. Mit neuer GPU starten (hier: GPU 5):
   ```bash
   sudo docker run -d \
     --name comfyui_data \
     --gpus '"device=5"' \
     -p 8188:8188 \
     -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
     -v /data/pool/m4z-d1t/comfyui-project/output:/app/output \
     -v /data/pool/m4z-d1t/comfyui-project/custom_nodes:/app/custom_nodes \
     -v /data/pool/m4z-d1t/comfyui-project/workflows:/app/user \
     comfyui-custom-torch271
   ```

5. Prufen, ob die richtige GPU zugewiesen wurde:
   ```bash
   sudo docker logs --tail 20 comfyui_data | grep -i gpu
   ```

## Wichtige Befehle

```bash
# GPU-Limit (nur 1 GPU sichtbar):
--gpus '"device=5"'

# Mehrere spezifische GPUs:
--gpus '"device=0,2,5"'

# Alle GPUs:
--gpus all

# Prufen, welche GPUs der Container sieht:
sudo docker exec comfyui_data nvidia-smi
```

## Typische Fehler

- **Fehler**: `could not select device driver "..." with capabilities: [[gpu]]`
  - **Ursache**: GPU-Index existiert nicht oder NVIDIA Container Toolkit fehlt.
  - **Losung**: Mit `nvidia-smi` die verfugbaren GPU-Indizes prufen.

- **Fehler**: Volume-Mounts vergessen
  - **Folge**: Container hat keinen Zugriff auf Modelle, ComfyUI startet "leer".
  - **Losung**: Immer alle vier `-v`-Parameter mitgeben.

## Merksatz

GPU andern = stop + rm + run. Das ist der einzige Weg – aber Modelle und Workflows bleiben sicher in `/data/pool/`.
