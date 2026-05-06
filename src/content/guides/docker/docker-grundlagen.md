---
title: "Docker-Grundlagen im Projekt"
description: "Image vs. Container, docker run vs. start vs. stop, und wann du einen Container neu bauen musst."
difficulty: "anfanger"
topic: "docker"
tags: ["docker", "container", "image", "grundlagen", "gpu"]
publishedAt: 2025-01-20
featured: true
readingTimeMinutes: 12
---

## Image vs. Container – der wichtigste Unterschied

Ein **Docker-Image** ist wie eine Blaupause oder Schablone. Es enthalt das Betriebssystem, die Software und alle Abhangigkeiten – aber es ist nur eine Vorlage.

Ein **Container** ist die laufende Instanz eines Images. Du kannst mehrere Container aus demselben Image starten, jeder mit eigenen Einstellungen.

**Merksatz**: Image = Bauplan. Container = laufende Instanz.

```bash
# Images anzeigen:
docker images

# Container anzeigen (laufend und gestoppt):
docker ps -a
```

## Die drei wichtigsten Docker-Befehle

### `docker run` – Container neu erstellen und starten

`docker run` erzeugt einen **neuen** Container und startet ihn. Jedes `docker run` erzeugt einen frischen Container – kein Wiederverwenden.

```bash
docker run --name comfyui_data --gpus '"device=0"' \
  -p 8188:8188 \
  -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
  comfyui-custom-torch271
```

> **Wichtig**: `docker run` nur beim allerersten Mal oder wenn du den Container **neu aufsetzen** willst. Nicht fur den taglichen Start!

### `docker start` – Bestehenden Container starten

Hast du `docker run` bereits einmal ausgefuhrt, existiert der Container. Beim nachsten Mal reicht:

```bash
docker start comfyui_data
```

### `docker stop` – Container anhalten

```bash
docker stop comfyui_data
```

Der Container wird sauber heruntergefahren. Deine Daten auf gemounteten Volumes bleiben erhalten.

## Wann brauchst du `docker run` statt `docker start`?

| Situation | Befehl |
|-----------|--------|
| Container existiert noch nie | `docker run` |
| Container existiert und ist gestoppt | `docker start` |
| Container soll mit **anderen GPUs** laufen | `docker run` (neu) |
| Neues Image soll verwendet werden | `docker run` (neu) |
| Nur Neustart nach Pause | `docker start` |

## Wenn der Container-Name schon vergeben ist

Fehler: `container name already in use`

```bash
# Alten Container loschen:
docker rm comfyui_data

# Dann neu erstellen:
docker run --name comfyui_data ...
```

Oder – wenn du den alten Container behalten willst – vergib einen anderen Namen.

## Container-Logs einsehen

```bash
# Letzte 50 Zeilen:
docker logs --tail 50 comfyui_data

# Live mitverfolgen:
docker logs -f comfyui_data
```

## Warum die GPU-Zuordnung beim Containerstart wichtig ist

Der Parameter `--gpus '"device=0"'` legt fest, welche GPU(s) der Container sehen und nutzen darf. Das ist kein Performance-Tuning, sondern eine **Zugriffsregel**.

- Ohne `--gpus` sieht der Container gar keine GPU
- `device=0` heiat: nur die erste GPU
- `device=0,1` heiat: GPU 0 und GPU 1 sind sichtbar

Andern lasst sich das nur mit einem neuen `docker run`. Ein einfaches `docker start` behalt die ursprungliche GPU-Konfiguration.

> **Merksatz**: `docker run` nur zum Erstellen. `docker start` fur den Alltag. GPU-Anderung = neuer Container.
