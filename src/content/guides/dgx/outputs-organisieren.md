---
title: "Wie sollte ich Outputs organisieren?"
description: "Ordnung im Output-Chaos – mit Unterordnern nach Modell, Datum oder Projekt den Uberblick behalten."
difficulty: "anfanger"
topic: "dgx"
tags: ["outputs", "organisation", "ordnerstruktur", "videos", "bilder", "einsteiger"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 5
---

## Frage

Wie behalte ich bei vielen generierten Bildern und Videos den Uberblick?

## Kurze Antwort

Outputs sollten regelmassig sortiert, umbenannt und dokumentiert werden. Sinnvoll sind Unterordner nach Modell, Workflow, Datum oder Projekt.

## Erklarung

ComfyUI speichert alle Outputs standardmassig im `output/`-Ordner. Nach einigen Tagen aktiver Nutzung entsteht dort schnell ein Chaos aus Hunderten von Dateien mit automatisch generierten Namen wie `ComfyUI_00042_.mp4`. Ohne Struktur findet man gute Ergebnisse spater nicht wieder.

### Ordnerstrategien

**Nach Modell:**
```bash
output/
├── ltx/
├── wan/
├── flux/
├── kandinsky/
├── hunyuan3d/
├── tests/
└── final/
```

**Nach Datum und Projekt:**
```bash
output/
├── 2026-05-04_kandinsky_i2v/
├── 2026-05-05_ltx_audio_i2v/
└── 2026-05-06_flux_charakter_test/
```

**Kombiniert:**
```bash
output/
├── ltx/
│   ├── 2026-05-04_i2v_test/
│   └── 2026-05-05_hd_audio/
├── wan/
│   └── 2026-05-06_t2v_charakter/
```

## Schritt-fur-Schritt

1. **Output-Ordner anzeigen:**
   ```bash
   ls -lh /data/pool/m4z-d1t/comfyui-project/output
   ```

2. **Unterordner anlegen:**
   ```bash
   mkdir -p /data/pool/m4z-d1t/comfyui-project/output/kandinsky
   mkdir -p /data/pool/m4z-d1t/comfyui-project/output/flux
   ```

3. **Dateien einsortieren:**
   ```bash
   mv output/ComfyUI_00042_.mp4 output/kandinsky/
   ```

4. **Gute Ergebnisse markieren:**
   Benenne besonders gelungene Outputs um, z. B.:
   ```bash
   mv output/kandinsky/ComfyUI_00042_.mp4 output/kandinsky/kandinsky_i2v_portrait_final.mp4
   ```

## Wichtige Befehle

```bash
# Output-Ordner anzeigen
ls -lh /data/pool/m4z-d1t/comfyui-project/output

# Unterordner erstellen
mkdir -p /data/pool/m4z-d1t/comfyui-project/output/ORDNERNAME

# Dateien verschieben
mv output/datei.mp4 output/ORDNERNAME/

# Alle Outputs eines bestimmten Datums finden
find output -name "ComfyUI_*" -newer output -mtime -1
```

## Typische Fehler

- **Fehler**: Outputs nie sortieren und spater nicht mehr wissen, welcher Output zu welchem Workflow gehort.
  - **Losung**: Nach jeder Session Outputs in den passenden Unterordner verschieben.

- **Fehler**: Nur den Dateinamen andern, aber nicht dokumentieren, mit welchem Workflow und welchen Parametern die Datei erstellt wurde.
  - **Losung**: Zum Output-Ordner eine kleine `README.md` mit den Workflow-Parametern legen.

- **Fehler**: Alle Outputs fur immer aufheben.
  - **Folge**: Speicherplatz lauft voll.
  - **Losung**: Test-Outputs nach der Session loschen, nur finale Ergebnisse behalten.

## Merksatz

Ein gutes Ergebnis ohne dokumentierten Workflow ist schwer wiederholbar.
