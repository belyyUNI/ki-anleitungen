---
title: "Welches Image muss ich ab jetzt fur ComfyUI benutzen?"
description: "Neues Standard-Image: comfyui-custom-torch271 statt comfyui-custom – was du beim docker run beachten musst."
difficulty: "fortgeschritten"
topic: "comfyui"
tags: ["docker", "image", "run", "pytorch", "comfyui"]
publishedAt: 2025-05-02
featured: false
readingTimeMinutes: 4
---

## Frage

Welches Image muss ich ab jetzt fur ComfyUI benutzen?

## Kurze Antwort

Bei neuen `docker run`-Befehlen muss am Ende stehen:

```bash
comfyui-custom-torch271
```

Nicht mehr:

```bash
comfyui-custom
```

Das alte Image ist veraltet und enthalt PyTorch < 2.7.1.

## Erklarung

Nach der Erstellung des neuen Images gibt es jetzt **zwei Images**:

| Image | PyTorch | Status |
|-------|---------|--------|
| `comfyui-custom` | < 2.7.1 | Veraltet |
| `comfyui-custom-torch271` | 2.7.1 | **Aktuell** |

Nur das neue Image enthalt PyTorch 2.7.1 mit `fp16 accumulation`. Wenn du aus Versehen das alte Image verwendest, kommen die gleichen Fehler wieder.

**Wichtig fur bestehende Container**: Ein bereits laufender Container behalt sein ursprungliches Image. Nur bei `docker rm` + `docker run` musst du das neue Image angeben.

## Schritt-fur-Schritt: Mit dem neuen Image arbeiten

1. Prufen, welche Images verfugbar sind:
   ```bash
   sudo docker images | grep comfyui
   ```

2. Bei einem neuen `docker run` das neue Image verwenden:
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

3. Prufen, ob das Image im Container aktiv ist:
   ```bash
   sudo docker exec comfyui_data python3 -c "import torch; print(torch.__version__)"
   ```

## Typische Fehler

- **Fehler**: Aus Gewohnheit `comfyui-custom` verwendet
  - **Folge**: Alte PyTorch-Version, `fp16 accumulation`-Fehler tauchen wieder auf.
  - **Losung**: Container loschen und mit korrektem Image neu erstellen.

- **Fehler**: `Unable to find image 'comfyui-custom-torch271' locally`
  - **Ursache**: Image existiert nicht (noch nicht committed oder falscher Name).
  - **Losung**: Mit `sudo docker images` verfugbare Images prufen.

## Merksatz

Immer `comfyui-custom-torch271` am Ende des `docker run`. Das alte `comfyui-custom` ist Geschichte.
