---
title: "Was ist ein Docker-Container?"
description: "Der Unterschied zwischen Image und Container – und wie du Container auflistest, inspizierst und verwaltest."
difficulty: "anfanger"
topic: "docker"
tags: ["docker", "container", "image", "grundlagen"]
publishedAt: 2025-02-03
featured: false
readingTimeMinutes: 5
---

## Frage

Was ist der Unterschied zwischen Image und Container?

## Kurze Antwort

Das Image ist die **Vorlage**. Der Container ist die **laufende Instanz** davon. Man kann ein Image mehrfach starten, aber jeder laufende Container hat einen eigenen Namen, z. B.:

```bash
comfyui_data
```

## Erklarung

Vergleiche Image und Container mit einer **Schablone und einem gebauten Haus**:

- Das **Image** ist der Bauplan – es definiert, was drin ist, aber tut nichts.
- Der **Container** ist das gebaute Haus – es lauft, verbraucht Ressourcen und kann betreten werden (`docker exec`).
- Aus einem Bauplan kannst du mehrere Hauser bauen – aber jedes hat seine eigene Adresse (Containername).
- Wenn du ein Haus umbaust und den Bauplan aktualisierst (`docker commit`), musst du die alten Hauser abreiaen und neu bauen (`docker rm` + `docker run`).

### Container-Lebenszyklus

```
docker run    →  Container wird erstellt und gestartet
docker stop   →  Container wird gestoppt (bleibt erhalten)
docker start  →  Container wird wieder gestartet
docker rm     →  Container wird geloscht
```

Ein gestoppter Container existiert noch – er ist nur pausiert. Erst `docker rm` entfernt ihn endgultig.

## Schritt-fur-Schritt: Container verwalten

1. Laufende Container anzeigen:
   ```bash
   sudo docker ps
   ```

2. Alle Container anzeigen (auch gestoppte):
   ```bash
   sudo docker ps -a
   ```

3. Container-Details inspizieren:
   ```bash
   sudo docker inspect comfyui_data
   ```

4. Container-Logs prufen:
   ```bash
   sudo docker logs --tail 50 comfyui_data
   ```

## Wichtige Befehle

```bash
sudo docker ps              # Nur laufende Container
sudo docker ps -a           # Alle Container (auch gestoppte)
sudo docker start NAME      # Gestoppten Container starten
sudo docker stop NAME       # Container stoppen
sudo docker rm NAME         # Gestoppten Container loschen
sudo docker logs NAME       # Logs anzeigen
sudo docker exec -it NAME bash  # Shell im Container offnen
```

## Typische Fehler

- **Fehler**: `Conflict. The container name "comfyui_data" is already in use`
  - **Ursache**: Es existiert bereits ein Container (auch gestoppt) mit diesem Namen.
  - **Losung**: Entweder den alten Container loschen (`docker rm`) oder einen neuen Namen verwenden.

- **Fehler**: Container ist nach Reboot "verschwunden"
  - **Ursache**: Der Container wurde nicht geloscht, sondern ist nur gestoppt.
  - **Losung**: `sudo docker ps -a` zeigt ihn. Mit `sudo docker start comfyui_data` wieder starten.

## Merksatz

Image = Vorlage. Container = laufende Instanz. Ein Image kann viele Container haben, aber jeder Container hat nur ein Image.
