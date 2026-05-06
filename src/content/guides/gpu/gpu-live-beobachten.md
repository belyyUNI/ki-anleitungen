---
title: "Wie beobachte ich GPUs live?"
description: "GPU-Auslastung in Echtzeit uberwachen – mit watch, gezielten GPU-Filtern und Log-Ausgaben."
difficulty: "anfanger"
topic: "gpu"
tags: ["gpu", "monitoring", "watch", "nvidia-smi", "live"]
publishedAt: 2025-02-24
featured: false
readingTimeMinutes: 5
---

## Frage

Wie sehe ich live, ob eine GPU arbeitet?

## Kurze Antwort

```bash
watch -n 1 nvidia-smi
```

Nur bestimmte GPUs:

```bash
watch -n 1 nvidia-smi -i 0,2,5
```

Beenden mit `Ctrl + C`.

## Erklarung

`watch` fuhrt einen Befehl wiederholt aus und zeigt die Ausgabe im Terminal an. `-n 1` bedeutet: jede Sekunde aktualisieren. Zusammen mit `nvidia-smi` wird daraus ein Live-Monitor fur alle GPUs.

Das ist besonders nutzlich, wenn du:

- Prufen willst, ob ein Workflow wirklich auf der erwarteten GPU lauft
- VRAM-Belegung wahrend der Generierung beobachten willst
- Herausfinden mochtest, welche GPU ein anderer Nutzer gerade belastet
- Uberwachen willst, ob der Container nach einem Start hochkommt

### Die Live-Anzeige verstehen

Wenn du einen ComfyUI-Workflow startest, siehst du in `watch -n 1 nvidia-smi`:

1. **Memory-Usage steigt an** – das Modell wird in den VRAM geladen
2. **GPU-Util geht auf > 80%** – die GPU beginnt zu rechnen
3. **Ein Python-Prozess erscheint unten** – das ist ComfyUI
4. **Nach Abschluss** sinkt GPU-Util wieder, Memory-Usage bleibt oft belegt (VRAM-Caching)

## Schritt-fur-Schritt: Live-Monitoring

1. SSH-Sitzung offnen (ein zweites Terminal-Fenster, damit ComfyUI laufen kann):
   ```bash
   ssh m4z-d1t@hal9000.skim.th-owl.de
   ```

2. Live-Monitor starten:
   ```bash
   watch -n 1 nvidia-smi
   ```

3. In einem anderen Fenster: ComfyUI nutzen (Workflow starten).

4. Beobachten, wie sich die Werte andern.

5. Beenden mit:
   ```text
   Ctrl + C
   ```

## Wichtige Befehle

```bash
# Alle GPUs, Update jede Sekunde
watch -n 1 nvidia-smi

# Nur GPU 5, Update alle 0.5 Sekunden
watch -n 0.5 nvidia-smi -i 5

# Mehrere GPUs gleichzeitig
watch -n 1 nvidia-smi -i 0,2,5

# Kompaktere Anzeige
watch -n 1 nvidia-smi --query-gpu=index,name,utilization.gpu,memory.used,memory.total,temperature.gpu --format=csv

# GPU-Speicheranderungen verfolgen (mit Zeitstempel)
while true; do echo "=== $(date +%H:%M:%S) ==="; nvidia-smi --query-gpu=index,memory.used --format=csv,noheader; sleep 2; done
```

## Typische Fehler

- **Fehler**: `watch` zeigt alte Daten
  - **Ursache**: Das Intervall ist zu lang (z. B. `-n 10` = nur alle 10 Sekunden).
  - **Losung**: Kurzeres Intervall wahlen, z. B. `-n 1`.

- **Fehler**: Terminal voller `nvidia-smi`-Ausgaben nach Beenden von `watch`
  - **Ursache**: `watch` wurde nicht mit `Ctrl+C` beendet.
  - **Losung**: `Ctrl+C` drucken oder Terminal zurucksetzen.

## Merksatz

`watch -n 1 nvidia-smi` ist dein Live-Rontgengerat fur GPUs. Damit siehst du sofort, ob dein Workflow die richtige Karte nutzt und wie voll sie lauft.
