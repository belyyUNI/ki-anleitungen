---
title: "Warum wird ein installierter Node trotzdem als fehlend angezeigt?"
description: "Custom Node ist da, aber ComfyUI markiert ihn rot – so findest du den Import-Fehler in den Logs."
difficulty: "fortgeschritten"
topic: "comfyui"
tags: ["custom-nodes", "debugging", "logs", "import", "comfyui"]
publishedAt: 2025-04-07
featured: false
readingTimeMinutes: 6
---

## Frage

Warum bleibt ein Node rot, obwohl das Repo vorhanden ist?

## Kurze Antwort

Das Repo ist eventuell vorhanden, aber beim Start von ComfyUI schlagt der **Import fehl**. Dann muss man die Logs prufen:

```bash
sudo docker logs --tail 300 comfyui_data | grep -i -E "import failed|traceback|error|failed"
```

## Erklarung

Nur weil der Quellcode in `custom_nodes/` liegt, heiat das nicht, dass ComfyUI ihn auch laden kann. Beim Start versucht ComfyUI, jedes Verzeichnis in `custom_nodes/` zu importieren. Wenn einer der folgenden Schritte fehlschlagt, bleibt der Node rot:

1. **Python-Import**: Das Node-Modul lasst sich nicht importieren
2. **Abhangigkeiten**: Benotigte Python-Pakete fehlen
3. **Kompatibilitat**: Der Node braucht eine andere PyTorch- oder ComfyUI-Version
4. **Build-Fehler**: C++/CUDA-Erweiterungen wurden nicht kompiliert
5. **Systembibliotheken**: Es fehlen z. B. `libGL.so.1` oder `ffmpeg`

Die genaue Ursache steht in den **Container-Logs** – dort siehst du den vollstandigen Python-Traceback.

## Schritt-fur-Schritt: Fehlerursache finden

1. Logs vom Container-Start anzeigen:
   ```bash
   sudo docker logs --tail 300 comfyui_data
   ```

2. Nach Fehlern filtern:
   ```bash
   sudo docker logs --tail 300 comfyui_data | grep -i -E "import failed|traceback|cannot import|modulenotfound"
   ```

3. Bei ImportError: Fehlendes Paket nachinstallieren:
   ```bash
   sudo docker exec -it comfyui_data pip install FEHLENDES_PAKET
   ```

4. Bei Systembibliotheks-Fehler (`libGL.so.1 not found`):
   ```bash
   sudo docker exec -u 0 -it comfyui_data bash -lc "apt-get update && apt-get install -y libgl1"
   ```

5. Container neustarten und erneut prufen:
   ```bash
   sudo docker stop comfyui_data
   sudo docker start comfyui_data
   sudo docker logs --tail 20 comfyui_data | grep -i "REPO_NAME"
   ```

## Wichtige Befehle

```bash
# Volle Logs anzeigen
sudo docker logs --tail 500 comfyui_data

# Nur Fehler anzeigen
sudo docker logs --tail 500 comfyui_data | grep -i "error\|failed\|traceback"

# Logs live verfolgen (beim Container-Start)
sudo docker logs -f comfyui_data

# Prüfen, welche Python-Pakete installiert sind
sudo docker exec -it comfyui_data pip list | grep PAKETNAME
```

## Merksatz

Roter Node = Logs lesen. Der Traceback verrat dir genau, was fehlt – meist ein fehlendes pip-Paket oder eine Systembibliothek.
