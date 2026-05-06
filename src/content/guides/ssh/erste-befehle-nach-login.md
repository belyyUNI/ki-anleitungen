---
title: "Welche ersten Befehle sollte ich nach dem SSH-Login kennen?"
description: "Die wichtigsten Befehle nach dem Login: Orientieren, Projekt finden, Docker-Status prufen."
difficulty: "anfanger"
topic: "ssh"
tags: ["ssh", "login", "befehle", "grundlagen", "orientierung"]
publishedAt: 2025-05-04
featured: false
readingTimeMinutes: 5
---

## Frage

Welche ersten Befehle sollte ich nach dem Login kennen?

## Kurze Antwort

Nach dem SSH-Login sind das die wichtigsten ersten Schritte:

```bash
pwd                                  # Wo bin ich?
ls                                   # Was ist hier?
cd /data/pool/m4z-d1t/comfyui-project  # Zum Projekt wechseln
sudo docker ps                       # Lauft ComfyUI?
nvidia-smi                           # Wie sehen die GPUs aus?
```

## Erklarung

Nach `ssh m4z-d1t@hal9000.skim.th-owl.de` stehst du im Home-Verzeichnis. Von dort aus navigierst du zum Projekt. Diese funf Befehle decken 90 % deiner taglichen Orientierung ab:

1. **`pwd`**: Zeigt, wo du bist. Direkt nach dem Login meist `/home/m4z-d1t`.
2. **`ls`**: Zeigt, welche Dateien und Ordner hier liegen.
3. **`cd /data/pool/m4z-d1t/comfyui-project`**: Bringt dich zum ComfyUI-Projektordner – dein Hauptarbeitsverzeichnis.
4. **`sudo docker ps`**: Zeigt, ob der ComfyUI-Container lauft. Wenn `comfyui_data` in der Liste erscheint, ist ComfyUI bereit.
5. **`nvidia-smi`**: Zeigt alle GPUs und deren Auslastung. Nutzlich, um eine freie GPU fur den nachsten Run zu finden.

## Schritt-fur-Schritt: Erste Schritte nach dem Login

1. Per SSH verbinden:
   ```bash
   ssh m4z-d1t@hal9000.skim.th-owl.de
   ```

2. Orientieren:
   ```bash
   pwd
   ```
   Ausgabe: `/home/m4z-d1t`

3. Zum Projekt wechseln:
   ```bash
   cd /data/pool/m4z-d1t/comfyui-project
   ```

4. Docker-Status prufen:
   ```bash
   sudo docker ps
   ```
   Wenn `comfyui_data` nicht erscheint, Container starten:
   ```bash
   sudo docker start comfyui_data
   ```

5. GPU-Status prufen:
   ```bash
   nvidia-smi
   ```

## Wichtige Befehle

```bash
# Login
ssh m4z-d1t@hal9000.skim.th-owl.de

# Nach dem Login direkt zum Projekt
cd /data/pool/m4z-d1t/comfyui-project

# Alles auf einen Blick: Ort + Container + GPUs
pwd && sudo docker ps && nvidia-smi
```

## Merksatz

Login → `pwd` → `cd` zum Projekt → `docker ps` → `nvidia-smi`. Das ist die funf-Befehle-Routine fur jeden Arbeitstag.
