---
title: "Warum kann ich nicht in den workflows-Ordner schreiben?"
description: "Permission denied im workflows-Ordner – Ursachen und der sichere Weg, das Problem zu umgehen."
difficulty: "fortgeschritten"
topic: "workflows"
tags: ["workflows", "permission", "ordner", "comfyui", "rechte"]
publishedAt: 2025-03-22
featured: false
readingTimeMinutes: 5
---

## Frage

Warum kommt `Permission denied`, wenn ich eine Workflow-Datei per Terminal speichern will?

## Kurze Antwort

Der Ordner kann **root** gehoren oder von ComfyUI selbst erzeugt worden sein. Wenn er nicht leer ist, sollte man ihn nicht loschen. Sicherer ist der **Import uber die Browseroberflache** (Drag-and-drop).

## Erklarung

Der `workflows/`-Ordner wird von ComfyUI verwaltet. Je nachdem, wie der Container gestartet wurde, gehoren Dateien und Ordner dem Benutzer `root` oder dem Container-internen Benutzer. Wenn du als `m4z-d1t` in diesen Ordner schreiben willst, kann das mit `Permission denied` fehlschlagen.

### Warum das heikel ist

- Wenn du die Berechtigungen mit `chmod` oder `chown` anderst, kann ComfyUI selbst nicht mehr in den Ordner schreiben.
- Wenn du den Ordner loschst und neu anlegst, verliert ComfyUI den Zugriff.
- Die einfachste und sicherste Losung ist: **Drag-and-drop im Browser**.

### Wann Terminal-Zugriff notig ist

Manchmal willst du Workflows automatisiert herunterladen (z. B. mit `wget`). In diesem Fall musst du sicherstellen, dass die Rechte richtig sind.

## Schritt-fur-Schritt: Workflow per Terminal speichern

1. Rechte des Ordners prufen:
   ```bash
   ls -ld /data/pool/m4z-d1t/comfyui-project/workflows
   ```

2. Wenn der Ordner root gehort und du als `m4z-d1t` schreiben musst:
   ```bash
   # Nur den workflow-Ordner freigeben:
   sudo chown m4z-d1t /data/pool/m4z-d1t/comfyui-project/workflows
   ```

3. Workflow-Datei speichern:
   ```bash
   wget -O /data/pool/m4z-d1t/comfyui-project/workflows/mein_workflow.json "RAW_LINK"
   ```

4. Danach ComfyUI im Browser neu laden (F5). Der Workflow erscheint im Workflow-Menu.

## Wichtige Befehle

```bash
# Rechte anzeigen
ls -ld /data/pool/m4z-d1t/comfyui-project/workflows

# Besitzer andern (mit Vorsicht)
sudo chown m4z-d1t /data/pool/m4z-d1t/comfyui-project/workflows

# Schreibrechte geben
sudo chmod u+w /data/pool/m4z-d1t/comfyui-project/workflows
```

## Typische Fehler

- **Fehler**: `chown` oder `chmod` zerstort ComfyUI-Zugriff
  - **Folge**: ComfyUI kann eigene Workflows nicht mehr speichern
  - **Losung**: Ordner wieder auf die ursprunglichen Rechte setzen oder ComfyUI die Speicherfunktion nicht kaputt machen. Drag-and-drop ist sicherer.

## Merksatz

Der `workflows/`-Ordner ist ComfyUI-Territorium. Fur eigene Importe: Lieber Drag-and-drop im Browser als im Terminal kampfen.
