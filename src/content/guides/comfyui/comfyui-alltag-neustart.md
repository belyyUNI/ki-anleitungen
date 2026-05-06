---
title: "Wie starte ich ComfyUI im Alltag neu?"
description: "Die tagliche Routine: Server verbinden, Container starten, Browser offnen – Schritt fur Schritt."
difficulty: "anfanger"
topic: "comfyui"
tags: ["comfyui", "docker", "start", "alltag", "routine"]
publishedAt: 2025-02-10
featured: true
readingTimeMinutes: 5
---

## Frage

Wie starte ich ComfyUI, wenn der Container bereits existiert?

## Kurze Antwort

```bash
ssh m4z-d1t@hal9000.skim.th-owl.de
cd /data/pool/m4z-d1t/comfyui-project
sudo docker start comfyui_data
sudo docker ps
```

Danach im Browser offnen:

```text
http://hal9000.skim.th-owl.de:8188
```

## Erklarung

Der tagliche Start von ComfyUI ist ein Dreischritt: **Verbinden, Starten, Prufen**. Wenn der Container bereits existiert (also irgendwann mit `docker run` erstellt wurde), brauchst du nur `docker start`.

Das ist die haufigste Routine im Projekt – du wirst sie oft ausfuhren.

**Wichtig**: Der Container lauft nach dem Start **im Hintergrund** (wegen `-d` = detached). Das Terminal bleibt frei fur weitere Befehle. Du kannst die SSH-Verbindung sogar trennen und der Container lauft weiter.

## Schritt-fur-Schritt: Komplette Routine

1. Terminal offnen und per SSH verbinden:
   ```bash
   ssh m4z-d1t@hal9000.skim.th-owl.de
   ```
   Passwort eingeben (keine Zeichen sichtbar beim Tippen).

2. Ins Projektverzeichnis wechseln:
   ```bash
   cd /data/pool/m4z-d1t/comfyui-project
   ```

3. Container starten:
   ```bash
   sudo docker start comfyui_data
   ```

4. Prufen, ob der Container lauft:
   ```bash
   sudo docker ps
   ```
   Die Ausgabe sollte `comfyui_data` in der Liste zeigen.

5. Browser offnen und zu dieser URL gehen:
   ```text
   http://hal9000.skim.th-owl.de:8188
   ```

6. Fertig – ComfyUI ist bereit.

## Wichtige Befehle

```bash
# Alles in einer Zeile (nach dem SSH-Login):
cd /data/pool/m4z-d1t/comfyui-project && sudo docker start comfyui_data && sudo docker ps

# Container-Status schnell prufen:
sudo docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Logs checken, falls ComfyUI nicht im Browser erscheint:
sudo docker logs --tail 20 comfyui_data
```

## Typische Fehler

- **Fehler**: Browser zeigt "Seite nicht erreichbar" nach `docker start`
  - **Ursache**: ComfyUI braucht etwas Zeit zum Hochfahren (Python, Modell-Scan).
  - **Losung**: 15-30 Sekunden warten und neu laden. Logs prufen: `sudo docker logs --tail 10 comfyui_data`.

- **Fehler**: `No such container: comfyui_data`
  - **Ursache**: Der Container wurde noch nie erstellt oder wurde geloscht.
  - **Losung**: Container mit `docker run` neu erstellen.

## Merksatz

SSH → cd → start → ps → Browser. Das ist deine tagliche ComfyUI-Routine in 30 Sekunden.
