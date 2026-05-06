---
title: "Wie installiere ich Custom Nodes manuell?"
description: "Custom Nodes ohne ComfyUI Manager installieren – mit git clone, pip install und Container-Neustart."
difficulty: "fortgeschritten"
topic: "comfyui"
tags: ["custom-nodes", "installation", "git", "pip", "docker", "comfyui"]
publishedAt: 2025-04-03
featured: false
readingTimeMinutes: 7
---

## Frage

Wie installiere ich ein Custom-Node-Repo ohne ComfyUI Manager?

## Kurze Antwort

```bash
cd /data/pool/m4z-d1t/comfyui-project/custom_nodes
git clone REPO_URL
sudo docker exec -it comfyui_data pip install -r /app/custom_nodes/REPO_NAME/requirements.txt
sudo docker stop comfyui_data
sudo docker start comfyui_data
```

## Erklarung

Die manuelle Installation von Custom Nodes folgt einem klaren Muster: **Repo klonen → Abhangigkeiten installieren → Neustarten**. Ohne ComfyUI Manager (der meistens nicht im Container lauft) ist dies der Standardweg.

### Warum manuell?

- Der ComfyUI Manager ist nicht in jedem Setup verfugbar
- Manuelle Installation gibt dir volle Kontrolle uber Versionen
- Du verstehst genau, was installiert wird

### Die vier Schritte im Detail

1. **git clone**: Ladt den Quellcode des Nodes in `custom_nodes/`
2. **pip install**: Installiert Python-Abhangigkeiten aus `requirements.txt`
3. **Container-Neustart**: ComfyUI scannt `custom_nodes/` beim Start und ladt neue Nodes
4. **Browser-Neuladen**: Die neuen Nodes erscheinen in der Node-Liste

## Schritt-fur-Schritt: Custom Node installieren

1. Ins Custom-Nodes-Verzeichnis wechseln:
   ```bash
   cd /data/pool/m4z-d1t/comfyui-project/custom_nodes
   ```

2. Repository klonen:
   ```bash
   git clone https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git
   ```

3. Anforderungen installieren:
   ```bash
   sudo docker exec -it comfyui_data pip install -r /app/custom_nodes/ComfyUI-VideoHelperSuite/requirements.txt
   ```

4. Fehlende Systembibliotheken installieren (falls notig):
   ```bash
   sudo docker exec -u 0 -it comfyui_data bash -lc "apt-get update && apt-get install -y libgl1 libglib2.0-0 ffmpeg"
   ```

5. Container neustarten:
   ```bash
   sudo docker stop comfyui_data
   sudo docker start comfyui_data
   ```

6. ComfyUI im Browser neu laden (F5).

## Wichtige Befehle

```bash
# Repo klonen
git clone REPO_URL

# Repo aktualisieren (Update eines bereits installierten Nodes)
cd /data/pool/m4z-d1t/comfyui-project/custom_nodes/REPO_NAME
git pull

# Python-Abhangigkeiten installieren
sudo docker exec -it comfyui_data pip install -r /app/custom_nodes/REPO_NAME/requirements.txt

# Prufen, ob der Node erkannt wurde
sudo docker logs --tail 30 comfyui_data | grep -i "REPO_NAME\|import"
```

## Typische Fehler

- **Fehler**: `git clone` schlagt mit `Permission denied` fehl
  - **Losung**: Siehe "Was mache ich bei Permission denied in custom_nodes?"

- **Fehler**: `pip install` meldet `ModuleNotFoundError`
  - **Ursache**: Python-Pakete fehlen oder die falsche Python-Version wird verwendet.
  - **Losung**: Prufen, ob der Node mit der PyTorch-Version im Container kompatibel ist.

- **Fehler**: Nach der Installation erscheint der Node nicht
  - **Losung**: Container-Logs auf Import-Fehler prufen.

## Merksatz

Custom-Node-Installation = clone + pip + stop + start. Bei jedem neuen Node diesen Vierschritt durchlaufen.
