---
title: "Wie verschiebe ich eine Datei in den richtigen Ordner?"
description: "Modell am falschen Ort? Mit mv und cp korrigierst du Dateipfade schnell und sicher."
difficulty: "anfanger"
topic: "modelle"
tags: ["modelle", "mv", "cp", "ordner", "bash", "grundlagen"]
publishedAt: 2025-03-15
featured: false
readingTimeMinutes: 4
---

## Frage

Wie korrigiere ich einen falsch gespeicherten Modellpfad?

## Kurze Antwort

```bash
mv /alter/pfad/datei.safetensors /data/pool/m4z-d1t/comfyui-project/models/korrekter_ordner/
```

Wenn du die Originaldatei behalten mochtest:

```bash
cp /alter/pfad/datei.safetensors /neuer/pfad/
```

## Erklarung

### mv = Verschieben (move)

`mv` bewegt eine Datei von A nach B. Die alte Datei existiert danach nicht mehr – sie ist jetzt am neuen Ort. Das ist die richtige Wahl, wenn du das Modell nur an einem Ort brauchst.

### cp = Kopieren (copy)

`cp` erstellt eine Kopie. Die Originaldatei bleibt erhalten. Das ist nutzlich, wenn du einen Checkpoint doppelt referenzieren musst (kommt selten vor) oder einen Download testweise im Home-Ordner gemacht hast und ihn im Projekt behalten willst.

### Wichtiger Unterschied

- `mv` andert nicht den Inhalt der Datei – es andert nur den Eintrag im Dateisystem. **Das ist schnell**, auch bei groaen Dateien.
- `cp` liest und schreibt jeden Block der Datei. **Das ist langsam** bei 7 GB und verbraucht doppelten Speicher.

## Schritt-fur-Schritt: Modell verschieben

1. Prufen, wo die Datei aktuell liegt:
   ```bash
   ls -lh /data/pool/m4z-d1t/comfyui-project/models/checkpoints/meine_lora.safetensors
   ```

2. Prufen, ob der Zielordner existiert:
   ```bash
   ls -d /data/pool/m4z-d1t/comfyui-project/models/loras/
   ```

3. Falls nicht, anlegen:
   ```bash
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/loras
   ```

4. Verschieben:
   ```bash
   mv /data/pool/m4z-d1t/comfyui-project/models/checkpoints/meine_lora.safetensors /data/pool/m4z-d1t/comfyui-project/models/loras/
   ```

5. Prufen, ob sie angekommen ist:
   ```bash
   ls -lh /data/pool/m4z-d1t/comfyui-project/models/loras/meine_lora.safetensors
   ```

## Wichtige Befehle

```bash
# Verschieben
mv /pfad/zu/datei.safetensors /pfad/zu/ziel/

# Kopieren (Original bleibt erhalten)
cp /pfad/zu/datei.safetensors /pfad/zu/ziel/

# Mehrere Dateien verschieben
mv *.safetensors /data/pool/m4z-d1t/comfyui-project/models/checkpoints/

# Vorsicht: mv uberschreibt ohne Warnung, wenn Zieldatei existiert!
mv -i quelle.safetensors ziel.safetensors  # -i = Nachfrage vor Uberschreiben
```

## Typische Fehler

- **Fehler**: `mv: cannot move`: No such file or directory
  - **Ursache**: Der Zielordner existiert nicht.
  - **Losung**: `mkdir -p` fur den Zielordner ausfuhren.

- **Fehler**: Datei doppelt (einmal original, einmal kopiert)
  - **Folge**: Speicherverschwendung, ComfyUI zeigt beide an
  - **Losung**: Duplikat mit `rm` loschen

## Merksatz

Zum Korrigieren: `mv` (nicht `cp`). Der groate Fehler ist, aus Versehen das Modell doppelt zu haben und Speicher zu verschwenden.
