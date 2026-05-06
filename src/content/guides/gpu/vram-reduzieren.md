---
title: "Wie reduziere ich den VRAM-Verbrauch gegen OOM?"
description: "Konkrete Einstellungen, um torch.OutOfMemoryError zu vermeiden – von Batch Size uber Auflosung bis LoRAs."
difficulty: "fortgeschritten"
topic: "gpu"
tags: ["oom", "vram", "optimierung", "batch-size", "gpu", "torch"]
publishedAt: 2025-05-02
featured: false
readingTimeMinutes: 5
---

## Frage

Welche Einstellungen helfen gegen OOM?

## Kurze Antwort

Die wichtigsten Stellschrauben:

- Batch Size auf 1
- Auflosung senken
- Weniger Frames
- Weniger Steps
- Weniger LoRAs
- Kleinere Modellvariante nutzen
- Freie GPU auswahlen

## Erklarung

Jede dieser Einstellungen beeinflusst den VRAM-Verbrauch unterschiedlich stark:

| Einstellung | VRAM-Effekt | Qualitatsverlust? |
|---|---|---|
| Batch Size 1 statt 4 | **Sehr hoch** (÷4) | Nein |
| Auflosung halbieren | **Hoch** (÷4) | Ja |
| Weniger Frames | **Hoch** (linear) | Workflow-spezifisch |
| Steps von 30 auf 20 | Gering | Kaum |
| 2 LoRAs statt 4 | Mittel | Workflow-spezifisch |
| fp16-Modell statt fp32 | **Hoch** (÷2) | Minimal |

Die fett markierten haben den groaten Effekt. Fang mit Batch Size = 1 an – das kostet keine Qualitat, spart aber am meisten VRAM.

## Schritt-fur-Schritt: VRAM systematisch reduzieren

1. **Batch Size auf 1 setzen**: Im Loader oder Sampler. Das ist der einfachste und effektivste Schritt.

2. **Kleinere Auflosung testen**: Statt 1920x1080 → 1280x720. Wenn der Workflow dann lauft, weiat du, dass die Auflosung das Problem war.

3. **Weniger Frames**: Bei Video-Workflows: Statt 120 Frames → 60 oder 30.

4. **LoRAs reduzieren**: Jedes LoRA braucht extra VRAM. Nur die notigen laden.

5. **Kleinere Modellvariante**: Statt dem 7B-Modell das 3B-Modell nutzen, falls verfugbar.

6. **Steps reduzieren**: Von 30 auf 20 Steps – optisch kaum ein Unterschied, aber weniger VRAM-Spitzen.

7. **Freie GPU suchen**:
   ```bash
   nvidia-smi
   ```
   Die GPU mit dem meisten freien Speicher auswahlen.

## Wichtige Befehle

```bash
# GPU-Status vor dem Run prufen
nvidia-smi

# GPU-Status live beobachten
watch -n 1 nvidia-smi

# Container mit anderer GPU neu starten
sudo docker stop comfyui_data
sudo docker rm comfyui_data
sudo docker run -d --name comfyui_data --gpus '"device=5"' ... comfyui-custom-torch271
```

## Merksatz

OOM-Kette: Batch Size 1 → Auflosung halbieren → weniger Frames → weniger LoRAs → kleineres Modell. In dieser Reihenfolge vorgehen.
