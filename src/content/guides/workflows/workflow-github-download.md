---
title: "Wie lade ich einen Workflow von GitHub?"
description: "ComfyUI-Workflows direkt per Terminal von GitHub herunterladen – mit dem richtigen Raw-Link."
difficulty: "anfanger"
topic: "workflows"
tags: ["workflows", "github", "download", "wget", "raw"]
publishedAt: 2025-03-24
featured: false
readingTimeMinutes: 5
---

## Frage

Wie lade ich eine Workflow-JSON per Terminal herunter?

## Kurze Antwort

```bash
wget -c --show-progress -O "workflow.json" "RAW_GITHUB_LINK"
```

Wichtig: Fur `wget` braucht man den **Raw-Link**, nicht die normale GitHub-Ansicht.

## Erklarung

GitHub zeigt Dateien standardmaBig in einer Web-Oberflache an (mit Syntax-Highlighting, Header, Footer). Wenn du diese URL mit `wget` aufrufst, ladt du HTML-Code herunter, nicht die reine JSON-Datei.

Der **Raw-Link** liefert den reinen Dateiinhalt. So findest du ihn:

1. Auf GitHub zur gewunschten Workflow-Datei navigieren (`.json`)
2. Auf den **"Raw"**-Button klicken (oben rechts im Code-Bereich)
3. Die URL aus der Adresszeile kopieren – das ist der Raw-Link

Der Raw-Link sieht typischerweise so aus:
```text
https://raw.githubusercontent.com/USER/REPO/main/workflows/mein_workflow.json
```

## Schritt-fur-Schritt: Workflow von GitHub laden

1. Raw-Link von GitHub kopieren.

2. Per SSH auf den Server verbinden:
   ```bash
   ssh m4z-d1t@hal9000.skim.th-owl.de
   ```

3. Workflow herunterladen:
   ```bash
   wget -c --show-progress -O /data/pool/m4z-d1t/comfyui-project/workflows/mein_workflow.json "https://raw.githubusercontent.com/..."
   ```

4. Prufen, ob die Datei da ist:
   ```bash
   cat /data/pool/m4z-d1t/comfyui-project/workflows/mein_workflow.json | head -5
   ```
   Die ersten Zeilen sollten JSON-Code zeigen, nicht HTML.

5. ComfyUI im Browser neu laden (F5). Der Workflow erscheint im Workflow-Menu.

## Wichtige Befehle

```bash
# Workflow von GitHub laden
wget -O /data/pool/m4z-d1t/comfyui-project/workflows/name.json "RAW_LINK"

# Prufen, ob die Datei JSON enthalt (kein HTML):
head -1 /data/pool/m4z-d1t/comfyui-project/workflows/name.json
# Sollte mit { oder [ beginnen

# Falls Permissions das Speichern verhindern, lokal speichern und Drag-and-drop:
wget -O ~/Downloads/workflow.json "RAW_LINK"
```

## Typische Fehler

- **Fehler**: Workflow erscheint nicht in ComfyUI
  - **Ursache 1**: Datei wurde in HTML statt JSON heruntergeladen (falscher Link)
  - **Ursache 2**: Permission-Problem im `workflows/`-Ordner
  - **Losung**: Raw-Link verwenden oder alternativ per Drag-and-drop importieren

- **Fehler**: Datei ist da, aber ComfyUI zeigt "Invalid workflow"
  - **Ursache**: Die JSON-Datei ist kein gultiger ComfyUI-Workflow.
  - **Losung**: Prufen, ob es wirklich eine ComfyUI-Workflow-JSON ist (enthalt in der Regel `"nodes"` und `"links"`).

## Merksatz

Raw-Link = `raw.githubusercontent.com`. Normaler GitHub-Link = HTML-Seite, nicht die Datei. Immer den Raw-Button klicken.
