---
title: "Was sind Custom Nodes?"
description: "Warum in Workflows manchmal Nodes fehlen – und was Custom Nodes mit ComfyUI-Erweiterungen zu tun haben."
difficulty: "anfanger"
topic: "comfyui"
tags: ["custom-nodes", "comfyui", "workflows", "grundlagen"]
publishedAt: 2025-04-01
featured: false
readingTimeMinutes: 5
---

## Frage

Was sind Custom Nodes und wozu braucht man sie?

## Kurze Antwort

Custom Nodes erweitern ComfyUI um zusatzliche Funktionen, die nicht in der Standard-Installation enthalten sind. Wenn ein Workflow solche Nodes nutzt, mussen die entsprechenden Node-Pakete in `custom_nodes/` installiert sein.

## Erklarung

ComfyUI kommt mit einer Grundausstattung an Nodes: Loader, Sampler, VAEDecode, Preview und einige mehr. Aber viele Workflows nutzen zusatzliche Nodes von Drittanbietern. Die sind nicht Teil von ComfyUI selbst, sondern mussen separat installiert werden.

### Beispiele fur Custom Nodes

- **ComfyUI-VideoHelperSuite**: Video laden und speichern
- **ComfyUI-KJNodes**: Erweiterte Steuerung und Optimierung
- **WAS Node Suite**: Bildbearbeitung und Textverarbeitung
- **ComfyUI_Comfyroll_CustomNodes**: UI-Hilfen und Utilities

### Woran erkenne ich fehlende Custom Nodes?

Wenn du einen Workflow importierst und **rote Nodes** siehst, fehlen die entsprechenden Custom-Node-Pakete. Uber dem roten Node steht der fehlende Node-Typ, z. B. `VHS_VideoCombine` oder `KJNodes_ImageConcat`.

## Schritt-fur-Schritt: Fehlende Custom Nodes identifizieren

1. Workflow per Drag-and-drop importieren.

2. Rote Nodes suchen und den Node-Namen notieren (z. B. `VHS_VideoCombine`).

3. Node-Namen googlen oder auf GitHub suchen:
   ```text
   VHS_VideoCombine github
   ```

4. Das Github-Repo identifizieren (z. B. `Kosinkadink/ComfyUI-VideoHelperSuite`).

5. Repo in `custom_nodes/` installieren (siehe Anleitung "Custom Nodes manuell installieren").

## Wichtige Befehle

```bash
# Prufen, welche Custom Nodes bereits installiert sind:
ls /data/pool/m4z-d1t/comfyui-project/custom_nodes/

# ComfyUI-Logs nach fehlenden Nodes durchsuchen:
sudo docker logs --tail 100 comfyui_data | grep -i "missing\|failed\|error"
```

## Typische Fehler

- **Fehler**: Node ist rot, aber das Repo ist in `custom_nodes/`
  - **Ursache**: Das Repo ist da, aber der Import schlagt fehl (fehlende Abhangigkeiten, Build-Problem).
  - **Losung**: Logs prufen – siehe "Warum wird ein installierter Node trotzdem als fehlend angezeigt?"

- **Fehler**: Dutzende rote Nodes
  - **Ursache**: Ein ganzes Set von Custom Nodes fehlt (z. B. KJNodes).
  - **Losung**: Alle benotigten Repos nacheinander installieren.

## Merksatz

Custom Nodes sind das Plugin-System von ComfyUI. Rote Nodes heiaen: "Bitte installiere mich zuerst in custom_nodes/".
