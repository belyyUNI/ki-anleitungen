---
title: "Wie erkenne ich kaputte oder unvollstandige Downloads?"
description: "So prufst du, ob ein Modell vollstandig heruntergeladen wurde – Dateigrossen, wget -c und typische Download-Fehler."
difficulty: "anfanger"
topic: "modelle"
tags: ["downloads", "modelle", "wget", "dateiprufung", "huggingface", "einsteiger"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 6
---

## Frage

Wie finde ich heraus, ob ein Modell vollstandig heruntergeladen wurde?

## Kurze Antwort

Man pruft die Dateigrosse mit `ls -lh` und vergleicht sie mit der erwarteten Grosse auf Hugging Face oder im Workflow. 0-Byte-Dateien, ungewohnlich kleine Dateien oder abgebrochene Downloads sind verdachtig.

## Erklarung

Modell-Downloads konnen aus vielen Grunden fehlschlagen: Netzwerkprobleme, Server-Timeouts, abgebrochene SSH-Verbindungen. Ein unvollstandiger Download sieht aus wie eine normale Datei, ist aber funktional wertlos und fuhrt zu kryptischen Fehlermeldungen in ComfyUI.

### Typische Anzeichen fur kaputte Downloads

- **0-Byte-Datei**: Der Download wurde gestartet, aber es wurde kein einziges Byte geschrieben. Die Datei existiert, ist aber leer.
- **Deutlich zu kleine Datei**: Das Modell sollte 5 GB gross sein, ist aber nur 300 MB. Der Download wurde abgebrochen.
- **Fehlermeldung beim Laden**: ComfyUI meldet `EOFError`, `TruncatedFileError` oder `Failed to load model`.

### Warum `wget -c` so wichtig ist

`wget -c` (continue) setzt abgebrochene Downloads fort, statt von vorne zu beginnen. Ohne `-c` wurde ein neuer Download die alte, unvollstandige Datei uberschreiben – man verliert den bereits heruntergeladenen Teil und muss von vorne anfangen.

## Schritt-fur-Schritt: Download prufen

1. **Dateigrosse anzeigen:**
   ```bash
   ls -lh /data/pool/m4z-d1t/comfyui-project/models/diffusion_models/modellname.safetensors
   ```

2. **Mit erwarteter Grosse vergleichen.** Auf Hugging Face oder CivitAI steht die Dateigrosse meist neben dem Dateinamen.

3. **0-Byte-Dateien finden:**
   ```bash
   find /data/pool/m4z-d1t/comfyui-project/models -type f -size 0
   ```

4. **Alle 0-Byte-Dateien loschen:**
   ```bash
   find /data/pool/m4z-d1t/comfyui-project/models -type f -size 0 -delete
   ```

5. **Download mit `-c` wiederholen:**
   ```bash
   wget -c --show-progress -O /pfad/zur/datei.safetensors "DIREKTER_LINK"
   ```

## Wichtige Befehle

```bash
# Dateigrosse lesbar anzeigen
ls -lh /pfad/zur/datei

# Alle 0-Byte-Dateien in models/ finden
find /data/pool/m4z-d1t/comfyui-project/models -type f -size 0

# Dateien kleiner als 1 MB finden (verdachtig fur Modelle)
find /data/pool/m4z-d1t/comfyui-project/models -type f -size -1M

# Download mit Fortsetzung
wget -c --show-progress -O zielpfad "LINK"

# Download mit HF-Token und Fortsetzung
wget --header="Authorization: Bearer HF_TOKEN" -c --show-progress -O zielpfad "LINK"
```

## Typische Fehler

- **Fehler**: Bei `416 Requested Range Not Satisfiable` denken, dass der Link kaputt ist.
  - **Bedeutung**: Die Datei ist bereits vollstandig heruntergeladen. `wget -c` fragt den Server, ob es ab der aktuellen Grosse weitergehen kann. Wenn die Datei schon komplett ist, antwortet der Server mit 416.
  - **Losung**: Die Datei ist fertig. Einfach mit `ls -lh` die Grosse prufen.

- **Fehler**: Einen abgebrochenen Download nicht erkennen und den Workflow trotzdem starten.
  - **Folge**: `Failed to load model` oder `EOFError` in ComfyUI.
  - **Losung**: Immer `ls -lh` nach dem Download ausfuhren.

- **Fehler**: `wget` ohne `-c` verwenden und bei einem Abbruch von vorne anfangen mussen.
  - **Losung**: `wget -c --show-progress` als Standard verwenden.

## Merksatz

Nicht jeder rote oder ungewohnliche Terminaltext ist ein Problem. Entscheidend ist, ob die Datei vollstandig und plausibel gross ist.
