---
title: "Wie stoppe ich ComfyUI sauber?"
description: "ComfyUI korrekt beenden – ohne Datenverlust und mit Verstandnis dafur, was erhalten bleibt."
difficulty: "anfanger"
topic: "comfyui"
tags: ["comfyui", "docker", "stop", "alltag"]
publishedAt: 2025-02-12
featured: false
readingTimeMinutes: 4
---

## Frage

Wie beende ich ComfyUI sauber?

## Kurze Antwort

```bash
sudo docker stop comfyui_data
```

Das stoppt den Container, loscht aber keine Modelle, Outputs oder Workflows.

## Erklarung

`docker stop` sendet ein Signal an den Container, das ihm Zeit gibt, sauber herunterzufahren. ComfyUI beendet laufende Prozesse, schlieat geoffnete Dateien und gibt die GPU frei.

Was **bleibt erhalten**:

- Alle Modelle in `models/`
- Alle generierten Bilder in `output/`
- Alle Workflows in `workflows/`
- Alle Custom Nodes in `custom_nodes/`
- Der Container selbst (er ist nur gestoppt, nicht geloscht)

Was **passiert**:

- ComfyUI ist nicht mehr im Browser erreichbar
- Die GPU wird freigegeben
- Der Container erscheint in `docker ps -a` als "Exited"

## Schritt-fur-Schritt: ComfyUI stoppen

1. Prufen, ob der Container lauft:
   ```bash
   sudo docker ps
   ```

2. Container stoppen:
   ```bash
   sudo docker stop comfyui_data
   ```

3. Prufen, ob er gestoppt ist:
   ```bash
   sudo docker ps -a | grep comfyui_data
   ```
   Der Status sollte "Exited" zeigen.

4. Optional: GPU prufen, ob sie frei ist:
   ```bash
   nvidia-smi
   ```
   Der ComfyUI-Prozess sollte nicht mehr in der Prozessliste erscheinen.

## Wichtige Befehle

```bash
# Stoppen
sudo docker stop comfyui_data

# Stoppen mit Timeout (max. 30 Sekunden warten):
sudo docker stop -t 30 comfyui_data

# Erzwingen (nur wenn stop nicht reagiert):
sudo docker kill comfyui_data

# Container nach dem Stoppen auch loschen:
sudo docker stop comfyui_data && sudo docker rm comfyui_data
```

## Typische Fehler

- **Fehler**: `docker stop` hangt und reagiert nicht
  - **Ursache**: Ein Prozess im Container beendet sich nicht.
  - **Losung**: `sudo docker kill comfyui_data` als letzten Ausweg. Danach ist der Container sofort aus.

- **Fehler**: Angst, dass `docker stop` Modelle loscht
  - **Das passiert nicht.** Modelle und Outputs liegen in `/data/pool/` und sind per Volume gemountet. `docker stop` und sogar `docker rm` lassen diese Dateien unangetastet.

## Merksatz

`docker stop` ist wie "Ausschalten" – die Festplatte (Modelle, Outputs) bleibt erhalten. Erst `docker rm` wurde den Container selbst loschen.
