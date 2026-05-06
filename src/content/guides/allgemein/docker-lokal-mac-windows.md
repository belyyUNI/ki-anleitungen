---
title: "Brauche ich Docker lokal auf Mac oder Windows?"
description: "Ob Docker Desktop auf dem eigenen Rechner notig ist und wann es trotzdem sinnvoll sein kann."
difficulty: "anfanger"
topic: "allgemein"
tags: ["docker", "lokal", "mac", "windows", "einsteiger"]
publishedAt: 2025-01-14
featured: false
readingTimeMinutes: 5
---

## Frage

Muss Docker Desktop auf dem lokalen Rechner installiert sein?

## Kurze Antwort

Fur den reinen DGX-Workflow ist lokales Docker **nicht zwingend notig**. Docker lauft auf dem Server. Der lokale Rechner braucht nur Terminal/PowerShell, SSH und einen Browser. Docker lokal kann trotzdem sinnvoll sein, wenn man spater auch lokale Container testen mochte oder wenn es zum Firmenstandard gehort.

## Erklarung

Docker besteht aus zwei Teilen: dem **Docker-Daemon** (der eigentliche Dienst, der Container ausfuhrt) und dem **Docker-Client** (die Befehlszeile `docker`). Wenn du per SSH auf dem Server arbeitest, nutzt du den Docker-Daemon des Servers. Dein lokaler Rechner braucht dafur nichts von Docker.

### Wann du Docker lokal NICHT brauchst

- Du arbeitest nur per SSH auf dem DGX-Server
- Du startest und stoppst Container ausschliealich auf dem Server
- Du nutzt `sudo docker` Befehle immer in der SSH-Sitzung

### Wann Docker lokal sinnvoll sein KANN

- Du mochtest lokal mit kleinen Modellen experimentieren
- Du willst Workflows testen, bevor du sie auf den Server bringst
- Docker ist Teil des Firmenstandards und auf deinem Rechner bereits installiert
- Du mochtest `docker`-Befehle lokal uben, ohne den Server zu belasten

## Schritt-fur-Schritt: Prufen, ob Docker lokal installiert ist

1. Offne ein **neues Terminal** (nicht die SSH-Sitzung).
2. Tippe:
   ```bash
   docker --version
   ```
3. Wenn eine Version angezeigt wird, ist Docker lokal installiert.
4. Wenn `command not found` erscheint, ist Docker nicht installiert – das ist fur diesen Workflow in Ordnung.

## Wichtige Befehle

Die Docker-Befehle, die du auf dem Server brauchst, lauten immer mit `sudo`:

```bash
sudo docker ps
sudo docker start comfyui_data
sudo docker stop comfyui_data
sudo docker logs --tail 100 comfyui_data
```

Das `sudo` ist wichtig, weil Docker auf dem Server Root-Rechte benotigt.

## Typische Fehler

- **Fehler**: `docker: command not found` auf dem eigenen Rechner
  - **Das ist kein Problem**, solange du Docker nur auf dem Server nutzt.
  - Verwechsele nicht das lokale Terminal mit der SSH-Sitzung.

- **Fehler**: `docker ps` zeigt nichts an
  - **Wahrscheinlich bist du lokal** und nicht auf dem Server.
  - Prufe mit `whoami` und `hostname`, ob du auf dem Server bist.

## Merksatz

Docker muss dort laufen, wo die Container sind – und das ist der Server, nicht dein Rechner.
