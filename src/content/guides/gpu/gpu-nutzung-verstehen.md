---
title: "GPU-Nutzung verstehen – nvidia-smi, Auslastung und GPU-Auswahl"
description: "Wie du nvidia-smi liest, die richtige GPU auswahlst, und warum mehrere sichtbare GPUs nicht automatisch mehr VRAM bedeuten."
difficulty: "fortgeschritten"
topic: "gpu"
tags: ["gpu", "nvidia-smi", "vram", "cuda", "auslastung", "multi-gpu"]
publishedAt: 2025-02-01
featured: true
readingTimeMinutes: 14
---

## nvidia-smi – der GPU-Taskmanager

`nvidia-smi` (NVIDIA System Management Interface) ist das wichtigste Werkzeug, um zu sehen, was auf den GPUs des Servers passiert.

```bash
nvidia-smi
```

Die Ausgabe zeigt pro GPU:

| Spalte | Bedeutung |
|--------|-----------|
| GPU | Nummer der GPU (0, 1, 2, ...) |
| Name | Modell (z.B. "NVIDIA A100") |
| Temp | Temperatur in °C |
| Memory-Usage | Belegter / gesamter VRAM |
| GPU-Util | GPU-Auslastung in % |
| Processes | Welche Prozesse die GPU nutzen |

## Die am wenigsten belastete GPU finden

Schau in der `Memory-Usage`-Spalte nach der GPU mit dem niedrigsten belegten Wert. Beispiel:

```
GPU 0: 35000MiB / 81920MiB  →  belegt, ~43%
GPU 1:   200MiB / 81920MiB  →  fast frei
GPU 2:  1500MiB / 81920MiB  →  wenig belegt
GPU 3: 78000MiB / 81920MiB  →  fast voll
```

Hier ware GPU 1 die beste Wahl.

## Wie du eine GPU im Docker-Befehl auswahlst

```bash
# Nur GPU 1:
--gpus '"device=1"'

# GPU 1 und 2:
--gpus '"device=1,2"'

# Alle GPUs (nicht empfohlen):
--gpus all
```

## Mehrere sichtbare GPUs heiat nicht mehr VRAM

Das ist einer der haufigsten Denkfehler:

> Wenn du `--gpus '"device=0,1"'` setzt, siehst du beide GPUs – aber ein einzelner Modell-Durchlauf (Inference) beansprucht **nur eine GPU**. Die 80 GB VRAM von GPU 0 und die 80 GB von GPU 1 werden **nicht addiert**.

**Warum?** Die meisten Modelle (SDXL, Flux, LLaMA) sind nicht automatisch auf Multi-GPU ausgelegt. Sie laden auf eine GPU und nutzen deren VRAM.

Mehrere GPUs helfen nur, wenn:
- Du mehrere Workflows **parallel** auf verschiedenen GPUs laufen lasst
- Die Software explizit **Model Parallelism** unterstutzt (z.B. groae LLMs mit Tensor-Parallelism)
- Du VRAM-intensive Aufgaben auf verschiedene GPUs verteilst

## GPU sichtbar vs. GPU aktiv genutzt

- **Sichtbar**: Die GPU ist im Container per `nvidia-smi` gelistet
- **Aktiv genutzt**: Ein Prozess fuhrt tatsachlich Berechnungen auf dieser GPU aus

Du kannst 4 GPUs sichtbar machen (`--gpus all`) – aber wenn ComfyUI nur auf einer rechnet, bleiben die anderen drei im Leerlauf.

Prunfung:
```bash
# Im Container:
nvidia-smi
# Schau in die Processes-Spalte: Nur bei der aktiven GPU steht ein Prozess.
```

## VRAM-Optimierung bei OOM-Fehlern

Wenn du `torch.OutOfMemoryError` bekommst, helfen diese Manahmen **in dieser Reihenfolge**:

1. **Auflosung reduzieren**: Statt 1024x1024 → 768x768 oder 512x512
2. **Batch-Size auf 1**: Im Workflow `batch_size` auf 1 setzen
3. **Weniger Frames** bei Video-Workflows: 16 statt 32 Frames
4. **Weniger LoRAs gleichzeitig**: Jeder geladene LoRA braucht zusatzlichen VRAM
5. **GPU mit mehr freiem VRAM wahlen**: Nicht die Standard-GPU 0, sondern die leerste nehmen
6. **Modell-Offloading**: Einige Nodes konnen Teile des Modells auf die CPU auslagern (langsamer, aber spart VRAM)

> **Merksatz**: Mehr sichtbare GPUs heiat nicht automatisch mehr VRAM fur einen einzelnen Run. Such dir die leerste GPU aus und bleib bei einer.
