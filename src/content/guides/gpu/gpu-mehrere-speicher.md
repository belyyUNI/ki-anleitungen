---
title: "Warum bringt mehr GPUs nicht automatisch mehr Speicher?"
description: "Das Missverstandnis der Multi-GPU-Konfiguration: Warum OOM bleibt, auch wenn mehrere GPUs sichtbar sind."
difficulty: "fortgeschritten"
topic: "gpu"
tags: ["gpu", "multi-gpu", "vram", "oom", "speicher"]
publishedAt: 2025-02-22
featured: false
readingTimeMinutes: 6
---

## Frage

Warum bekomme ich OOM, obwohl ich mehrere GPUs ausgewahlt habe?

## Kurze Antwort

Docker macht GPUs nur **sichtbar**. ComfyUI verteilt ein Modell **nicht automatisch** auf mehrere GPUs. Viele Workflows rechnen praktisch auf einer Haupt-GPU. Deshalb kann eine GPU voll laufen, obwohl andere sichtbar sind.

## Erklarung

### Das Missverstandnis

Viele denken: "Ich habe GPU 0 (24 GB) + GPU 2 (24 GB) = 48 GB VRAM." Das stimmt so **nicht** fur die meisten ComfyUI-Workflows.

### Die Realitat

- **Docker** macht mehrere GPUs fur den Container sichtbar (`--gpus '"device=0,2"'`).
- **ComfyUI** kann diese GPUs sehen und in der Auswahlliste anzeigen.
- **ABER**: Wenn ein Workflow gestartet wird, rechnet er standardmaBig auf **einer** GPU.
- Ein Checkpoint (z. B. Flux mit 12 GB) wird komplett in den VRAM **einer** GPU geladen.
- Die zweite GPU sitzt daneben und tut nichts.

### Wann Multi-GPU tatsachlich hilft

- **Mehrere Workflows parallel**: Workflow A auf GPU 0, Workflow B auf GPU 2
- **Manuelle Verteilung**: Einige Custom Nodes unterstutzen Multi-GPU explizit (selten)
- **Training**: Beim Training konnen manche Frameworks GPUs kombinieren – das ist aber ein anderes Thema

### Warum kein automatisches Pooling?

VRAM-Pooling uber mehrere GPUs ist technisch sehr komplex. Die Daten mussten uber den PCIe-Bus zwischen den Karten hin- und hergeschoben werden, was viel langsamer ist als lokaler VRAM-Zugriff. NVIDIA bietet dafur Technologien wie NVLink, aber ComfyUI und die meisten Inferenz-Workflows nutzen das nicht.

## Schritt-fur-Schritt: OOM trotz Multi-GPU debuggen

1. Prufen, welche GPU tatsachlich genutzt wird:
   ```bash
   nvidia-smi
   ```
   In der Prozessliste siehst du, auf welcher GPU der Python-Prozess lauft.

2. Prufen, ob ComfyUI die anderen GPUs uberhaupt sieht:
   ```bash
   sudo docker exec comfyui_data nvidia-smi
   ```

3. VRAM-Bedarf des Modells recherchieren – reichen die z. B. 24 GB einer einzelnen Karte?

4. Wenn nicht: Eine GPU mit mehr freiem VRAM suchen oder VRAM sparen.

## Wichtige Befehle

```bash
# GPU-Belegung live beobachten
watch -n 1 nvidia-smi

# Welche GPU wird wirklich genutzt?
nvidia-smi --query-compute-apps=pid,process_name,used_memory --format=csv

# Container-GPU-Nutzung prufen
sudo docker exec comfyui_data nvidia-smi
```

## Merksatz

Mehr GPUs = mehr Platze, nicht ein groaerer Topf. VRAM wird nicht automatisch zusammengelegt.
