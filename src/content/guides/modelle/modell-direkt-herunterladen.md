---
title: "Wie lade ich ein Modell direkt auf den Server?"
description: "Hugging-Face-Modelle per wget herunterladen – mit allen benotigten Optionen und dem richtigen Zielpfad."
difficulty: "anfanger"
topic: "modelle"
tags: ["modelle", "download", "wget", "huggingface", "server"]
publishedAt: 2025-03-01
featured: true
readingTimeMinutes: 7
---

## Frage

Wie verwende ich einen Hugging-Face-Link im Terminal?

## Kurze Antwort

```bash
wget -c --show-progress -O /data/pool/m4z-d1t/comfyui-project/models/ORDNER/datei.safetensors "DIREKTER_LINK"
```

`-c` sorgt dafur, dass ein abgebrochener Download fortgesetzt werden kann.

## Erklarung

Modelle konnen mehrere GB groa sein. Ein direkter `wget`-Aufruf ohne `-c` wurde bei Verbindungsabbruch von vorne beginnen – das ist bei 7 GB sehr argerlich. Deshalb sind die Optionen wichtig:

| Option | Bedeutung |
|--------|-----------|
| `-c` | **Continue** – setzt abgebrochene Downloads fort |
| `--show-progress` | Zeigt Fortschrittsbalken (lesbarer als die Standardausgabe) |
| `-O` | **Output** – legt den Dateinamen und Speicherort fest |

### Der richtige Link

Fur `wget` brauchst du den **direkten Download-Link**, nicht die Webseiten-URL. Der Link muss `resolve` enthalten, nicht `blob`:

```text
# Richtig:
https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors

# Falsch (nur fur Browser):
https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/blob/main/sd_xl_base_1.0.safetensors
```

## Schritt-fur-Schritt: Modell herunterladen

1. Per SSH auf den Server verbinden:
   ```bash
   ssh m4z-d1t@hal9000.skim.th-owl.de
   ```

2. Zielordner anlegen (falls nicht vorhanden):
   ```bash
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/checkpoints
   ```

3. Download starten:
   ```bash
   wget -c --show-progress -O /data/pool/m4z-d1t/comfyui-project/models/checkpoints/mein_modell.safetensors "https://huggingface.co/.../resolve/main/datei.safetensors"
   ```

4. Nach Abschluss prufen:
   ```bash
   ls -lh /data/pool/m4z-d1t/comfyui-project/models/checkpoints/mein_modell.safetensors
   ```

## Wichtige Befehle

```bash
# Grundbefehl
wget -c --show-progress -O ZIELPFAD "LINK"

# Download im Hintergrund (auch nach SSH-Disconnect)
nohup wget -c --show-progress -O ZIELPFAD "LINK" > download.log 2>&1 &

# Fortschritt des Hintergrund-Downloads prufen
tail -f download.log
```

## Typische Fehler

- **Fehler**: Download bricht ab, `wget` ohne `-c` gestartet
  - **Losung**: Beim nachsten Mal `-c` verwenden. Gleicher Befehl mit `-c` setzt fort.

- **Fehler**: Link funktioniert im Browser, aber nicht mit `wget`
  - **Ursache**: `blob` statt `resolve` im Link
  - **Losung**: `blob/main/` durch `resolve/main/` ersetzen

## Merksatz

Immer mit `-c` herunterladen. Bei 7 GB willst du nicht zweimal von vorne anfangen.
