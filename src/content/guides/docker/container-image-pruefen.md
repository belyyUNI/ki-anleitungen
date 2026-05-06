---
title: "Wie prufe ich, welches Image ein Container nutzt?"
description: "So findest du heraus, ob dein ComfyUI-Container wirklich mit dem richtigen Image lauft."
difficulty: "anfanger"
topic: "docker"
tags: ["docker", "image", "container", "comfyui", "inspect", "einsteiger"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 4
---

## Frage

Wie sehe ich, ob mein ComfyUI-Container wirklich mit dem richtigen Image lauft?

## Kurze Antwort

Mit `docker ps` oder `docker inspect` kann man prufen, welches Image ein laufender Container verwendet. Das ist wichtig, weil im Projekt das neue Image `comfyui-custom-torch271` verwendet werden soll.

## Erklarung

Wenn ein neues Image erstellt wurde (z. B. nach einem Torch-Upgrade), lauft ein bestehender Container weiter mit dem **alten** Image. Nur wenn der Container neu erstellt wird (`docker rm` + `docker run`), verwendet er das neue Image.

### Warum das wichtig ist

Stell dir vor, du hast einen Fehler behoben, ein neues Image committed, den Container neu gestartet – und der Fehler ist immer noch da. Dann lauft der Container wahrscheinlich noch mit dem alten Image.

## Schritt-fur-Schritt

1. **Laufende Container anzeigen (mit Image-Spalte):**
   ```bash
   sudo docker ps
   ```
   Die Spalte `IMAGE` zeigt das verwendete Image.

2. **Detailliert prufen, welches Image ein bestimmter Container nutzt:**
   ```bash
   sudo docker inspect comfyui_data | grep Image
   ```
   Ausgabe:
   ```text
   "Image": "sha256:abc123...",
   "Image": "comfyui-custom-torch271"
   ```

3. **Alle verfugbaren Images anzeigen:**
   ```bash
   sudo docker images | grep comfyui
   ```

4. **Wenn das Image nicht stimmt:** Container neu erstellen mit dem richtigen Image.

## Wichtige Befehle

```bash
# Laufende Container mit Image
sudo docker ps

# Image eines bestimmten Containers
sudo docker inspect comfyui_data | grep Image

# Alle lokalen Images
sudo docker images

# Alle comfyui-Images
sudo docker images | grep comfyui

# Container neu erstellen mit neuem Image
sudo docker stop comfyui_data
sudo docker rm comfyui_data
sudo docker run -d --name comfyui_data ... comfyui-custom-torch271
```

## Typische Fehler

- **Fehler**: Neues Image committed, Container neu gestartet – aber der Container lauft noch mit dem alten Image.
  - **Ursache**: `docker start` verwendet das Image, mit dem der Container **erstellt** wurde. Nur `docker rm` + `docker run` wechselt das Image.
  - **Losung**: `sudo docker inspect comfyui_data | grep Image` prufen und ggf. Container neu erstellen.

- **Fehler**: Mehrere ahnliche Images im System, das falsche wird verwendet.
  - **Losung**: Mit `sudo docker images | grep comfyui` alle Images auflisten und das richtige auswahlen.

## Merksatz

Wenn ein geloster Fehler zuruckkommt, prufe zuerst, ob du wirklich das richtige Image nutzt.
