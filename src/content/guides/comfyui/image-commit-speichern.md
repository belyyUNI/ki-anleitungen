---
title: "Wie wurde das neue Image mit PyTorch 2.7.1 erstellt?"
description: "Container aktualisieren und mit docker commit als neues Image speichern – der genaue Ablauf."
difficulty: "fortgeschritten"
topic: "comfyui"
tags: ["docker", "commit", "image", "pytorch", "upgrade", "comfyui"]
publishedAt: 2025-05-02
featured: false
readingTimeMinutes: 5
---

## Frage

Wie wurde aus dem alten Container ein neues Image mit Torch 2.7.1?

## Kurze Antwort

Torch wurde im Container aktualisiert und danach ein neues Image committed:

```bash
sudo docker exec -it comfyui_data pip install --upgrade torch torchvision torchaudio
sudo docker commit comfyui_data comfyui-custom-torch271
```

Das aktuelle Standard-Image ist jetzt:

```bash
comfyui-custom-torch271
```

## Erklarung

`docker commit` speichert den aktuellen Zustand eines Containers als neues Image. Damit kannst du:

- Updates dauerhaft machen
- Mehrere Image-Versionen parallel behalten
- Einfach auf eine altere Version zurucksetzen

Das Vorgehen war:

1. **Container prufen**: Lauft ComfyUI noch normal?
2. **Torch aktualisieren**: `pip install --upgrade torch`
3. **Testen**: Startet ComfyUI mit dem neuen Torch?
4. **Commit**: Container als Image speichern
5. **Ab sofort**: Neue Container mit `comfyui-custom-torch271` starten

## Schritt-fur-Schritt: Image aus Container erstellen

1. Sicherstellen, dass der Container lauft:
   ```bash
   sudo docker ps | grep comfyui_data
   ```

2. Torch aktualisieren:
   ```bash
   sudo docker exec -it comfyui_data pip install --upgrade torch torchvision torchaudio
   ```

3. Prufen, ob die neue Version aktiv ist:
   ```bash
   sudo docker exec -it comfyui_data python3 -c "import torch; print(torch.__version__)"
   ```

4. ComfyUI kurz testen (Browser: F5, Workflow ausfuhren).

5. Container als Image speichern:
   ```bash
   sudo docker commit comfyui_data comfyui-custom-torch271
   ```

6. Prufen, ob das neue Image vorhanden ist:
   ```bash
   sudo docker images | grep comfyui
   ```

## Wichtige Befehle

```bash
# Container als Image speichern
sudo docker commit CONTAINER_NAME NEUES_IMAGE

# Alle Images mit comfyui im Namen
sudo docker images | grep comfyui

# Image-Erstellungsdatum und Groae
sudo docker images comfyui-custom-torch271

# Image-Historie anzeigen
sudo docker history comfyui-custom-torch271
```

## Typische Fehler

- **Fehler**: `docker commit` schlagt fehl
  - **Ursache**: Container-Name falsch oder Container existiert nicht.
  - **Losung**: Mit `sudo docker ps` den korrekten Namen prufen.

- **Fehler**: Image ist plotzlich mehrere GB groaer
  - **Ursache**: `pip install --upgrade` halt alte Versionen im Cache.
  - **Losung**: Cache leeren: `sudo docker exec -it comfyui_data pip cache purge`

## Merksatz

`docker commit` = Speicherpunkt fur den Container-Zustand. Danach kannst du neue Container aus diesem Image starten.
