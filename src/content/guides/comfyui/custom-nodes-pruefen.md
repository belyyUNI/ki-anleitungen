---
title: "Wie prufe ich, welche Custom Nodes installiert sind?"
description: "So findest du heraus, welche Custom-Node-Pakete vorhanden sind – und ob sie auch tatsachlich geladen wurden."
difficulty: "anfanger"
topic: "comfyui"
tags: ["custom-nodes", "comfyui", "logs", "troubleshooting", "einsteiger"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 5
---

## Frage

Wie sehe ich, welche Custom-Node-Pakete im Projekt vorhanden sind?

## Kurze Antwort

Die installierten Custom Nodes liegen im Ordner `custom_nodes`. Zusatzlich sollte man die ComfyUI-Logs prufen, weil ein vorhandener Ordner nicht bedeutet, dass der Node auch erfolgreich geladen wurde.

## Erklarung

Custom Nodes bestehen aus zwei Teilen: dem Quellcode-Ordner in `custom_nodes/` und dem tatsachlich geladenen Modul in ComfyUI. Ein Ordner kann vorhanden sein, aber der Import kann trotzdem fehlschlagen – zum Beispiel weil Python-Abhangigkeiten fehlen.

### Was "vorhanden" vs. "geladen" bedeutet

- **Vorhanden**: Der Ordner existiert im Dateisystem unter `custom_nodes/`
- **Geladen**: ComfyUI hat das Modul beim Start erfolgreich importiert und der Node steht im Workflow zur Verfugung

Nur weil der Ordner da ist, heisst das nicht, dass der Node funktioniert. Umgekehrt kann ein Node fehlen, obwohl der Ordner da ist – zum Beispiel nach einem fehlgeschlagenen Update.

## Schritt-fur-Schritt: Custom Nodes prufen

1. **Ordner auf dem Host anzeigen:**
   ```bash
   ls -la /data/pool/m4z-d1t/comfyui-project/custom_nodes
   ```

2. **Ordner im Container anzeigen:**
   ```bash
   sudo docker exec -it comfyui_data ls -la /app/custom_nodes
   ```

3. **ComfyUI-Logs nach Custom-Node-Status durchsuchen:**
   ```bash
   sudo docker logs --tail 300 comfyui_data | grep -i -E "import failed|traceback|custom nodes|loaded"
   ```

4. **Nur Import-Fehler anzeigen:**
   ```bash
   sudo docker logs --tail 500 comfyui_data | grep -i -E "import failed|cannot import"
   ```

5. **Nach einem bestimmten Node suchen:**
   ```bash
   sudo docker logs --tail 500 comfyui_data | grep -i "KJNodes"
   ```

## Wichtige Befehle

```bash
# Custom Nodes auf dem Host auflisten
ls -la /data/pool/m4z-d1t/comfyui-project/custom_nodes

# Custom Nodes im Container auflisten
sudo docker exec -it comfyui_data ls -la /app/custom_nodes

# ComfyUI-Logs nach Import-Fehlern filtern
sudo docker logs --tail 300 comfyui_data | grep -i -E "import failed|traceback|custom nodes"

# Git-Status aller Node-Repos prufen
for dir in /data/pool/m4z-d1t/comfyui-project/custom_nodes/*/; do
  echo "=== $(basename "$dir") ==="
  cd "$dir" && git log --oneline -1 2>/dev/null || echo "Kein Git-Repo"
done
```

## Typische Fehler

- **Fehler**: Ein Node-Ordner ist da, aber der Node erscheint nicht in ComfyUI.
  - **Ursache**: Der Import ist fehlgeschlagen (fehlende Dependencies, falsche Python-Version).
  - **Losung**: Logs prufen mit `sudo docker logs --tail 300 comfyui_data | grep -i "import failed"`.

- **Fehler**: Man sucht einen Node im Dateisystem, findet ihn aber nicht.
  - **Ursache**: Der Node wurde nie installiert oder in einen falschen Ordner geklont.
  - **Losung**: In der ComfyUI-Oberflache oder im Workflow den exakten Node-Namen prufen und das passende Repo suchen.

- **Fehler**: Man pruft nur den Host, aber nicht den Container.
  - **Ursache**: Volume-Mounts konnen veraltet sein oder nicht funktionieren.
  - **Losung**: Sowohl Host als auch Container prufen.

## Merksatz

Installiert heisst nicht automatisch geladen.
