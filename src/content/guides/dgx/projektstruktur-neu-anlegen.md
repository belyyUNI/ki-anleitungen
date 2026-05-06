---
title: "Wie lege ich die Projektstruktur neu an?"
description: "Alle benotigten Ordner von null erstellen – mit einem einzigen mkdir-Befehl."
difficulty: "anfanger"
topic: "dgx"
tags: ["projektstruktur", "ordner", "mkdir", "setup", "einsteiger"]
publishedAt: 2025-01-24
featured: false
readingTimeMinutes: 4
---

## Frage

Wie erstelle ich alle benotigten Ordner von Grund auf?

## Kurze Antwort

Mit einem einzigen `mkdir -p`-Befehl kannst du die gesamte Projektstruktur anlegen. Die Option `-p` stellt sicher, dass alle fehlenden Zwischenordner automatisch mit erstellt werden.

## Erklarung

Wenn du das Projekt neu aufsetzt oder ein neuer Teamkollege seinen eigenen Arbeitsbereich braucht, mussen folgende Ordner existieren:

- **models/** mit allen sieben Unterordnern fur verschiedene Modelltypen
- **custom_nodes/** fur zusatzliche ComfyUI-Erweiterungen
- **output/** fur generierte Bilder und Videos
- **workflows/** fur gespeicherte ComfyUI-Workflows

Der Befehl `mkdir -p` (p = parents) erstellt alle Ordner in einem Durchlauf. Fehlende Zwischenordner werden automatisch angelegt. Existiert ein Ordner bereits, passiert nichts – es gibt keinen Fehler.

## Schritt-fur-Schritt: Struktur neu anlegen

1. Per SSH auf den Server verbinden:
   ```bash
   ssh m4z-d1t@hal9000.skim.th-owl.de
   ```

2. Prufen, ob das Basisverzeichnis existiert:
   ```bash
   ls /data/pool/m4z-d1t/
   ```

3. Falls nicht, das Basisverzeichnis anlegen:
   ```bash
   mkdir -p /data/pool/m4z-d1t/comfyui-project
   ```

4. Alle Unterordner auf einmal erstellen:
   ```bash
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/checkpoints
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/diffusion_models
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/loras
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/text_encoders
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/vae
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/upscale_models
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/latent_upscale_models
   mkdir -p /data/pool/m4z-d1t/comfyui-project/custom_nodes
   mkdir -p /data/pool/m4z-d1t/comfyui-project/output
   mkdir -p /data/pool/m4z-d1t/comfyui-project/workflows
   ```

5. Prufen, ob alles angelegt wurde:
   ```bash
   ls -d /data/pool/m4z-d1t/comfyui-project/*/
   ```

## Wichtige Befehle

```bash
# Alles in einem Befehl (mit && verknupft):
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/{checkpoints,diffusion_models,loras,text_encoders,vae,upscale_models,latent_upscale_models} \
  && mkdir -p /data/pool/m4z-d1t/comfyui-project/{custom_nodes,output,workflows}

# Prufen, welche Ordner fehlen:
for dir in checkpoints diffusion_models loras text_encoders vae upscale_models latent_upscale_models; do
  test -d "/data/pool/m4z-d1t/comfyui-project/models/$dir" || echo "FEHLT: models/$dir"
done
```

## Typische Fehler

- **Fehler**: `mkdir: cannot create directory: Permission denied`
  - **Ursache**: Du hast keine Schreibrechte in `/data/pool/m4z-d1t/`.
  - **Losung**: Prufe mit `whoami`, ob du als `m4z-d1t` eingeloggt bist. Frage einen Admin, falls die Rechte fehlen.

- **Fehler**: Einzelne `mkdir`-Befehle statt `mkdir -p`
  - **Ursache**: Ohne `-p` schlagt `mkdir models/checkpoints` fehl, wenn `models/` nicht existiert.
  - **Losung**: Immer `mkdir -p` verwenden, dann werden fehlende Zwischenordner automatisch erstellt.

## Merksatz

`mkdir -p` ist dein Freund. Ein Befehl, alle Ordner – keine Ausrede fur fehlende Verzeichnisse.
