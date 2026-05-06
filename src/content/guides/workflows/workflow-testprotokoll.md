---
title: "Workflow-Testprotokoll: Vorlage fur neue Workflows"
description: "Eine Vorlage, um neue Workflows systematisch zu dokumentieren – Zweck, Modelle, Nodes, GPU, Parameter und Fehler."
difficulty: "anfanger"
topic: "workflows"
tags: ["workflow", "test", "dokumentation", "vorlage", "protokoll"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 4
---

## Frage

Wie dokumentiere ich einen neuen Workflow, bevor ich ihn in die Hauptsammlung aufnehme?

## Kurze Antwort

Jeder neue Workflow sollte mit einem kurzen Testprotokoll dokumentiert werden: Zweck, Quelle, benotigte Modelle und Nodes, GPU-Einstellungen, Testparameter, aufgetretene Fehler und deren Losung.

## Erklarung

Bevor ein Workflow in die taegliche Nutzung geht, sollte er getestet und dokumentiert sein. Ein Protokoll macht den Unterschied zwischen "hat bei mir funktioniert" und "ist reproduzierbar".

### Die Vorlage

```markdown
# Workflow-Test: NAME

## Zweck
Wofur ist der Workflow? (Text-to-Image, Image-to-Video, Upscale, …)

## Quelle
Woher stammt der Workflow? (YouTube, CivitAI, OpenArt, eigene Arbeit)

## Benotigte Modelle
| Modell | Dateiname | Ordner |
|---|---|---|

## Benotigte Nodes
| Custom Node | Version / git hash |
|---|---|

## GPU
- GPU-Index: (0, 1, …)
- VRAM-Verbrauch:

## Parameter
- Auflosung:
- Steps:
- CFG:
- Batch-Size:
- Frames (bei Video):
- Seed:

## Fehler
Welche Fehler traten auf?

## Losung
Wie wurden sie behoben?

## Ergebnis
Hat der Workflow funktioniert? Ausgabedatei:

## Status
getestet / fehlerhaft / ubernommen
```

## Schritt-fur-Schritt: Workflow testen und protokollieren

1. **Workflow importieren** (JSON oder PNG in ComfyUI laden).

2. **Fehlende Nodes identifizieren:** Rote Nodes? ComfyUI-Manager zeigt fehlende an.

3. **Fehlende Nodes installieren**, Container neu starten.

4. **Fehlende Modelle identifizieren:** Welche Dateinamen werden in den Loadern erwartet?

5. **Modelle herunterladen** und in die richtigen Ordner legen.

6. **Ersten Testlauf mit kleinen Einstellungen:**
   - Niedrige Auflosung (512x512)
   - Wenige Steps (10-15)
   - Kurzes Video (1-2s)

7. **Ergebnis prufen**, Fehler notieren.

8. **Bei Erfolg: Volle Parameter testen.**

9. **Protokoll ausfullen** und Workflow speichern.

## Wichtige Befehle

```bash
# Custom Nodes prufen
sudo docker logs --tail 500 comfyui_data | grep -i "import failed"

# Modell vorhanden?
find models -name "*gesuchter_name*"

# GPU wahrend des Tests beobachten
watch -n 1 nvidia-smi
```

## Typische Fehler

- **Fehler**: Workflow ohne Test mit vollen Parametern starten.
  - **Folge**: Out-of-Memory-Abbruch nach langer Verarbeitungszeit.
  - **Losung**: Erst mit kleinsten Einstellungen testen, dann hochskalieren.

- **Fehler**: Protokoll erst Tage spater ausfullen.
  - **Folge**: Details sind vergessen, die Doku ist luckenhaft.
  - **Losung**: Protokoll direkt wahrend des Tests ausfullen.

- **Fehler**: Seed und Parameter nicht notieren.
  - **Folge**: Ergebnis ist nicht reproduzierbar.
  - **Losung**: Alle Parameter im Protokoll festhalten.

## Merksatz

Ein Workflow ohne Protokoll ist ein Ratsel fur dein zukunftiges Ich.
