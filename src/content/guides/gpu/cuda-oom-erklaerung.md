---
title: "Was bedeutet torch.OutOfMemoryError und warum lauft die GPU voll?"
description: "Warum der VRAM nicht reicht – und wieso mehrere sichtbare GPUs nicht automatisch helfen."
difficulty: "fortgeschritten"
topic: "gpu"
tags: ["oom", "out-of-memory", "vram", "gpu", "torch", "fehler"]
publishedAt: 2025-05-02
featured: false
readingTimeMinutes: 5
---

## Frage

Warum lauft die GPU voll und was bedeutet `torch.OutOfMemoryError`?

## Kurze Antwort

Der Workflow braucht mehr VRAM, als die ausgewahlte GPU frei hat. Mehr sichtbare GPUs helfen nicht automatisch, wenn der Workflow nicht wirklich verteilt rechnet.

## Erklarung

`torch.OutOfMemoryError` (kurz: OOM) bedeutet: PyTorch hat versucht, Speicher auf der GPU zu reservieren, aber es war nicht genug frei. Das passiert, wenn:

- Das Modell zu groa fur die GPU ist
- Die Batch Size oder Auflosung zu hoch ist
- Zu viele LoRAs oder ControlNets gleichzeitig geladen werden
- Ein anderer Prozess schon GPU-Speicher belegt

**Wichtig**: Mehrere GPUs mit `--gpus all` oder `--gpus '"device=0,1"'` sichtbar zu machen, verteilt die Arbeit **nicht automatisch**. Die meisten ComfyUI-Workflows rechnen nur auf einer GPU. Die anderen GPUs sind dann sichtbar, aber ungenutzt.

Wenn also GPU 0 nur 8 GB frei hat und dein Workflow 10 GB braucht, hilft es nicht, GPUs 0-3 sichtbar zu machen – der Workflow nutzt trotzdem nur GPU 0 und lauft in den OOM.

## Schritt-fur-Schritt: OOM-Diagnose

1. Vor dem Start GPU-Status prufen:
   ```bash
   nvidia-smi
   ```
   Auf `Memory-Usage` achten: Wie viel ist frei?

2. Workflow starten und warten, bis der Fehler kommt.

3. Nach dem Fehler GPU-Status erneut prufen:
   ```bash
   nvidia-smi
   ```

4. Wenn kein Speicher mehr frei ist: Workflow ist zu groa fur diese GPU.

## Typische Fehler

- **Fehler**: `torch.OutOfMemoryError: CUDA out of memory. Tried to allocate X MiB`
  - **Losung**: VRAM-Verbrauch reduzieren (siehe nachste Anleitung).

- **Irrtum**: "Ich habe doch 4 GPUs sichtbar gemacht!"
  - **Realitat**: Die meisten Workflows nutzen nur eine GPU. Mehr sichtbare GPUs != mehr Speicher.

## Merksatz

OOM = Der Workflow passt nicht in den VRAM einer einzelnen GPU. Mehr GPUs anzeigen hilft nicht, wenn der Workflow nicht verteilt rechnet.
