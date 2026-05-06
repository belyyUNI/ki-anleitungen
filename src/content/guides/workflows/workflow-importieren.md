---
title: "Wie importiere ich einen Workflow in ComfyUI?"
description: "Workflow-JSONs in ComfyUI laden – per Drag-and-drop im Browser, die einfachste Methode."
difficulty: "anfanger"
topic: "workflows"
tags: ["workflows", "import", "comfyui", "json", "drag-and-drop"]
publishedAt: 2025-03-20
featured: false
readingTimeMinutes: 4
---

## Frage

Wie bekomme ich eine Workflow-JSON-Datei in ComfyUI?

## Kurze Antwort

Am einfachsten ladst du die JSON-Datei lokal herunter und ziehst sie per **Drag-and-drop** in die ComfyUI-Oberflache im Browser.

## Erklarung

ComfyUI-Workflows werden als JSON-Dateien gespeichert. Es gibt mehrere Wege, einen Workflow zu importieren. Die einfachste Methode ist Drag-and-drop, weil sie keine Terminal-Befehle erfordert und mit den ComfyUI-eigenen Ordnern keine Konflikte verursacht.

### Import-Methoden im Vergleich

| Methode | Aufwand | Risiko |
|---------|---------|--------|
| **Drag-and-drop** | Am einfachsten | Keines |
| Workflow-Datei im `workflows/`-Ordner | Mittel | Permission-Probleme moglich |
| JSON-Inhalt kopieren & einfügen | Umstandlich | Fehleranfallig |

**Drag-and-drop ist die empfohlene Methode.** Sie funktioniert zuverlassig und vermeidet die Permission-Probleme, die bei direkten Dateioperationen im `workflows/`-Ordner auftreten konnen.

## Schritt-fur-Schritt: Workflow per Drag-and-drop importieren

1. Workflow-JSON-Datei auf deinen **lokalen Rechner** herunterladen.

2. ComfyUI im Browser offnen:
   ```text
   http://hal9000.skim.th-owl.de:8188
   ```

3. JSON-Datei vom Dateimanager (Finder/Explorer) in das ComfyUI-Fenster **ziehen und loslassen**.

4. Der Workflow wird sofort mit allen Nodes geladen.

5. Prufen, ob rote Nodes erscheinen (fehlende Custom Nodes oder Modelle).

## Wichtige Befehle

Falls du den Workflow per Terminal herunterladen und dann per Drag-and-drop verwenden willst:

```bash
# Workflow lokal herunterladen (auf deinem Mac/PC, nicht auf dem Server):
wget -O mein_workflow.json "RAW_GITHUB_LINK"

# Dann die JSON-Datei vom lokalen Ordner in ComfyUI ziehen.
```

## Typische Fehler

- **Fehler**: Nichts passiert beim Drag-and-drop
  - **Ursache**: Die Datei ist keine gultige ComfyUI-JSON.
  - **Losung**: Datei mit einem Texteditor offnen und prufen, ob es gultiges JSON ist.

- **Fehler**: "Missing Node Types" in rot
  - **Ursache**: Custom Nodes fehlen
  - **Losung**: Siehe Anleitung zu Custom Nodes – die benotigten Nodes mussen in `custom_nodes/` installiert sein.

- **Fehler**: Workflow zeigt "Model not found"
  - **Ursache**: Die referenzierten Modelle sind nicht vorhanden oder unter anderem Namen gespeichert.
  - **Losung**: Modelle aus der Dropdown-Liste neu auswahlen.

## Merksatz

Drag-and-drop ist der zuverlassigste Importweg. Keine Permission-Probleme, keine falschen Pfade – einfach reinziehen und fertig.
