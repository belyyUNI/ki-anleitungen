---
title: "Was ist ein Docker-Image?"
description: "Docker-Images verstehen: Was sie sind, wie du sie auflistest und welches Image in diesem Projekt verwendet wird."
difficulty: "anfanger"
topic: "docker"
tags: ["docker", "image", "container", "grundlagen"]
publishedAt: 2025-02-01
featured: false
readingTimeMinutes: 5
---

## Frage

Was bedeutet Docker-Image?

## Kurze Antwort

Ein Docker-Image ist die **Vorlage** fur einen Container. Es enthalt die Software, Abhangigkeiten und Umgebung – fertig verpackt und jederzeit startbereit. In diesem Projekt ist das aktuelle Image:

```bash
comfyui-custom-torch271
```

## Erklarung

Stell dir ein Docker-Image vor wie eine **Backup-Kopie einer komplett eingerichteten Umgebung**: Betriebssystem, Python, PyTorch, ComfyUI, alle Abhangigkeiten – alles in einer Datei gebundelt. Aus diesem Image kannst du jederzeit einen laufenden Container starten.

Ein Image ist **unveranderlich**. Wenn du Anderungen vornimmst (z. B. PyTorch aktualisierst), musst du ein neues Image erstellen (`docker commit`). Das alte Image bleibt erhalten.

### Images in diesem Projekt

Das aktuell verwendete Image ist `comfyui-custom-torch271`. Es wurde aus dem ursprunglichen ComfyUI-Image erstellt, nachdem PyTorch auf Version 2.7.1 aktualisiert wurde.

Fruhere Images (z. B. `comfyui-custom`) sollten nicht mehr verwendet werden, da sie die benotigte PyTorch-Version nicht enthalten.

## Schritt-fur-Schritt: Images anzeigen

1. Per SSH auf den Server verbinden:
   ```bash
   ssh m4z-d1t@hal9000.skim.th-owl.de
   ```

2. Alle vorhandenen Images auflisten:
   ```bash
   sudo docker images
   ```

3. Du siehst eine Tabelle mit:
   - **REPOSITORY**: Name des Images
   - **TAG**: Version (z. B. `latest`)
   - **IMAGE ID**: Eindeutige Kennung
   - **CREATED**: Wann das Image erstellt wurde
   - **SIZE**: Groae des Images

## Wichtige Befehle

```bash
# Alle Images anzeigen
sudo docker images

# Details zu einem Image anzeigen
sudo docker inspect comfyui-custom-torch271

# Nicht mehr benotigte Images loschen
sudo docker rmi IMAGE_ID
```

## Typische Fehler

- **Fehler**: `Unable to find image 'comfyui-custom:latest' locally`
  - **Ursache**: Das angegebene Image existiert nicht oder hat einen anderen Namen.
  - **Losung**: Mit `sudo docker images` den genauen Namen prufen.

- **Fehler**: Altes Image aus Gewohnheit verwendet
  - **Ursache**: In Skripten oder der Befehlshistorie steht noch der alte Image-Name.
  - **Losung**: Immer `comfyui-custom-torch271` verwenden, nicht `comfyui-custom`.

## Merksatz

Das Image ist die Backupsicherung deiner eingerichteten Umgebung. Der Container ist das, was daraus gestartet wird.
