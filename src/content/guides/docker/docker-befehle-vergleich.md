---
title: "Wann nutze ich docker run, start, stop und rm?"
description: "Die vier wichtigsten Docker-Befehle im Vergleich – mit Entscheidungshilfe fur den Alltag."
difficulty: "anfanger"
topic: "docker"
tags: ["docker", "befehle", "run", "start", "stop", "rm", "grundlagen"]
publishedAt: 2025-02-05
featured: false
readingTimeMinutes: 6
---

## Frage

Wann nimmt man welchen Docker-Befehl?

## Kurze Antwort

- `docker run` – **Neuen** Container aus einem Image erstellen und starten
- `docker start` – **Vorhandenen**, gestoppten Container starten
- `docker stop` – Laufenden Container **anhalten**
- `docker rm` – Gestoppten Container **loschen**
- Wenn sich die GPU-Zuordnung andern soll, **muss** der Container neu erstellt werden

## Erklarung

Die vier Befehle bilden den Container-Lebenszyklus ab. Der haufigste Fehler ist, `docker run` zu verwenden, wenn `docker start` genugt hatte.

### Entscheidungshilfe

| Situation | Befehl |
|-----------|--------|
| Container existiert noch nicht | `docker run` |
| Container ist gestoppt, Einstellungen sind ok | `docker start` |
| Container lauft und soll pausieren | `docker stop` |
| GPU wechseln oder Ports andern | `docker stop` + `docker rm` + `docker run` |
| Container wird nicht mehr gebraucht | `docker stop` + `docker rm` |

### Warum nicht immer `docker run`?

Jedes `docker run` mit `--name comfyui_data` wurde einen **zweiten** Container mit gleichem Namen versuchen – was fehlschlagt. Docker erlaubt keine doppelten Containernamen.

Auaerdem: `docker start` ist schneller, weil es nur den vorhandenen Container wieder aufweckt. `docker run` wurde alles neu initialisieren.

### Wann `docker rm` + `docker run`?

Nur wenn sich die **Erstellungsparameter** andern mussen:

- Andere GPU (`--gpus`)
- Anderer Port (`-p`)
- Andere Volume-Mounts (`-v`)
- Anderes Image

## Schritt-fur-Schritt: GPU wechseln

1. Aktuellen Container stoppen:
   ```bash
   sudo docker stop comfyui_data
   ```

2. Container loschen:
   ```bash
   sudo docker rm comfyui_data
   ```

3. Mit neuer GPU neu erstellen:
   ```bash
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

4. Prufen, ob der Container lauft:
   ```bash
   sudo docker ps
   ```

## Typische Fehler

- **Fehler**: `docker run` obwohl `docker start` genugt hatte
  - **Folge**: Fehler wegen doppeltem Containernamen
  - **Losung**: Erst `docker ps -a` prufen, ob der Container schon existiert.

- **Fehler**: `docker rm` ohne vorheriges `docker stop`
  - **Folge**: Fehler, weil ein laufender Container nicht geloscht werden kann
  - **Losung**: Erst `docker stop`, dann `docker rm`.

## Merksatz

`docker start` ist der Alltagsbefehl. `docker run` nur, wenn etwas an der Container-Konfiguration geandert werden muss.
