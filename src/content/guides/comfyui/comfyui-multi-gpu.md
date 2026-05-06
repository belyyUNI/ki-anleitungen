---
title: "Wie starte ich ComfyUI mit mehreren GPUs?"
description: "Mehrere GPUs fur den Container sichtbar machen – und warum das nicht automatisch mehr VRAM bedeutet."
difficulty: "fortgeschritten"
topic: "comfyui"
tags: ["comfyui", "gpu", "multi-gpu", "docker", "vram"]
publishedAt: 2025-02-16
featured: false
readingTimeMinutes: 6
---

## Frage

Wie mache ich mehrere GPUs fur den Container sichtbar?

## Kurze Antwort

```bash
--gpus '"device=0,2,5"'
```

Beispiel mit allen Parametern:

```bash
sudo docker run -d \
  --name comfyui_data \
  --gpus '"device=0,2,5"' \
  -p 8188:8188 \
  -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
  -v /data/pool/m4z-d1t/comfyui-project/output:/app/output \
  -v /data/pool/m4z-d1t/comfyui-project/custom_nodes:/app/custom_nodes \
  -v /data/pool/m4z-d1t/comfyui-project/workflows:/app/user \
  comfyui-custom-torch271
```

Wichtig: Mehr sichtbare GPUs bedeuten **nicht automatisch**, dass ein einzelner Workflow den VRAM aller Karten kombiniert.

## Erklarung

Mit `--gpus '"device=0,2,5"'` machst du die GPUs 0, 2 und 5 im Container sichtbar. ComfyUI kann dann grundsatzlich alle drei ansprechen.

### Was Multi-GPU bringt

- **Mehrere Workloads parallel**: Du kannst einen Workflow auf GPU 0 laufen lassen und einen anderen auf GPU 2
- **Flexibilitat**: ComfyUI erkennt mehrere GPUs in der Auswahlliste
- **Ausweichoption**: Falls eine GPU belegt ist, kannst du auf eine andere ausweichen

### Was Multi-GPU NICHT bringt

- **Kein automatisches VRAM-Pooling**: Ein einzelner Workflow kombiniert nicht den Speicher mehrerer GPUs
- **Kein automatisches Load-Balancing**: ComfyUI verteilt einen Workflow nicht selbststandig auf mehrere Karten
- **Keine magische OOM-Losung**: Wenn ein Modell 12 GB braucht, hilft auch eine zweite GPU mit 8 GB nicht

### Warum ist das so?

Die meisten ComfyUI-Workflows und Custom Nodes nutzen standardmaBig **eine GPU**. Die Berechnung findet auf einer Karte statt. Multi-GPU-Training oder echtes verteiltes Rechnen ist in ComfyUI die Ausnahme, nicht die Regel.

## Schritt-fur-Schritt: Mit mehreren GPUs starten

1. Verfugbare GPUs prufen:
   ```bash
   nvidia-smi
   ```

2. Gewunschte GPUs auswahlen (z. B. 0, 2, 5).

3. Bestehenden Container stoppen und loschen:
   ```bash
   sudo docker stop comfyui_data
   sudo docker rm comfyui_data
   ```

4. Mit mehreren GPUs neu erstellen:
   ```bash
   sudo docker run -d \
     --name comfyui_data \
     --gpus '"device=0,2,5"' \
     -p 8188:8188 \
     -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
     -v /data/pool/m4z-d1t/comfyui-project/output:/app/output \
     -v /data/pool/m4z-d1t/comfyui-project/custom_nodes:/app/custom_nodes \
     -v /data/pool/m4z-d1t/comfyui-project/workflows:/app/user \
     comfyui-custom-torch271
   ```

5. Prufen, ob alle GPUs sichtbar sind:
   ```bash
   sudo docker exec comfyui_data nvidia-smi
   ```

## Wichtige Befehle

```bash
# Nur eine GPU:
--gpus '"device=5"'

# Mehrere ausgewahlte GPUs:
--gpus '"device=0,2,5"'

# Alle GPUs des Servers:
--gpus all

# GPUs im Container prufen:
sudo docker exec comfyui_data nvidia-smi -L
```

## Merksatz

Multi-GPU macht GPUs sichtbar, aber nicht kombinierbar. Fur OOM-Probleme hilft nur eine freiere GPU, nicht mehrere halbvolle.
