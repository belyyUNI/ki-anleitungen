---
title: "Was mache ich bei 'No such file or directory' beim Download?"
description: "Warum wget abbricht, obwohl der Link stimmt – und wie du das mit mkdir -p behebst."
difficulty: "anfanger"
topic: "modelle"
tags: ["modelle", "download", "fehler", "mkdir", "wget"]
publishedAt: 2025-03-07
featured: false
readingTimeMinutes: 4
---

## Frage

Wie behebe ich den Fehler "No such file or directory" beim wget-Download?

## Kurze Antwort

Meist existiert der **Zielordner noch nicht**. `wget` legt keine Ordner automatisch an. Losung:

```bash
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/upscale_models
```

Dann den `wget`-Befehl erneut ausfuhren.

## Erklarung

`wget -O /pfad/zur/datei.safetensors` erwartet, dass das Verzeichnis `/pfad/zur/` bereits existiert. Anders als eine grafische Oberflache, die fehlende Ordner automatisch anlegt, bricht `wget` mit einem Fehler ab.

Die Option `-p` bei `mkdir` steht fur **parents** – sie legt alle fehlenden Zwischenordner automatisch an. Ohne `-p` musstest du jeden Ordner einzeln erstellen.

## Schritt-fur-Schritt: Fehler beheben

1. Fehlermeldung erkennen:
   ```text
   /data/pool/m4z-d1t/comfyui-project/models/upscale_models/datei.pth: No such file or directory
   ```

2. Fehlenden Ordner anlegen:
   ```bash
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/upscale_models
   ```

3. Gleichen `wget`-Befehl erneut ausfuhren (Pfeil nach oben im Terminal, Enter).

4. Download-Gewohnheit andern: **Immer zuerst `mkdir -p`, dann `wget`**.

## Wichtige Befehle

```bash
# Ordner anlegen (sicher, auch wenn er schon existiert):
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/upscale_models

# Prufen, ob ein Ordner existiert:
test -d /data/pool/m4z-d1t/comfyui-project/models/upscale_models && echo "Existiert" || echo "Fehlt"

# Alle Modellordner auf einmal anlegen:
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/{checkpoints,diffusion_models,loras,text_encoders,vae,upscale_models,latent_upscale_models}
```

## Typische Fehler

- **Fehler**: `mkdir models/upscale_models` (ohne `-p`) schlagt fehl
  - **Ursache**: Der ubergeordnete Ordner `models/` existiert nicht im aktuellen Verzeichnis.
  - **Losung**: Immer `mkdir -p` verwenden.

- **Fehler**: Im falschen Verzeichnis wird der Ordner angelegt
  - **Ursache**: Du bist nicht in `/data/pool/m4z-d1t/comfyui-project`.
  - **Losung**: Mit `pwd` Standort prufen, dann absoluten Pfad verwenden.

## Merksatz

Vor jedem Download: `mkdir -p` fur den Zielordner. Das sind 2 Sekunden, die viel Arger sparen.
