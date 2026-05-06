---
title: "Wie behebe ich libGL.so.1- oder ffmpeg-Fehler?"
description: "Warum VideoHelperSuite oder Easy-Use nicht laden – und wie du fehlende Systembibliotheken im Container nachinstallierst."
difficulty: "fortgeschritten"
topic: "comfyui"
tags: ["custom-nodes", "libgl", "ffmpeg", "opencv", "systembibliotheken", "comfyui"]
publishedAt: 2025-04-09
featured: true
readingTimeMinutes: 6
---

## Frage

Wie behebe ich Fehler mit libGL.so.1 oder ffmpeg bei VideoHelperSuite oder Easy-Use?

## Kurze Antwort

Oft fehlen Systembibliotheken im Container:

```bash
sudo docker exec -u 0 -it comfyui_data bash -lc "apt-get update && apt-get install -y libgl1 libglib2.0-0 ffmpeg python3-opencv"
```

Danach:

```bash
sudo docker stop comfyui_data
sudo docker start comfyui_data
```

## Erklarung

Viele Custom Nodes (besonders Video- und Bildbearbeitungs-Nodes) brauchen Systembibliotheken, die in einem schlanken Docker-Image nicht enthalten sind:

| Bibliothek | Wofur? | Betroffene Nodes |
|-----------|--------|-----------------|
| `libGL.so.1` | OpenGL-Rendering | VideoHelperSuite, Easy-Use |
| `libglib2.0-0` | Grundlegende Systemfunktionen | Viele Nodes |
| `ffmpeg` | Video-Encoding/-Decoding | VideoHelperSuite, Video-Nodes |
| `python3-opencv` | Bildverarbeitung | WAS Suite, Easy-Use |

Diese Bibliotheken sind **nicht** Python-Pakete, sondern Systempakete (`.so`-Dateien). Deshalb werden sie mit `apt-get` installiert, nicht mit `pip`.

### Warum `-u 0`?

`-u 0` fuhrt den Befehl im Container als **Root** (Benutzer-ID 0) aus. Ohne das hatte `apt-get` keine Berechtigung, Pakete zu installieren.

## Schritt-fur-Schritt: Systembibliotheken nachinstallieren

1. Prufen, ob der Fehler wirklich ein fehlendes `libGL` ist:
   ```bash
   sudo docker logs --tail 200 comfyui_data | grep "libGL\|ffmpeg\|ImportError"
   ```

2. Paketliste aktualisieren und Bibliotheken installieren:
   ```bash
   sudo docker exec -u 0 -it comfyui_data bash -lc "apt-get update && apt-get install -y libgl1 libglib2.0-0 ffmpeg python3-opencv"
   ```

3. Container neustarten:
   ```bash
   sudo docker stop comfyui_data
   sudo docker start comfyui_data
   ```

4. Prufen, ob die Nodes jetzt laden:
   ```bash
   sudo docker logs --tail 50 comfyui_data | grep -i "import failed\|error"
   ```

5. ComfyUI im Browser neu laden (F5).

## Wichtige Befehle

```bash
# Systempakete interaktiv installieren
sudo docker exec -u 0 -it comfyui_data bash
apt-get update
apt-get install -y libgl1 libglib2.0-0 ffmpeg python3-opencv
exit

# Prufen, ob libGL jetzt verfugbar ist
sudo docker exec comfyui_data ldconfig -p | grep libGL

# Prufen, ob ffmpeg installiert ist
sudo docker exec comfyui_data which ffmpeg
```

## Typische Fehler

- **Fehler**: `apt-get: command not found`
  - **Ursache**: Das Docker-Image basiert nicht auf Debian/Ubuntu (selten bei ComfyUI).
  - **Losung**: Alternativen Package-Manager des Images verwenden.

- **Fehler**: Paketinstallation geht nach Container-Neustart verloren
  - **Ursache**: `docker start` behalt die Anderungen. Nur `docker rm` + `docker run` wurde sie verlieren.
  - **Losung**: Nach groaen Anderungen Image mit `docker commit` sichern.

## Merksatz

`libGL.so.1 not found` ist kein Python-Problem, sondern ein System-Problem. `apt-get install`, nicht `pip install`.
