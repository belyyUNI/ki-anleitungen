---
title: "ComfyUI auf dem DGX-Server starten und verwalten"
description: "ComfyUI per Docker starten, stoppen, Logs prufen und im Browser aufrufen. Der vollstandige Workflow fur den taglichen Betrieb."
difficulty: "anfanger"
topic: "comfyui"
tags: ["comfyui", "docker", "starten", "logs", "browser", "container"]
publishedAt: 2025-01-25
featured: true
readingTimeMinutes: 10
---

## Voraussetzungen

- SSH-Zugang zum DGX-Server
- Docker-Container `comfyui_data` existiert (mindestens einmal mit `docker run` erstellt)
- Bild `comfyui-custom-torch271` vorhanden

## Schritt 1: Prufen, ob ComfyUI bereits lauft

```bash
docker ps
```

Wenn du `comfyui_data` in der Liste siehst, lauft der Container und ComfyUI ist erreichbar. Falls nicht:

```bash
docker ps -a | grep comfyui_data
```

Zeigt einen gestoppten Container an (STATUS: `Exited`).

## Schritt 2: Container starten

```bash
docker start comfyui_data
```

Das startet den bestehenden Container mit seiner ursprunglichen Konfiguration. ComfyUI braucht ein paar Sekunden zum Hochfahren.

## Schritt 3: Prufen, ob alles lauft

```bash
# Logs der letzten 20 Zeilen:
docker logs --tail 20 comfyui_data

# Du solltest etwa das sehen:
# To see the GUI go to: http://0.0.0.0:8188
```

## Schritt 4: ComfyUI im Browser offnen

Im Browser deines lokalen Rechners:

```
http://hal9000.skim.th-owl.de:8188
```

Port 8188 ist der Standard-Port von ComfyUI und wird vom Docker-Container an den Server weitergeleitet.

## Container stoppen

```bash
docker stop comfyui_data
```

## Container mit anderer GPU neu starten

Wenn du die GPU wechseln mochtest, musst du den Container **neu erstellen**:

```bash
# Alten Container loschen:
docker stop comfyui_data
docker rm comfyui_data

# Mit anderer GPU neu aufsetzen, z.B. GPU 1:
docker run -d --name comfyui_data \
  --gpus '"device=1"' \
  -p 8188:8188 \
  -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
  -v /data/pool/m4z-d1t/comfyui-project/custom_nodes:/app/custom_nodes \
  -v /data/pool/m4z-d1t/comfyui-project/workflows:/app/user/default/workflows \
  -v /data/pool/m4z-d1t/comfyui-project/output:/app/output \
  comfyui-custom-torch271
```

**Die `-v` (Volume-)Parameter sind essenziell.** Sie verbinden die Ordner auf dem Server mit den Pfaden im Container. Ohne sie findet ComfyUI deine Modelle, Nodes und Workflows nicht.

## Einfacher Neustart vs. Neuaufbau

| Aktion | Befehl | Wann? |
|--------|--------|-------|
| Neustart | `docker start comfyui_data` | Alltaglicher Start |
| Stopp | `docker stop comfyui_data` | Geplante Pause |
| Neuaufbau | `docker rm` + `docker run` | GPU-Wechsel, Image-Wechsel, Konfigurationsanderung |

## Typische Probleme beim Start

**Container startet, aber ComfyUI ist nicht erreichbar:**
```bash
docker logs --tail 100 comfyui_data | grep -i error
```
Das zeigt Fehler direkt nach dem Start an. Haufige Ursachen: fehlende Modelle, defekte Custom Nodes, falsche Volume-Pfade.

**Port 8188 ist belegt:**
Ein anderer Prozess nutzt den Port. Entweder den anderen stoppen oder einen anderen Port wahlen (z.B. `-p 8189:8188`).

> **Merksatz**: `docker start` reicht fur den Alltag. Nur bei GPU- oder Image-Wechsel brauchst du `docker rm` + `docker run`.
