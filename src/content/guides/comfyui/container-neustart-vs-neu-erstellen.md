---
title: "Wann sollte ich einen Container neu starten und wann neu erstellen?"
description: "Docker restart vs. docker run – wann ein einfacher Neustart reicht und wann der Container neu erstellt werden muss."
difficulty: "anfanger"
topic: "comfyui"
tags: ["docker", "container", "neustart", "comfyui", "gpu", "image", "einsteiger"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 6
---

## Frage

Wann reicht `docker restart` oder `docker start`, und wann muss der Container mit `docker run` neu erstellt werden?

## Kurze Antwort

Ein einfacher Neustart reicht, wenn nur ComfyUI neu laden soll. Neu erstellen muss man den Container, wenn sich Startparameter andern, zum Beispiel GPU-Zuordnung, Port, Mounts oder Image.

## Erklarung

Docker-Container haben einen Lebenszyklus. Solange sich die Konfiguration nicht andert, reicht `docker start` oder `docker restart`. Aber bestimmte Einstellungen werden **nur beim Erstellen** (`docker run`) festgelegt und konnen nachtraglich nicht geandert werden.

### Was wird beim `docker run` festgelegt?

- `--gpus` – Welche GPUs der Container sehen darf
- `-p` – Port-Weiterleitung (z. B. 8188:8188)
- `-v` – Volume-Mounts (Modelle, Outputs, Custom Nodes)
- `--name` – Der Containername
- Das Image (z. B. `comfyui-custom-torch271`)

Diese Parameter sind im laufenden Container **nicht** anderbar. Wenn du also eine andere GPU nutzen oder ein anderes Image verwenden willst, musst du den Container loschen und neu erstellen.

### Entscheidungstabelle fur ComfyUI

| Situation | Aktion |
|---|---|
| ComfyUI reagiert nicht | `docker restart` |
| Neue Custom Nodes installiert | `docker restart` |
| Neue Modelle geladen | meist `docker restart` |
| Andere GPU nutzen | Container neu erstellen |
| Neues Docker-Image nutzen | Container neu erstellen |
| Mount-Pfade andern | Container neu erstellen |
| Port andern | Container neu erstellen |

## Schritt-fur-Schritt

### Fall 1: Nur Neustart

```bash
# Container neu starten (stoppen + starten)
sudo docker restart comfyui_data

# Oder: erst stoppen, dann starten
sudo docker stop comfyui_data
sudo docker start comfyui_data
```

### Fall 2: Container neu erstellen (GPU wechseln)

```bash
# 1. Stoppen
sudo docker stop comfyui_data

# 2. Loschen
sudo docker rm comfyui_data

# 3. Mit neuer GPU neu erstellen
sudo docker run -d \
  --name comfyui_data \
  --gpus '"device=5"' \
  -p 8188:8188 \
  -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
  -v /data/pool/m4z-d1t/comfyui-project/output:/app/output \
  -v /data/pool/m4z-d1t/comfyui-project/custom_nodes:/app/custom_nodes \
  -v /data/pool/m4z-d1t/comfyui-project/workflows:/app/user \
  comfyui-custom-torch271

# 4. Prufen
sudo docker ps
```

### Fall 3: Neues Image verwenden

```bash
sudo docker stop comfyui_data
sudo docker rm comfyui_data
sudo docker run -d \
  --name comfyui_data \
  --gpus '"device=5"' \
  -p 8188:8188 \
  -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
  -v /data/pool/m4z-d1t/comfyui-project/output:/app/output \
  -v /data/pool/m4z-d1t/comfyui-project/custom_nodes:/app/custom_nodes \
  -v /data/pool/m4z-d1t/comfyui-project/workflows:/app/user \
  comfyui-custom-torch271
```

## Wichtige Befehle

```bash
# Container starten (wenn bereits vorhanden)
sudo docker start comfyui_data

# Container stoppen
sudo docker stop comfyui_data

# Container neu starten
sudo docker restart comfyui_data

# Container loschen (muss gestoppt sein)
sudo docker rm comfyui_data

# Container neu erstellen (nach rm)
sudo docker run -d --name comfyui_data ...

# Prüfen, ob Container existiert
sudo docker ps -a | grep comfyui_data
```

## Typische Fehler

- **Fehler**: `docker run` ausfuhren, obwohl `docker start` gereicht hatte.
  - **Folge**: Fehlermeldung wegen doppeltem Containernamen.
  - **Losung**: Erst `sudo docker ps -a` prufen. Wenn der Container schon existiert und gestoppt ist: `sudo docker start`.

- **Fehler**: GPU im Workflow andern, aber Container nicht neu erstellen.
  - **Folge**: ComfyUI nutzt weiter die alte GPU.
  - **Losung**: Container mit `docker rm` + `docker run` neu erstellen.

- **Fehler**: Neues Image committen, aber alten Container nicht neu erstellen.
  - **Folge**: Der Container lauft mit dem alten Image weiter, das Update ist nicht wirksam.
  - **Losung**: Nach `docker commit` immer `docker rm` + `docker run` mit dem neuen Image.

## Merksatz

Starten ist fur Bestehendes. Run ist fur Neues.
