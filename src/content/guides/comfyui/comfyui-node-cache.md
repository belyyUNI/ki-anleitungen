---
title: "Wie erkenne ich, ob ComfyUI einen Node nur falsch cached?"
description: "Warum ComfyUI manchmal Missing Nodes anzeigt, obwohl sie installiert sind – und wie du das behebst."
difficulty: "fortgeschritten"
topic: "comfyui"
tags: ["comfyui", "cache", "missing-nodes", "troubleshooting", "logs"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 6
---

## Frage

Warum zeigt ComfyUI manchmal Missing Nodes an, obwohl ich sie installiert habe?

## Kurze Antwort

ComfyUI oder der Browser konnen alte Zustande anzeigen. Wichtig sind die Container-Logs. Wenn der Node dort ohne Importfehler geladen wird, ist die rote Anzeige eventuell veraltet oder workflowbezogen.

## Erklarung

Das ComfyUI-Frontend (Browser) kommuniziert mit dem ComfyUI-Backend (Container). Wenn der Container neu gestartet wird, kann der Browser noch alte Daten im Cache haben. Dann zeigt er rote "Missing Nodes" an, obwohl im Backend alles in Ordnung ist.

### Die drei Cache-Ebenen

1. **Browser-Cache** – Der Browser speichert die alte ComfyUI-Oberflache
2. **Workflow-Cache** – Der geladene Workflow referenziert Nodes, die es in dieser Form nicht mehr gibt
3. **ComfyUI-Cache** – Interne Caches von Python-Modulen

### Symptome eines Cache-Problems

- Rote Nodes, aber die Logs zeigen keinen Import-Fehler
- Nodes erscheinen nach einem harten Browser-Reload plotzlich
- Die Fehlermeldung verschwindet, wenn du den Workflow neu offnest

## Schritt-fur-Schritt: Cache-Problem beheben

1. **Browser hart neu laden:**
   - **macOS**: `Cmd + Shift + R`
   - **Windows/Linux**: `Ctrl + Shift + R`
   - Oder: `Cmd + Shift + Delete` und Cache leeren.

2. **Container neu starten:**
   ```bash
   sudo docker stop comfyui_data
   sudo docker start comfyui_data
   ```

3. **Logs prufen – das ist die Wahrheit:**
   ```bash
   sudo docker logs --tail 300 comfyui_data | grep -i -E "import failed|traceback|error"
   ```
   Wenn hier keine Fehler zu dem Node stehen, liegt das Problem wahrscheinlich im Frontend.

4. **Workflow neu offnen:**
   Schliesse den aktuellen Workflow (ohne zu speichern) und importiere die JSON erneut.

5. **Missing-Node-Liste erneut prufen:**
   ComfyUI zeigt beim Start eine Liste fehlender Nodes. Nach einem Reload sollte diese Liste aktuell sein.

6. **ComfyUI-Manager-Cache leeren (falls vorhanden):**
   Im ComfyUI Manager gibt es eine Option, den Cache zu leeren.

## Wichtige Befehle

```bash
# Container neu starten
sudo docker stop comfyui_data
sudo docker start comfyui_data

# Logs nach Import-Fehlern durchsuchen
sudo docker logs --tail 300 comfyui_data | grep -i -E "import failed|traceback|error"

# Nur die ersten Zeilen des Starts (Custom-Node-Ladeprozess)
sudo docker logs --tail 500 comfyui_data | grep -i -E "import|custom.node|loading"

# Alle Fehler seit Container-Start
sudo docker logs comfyui_data 2>&1 | grep -i -E "import failed|cannot import|traceback"
```

## Typische Fehler

- **Fehler**: Man installiert einen Node mehrfach, weil die UI ihn immer noch als "missing" anzeigt.
  - **Ursache**: Browser-Cache oder fehlender Container-Neustart.
  - **Losung**: Erst Browser-Cache leeren und Container neu starten, dann Logs prufen.

- **Fehler**: Man verlasst sich auf die rote Anzeige und beachtet die Logs nicht.
  - **Ursache**: Die UI ist ein Hinweis, aber nicht immer aktuell.
  - **Losung**: Die Logs sind der autoritative Zustand. Wenn die Logs sauber sind, ist der Node geladen.

- **Fehler**: Ein Workflow wird gespeichert, obwohl Nodes fehlen.
  - **Folge**: Beim nachsten Offnen sind die Platzhalter-Nodes gespeichert.
  - **Losung**: Workflow erst speichern, wenn alle Nodes sauber geladen sind.

## Merksatz

Die UI ist ein Hinweis. Die Logs sind die Wahrheit.
