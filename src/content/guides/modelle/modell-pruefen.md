---
title: "Wie prufe ich, ob ein Modell angekommen ist?"
description: "Dateigroae, Existenz und Vollstandigkeit von heruntergeladenen Modellen prufen."
difficulty: "anfanger"
topic: "modelle"
tags: ["modelle", "download", "prufen", "ls", "dateigroae"]
publishedAt: 2025-03-05
featured: false
readingTimeMinutes: 4
---

## Frage

Wie sehe ich, ob die Datei wirklich heruntergeladen wurde?

## Kurze Antwort

```bash
ls -lh /data/pool/m4z-d1t/comfyui-project/models/ORDNER
```

`-lh` zeigt Dateigroaen lesbar an (z. B. `6.9G` statt `7245638495`).

## Erklarung

Nach einem langen Download willst du sicher sein, dass die Datei vollstandig und am richtigen Ort angekommen ist. Drei Dinge solltest du prufen:

1. **Existenz**: Ist die Datei uberhaupt da?
2. **Groae**: Stimmt die Groae mit der erwarteten uberein? (Eine kleine Datei deutet auf einen fehlgeschlagenen Download hin.)
3. **Ort**: Liegt die Datei im richtigen Ordner?

### Optionen von ls

| Befehl | Ausgabe | Nutzen |
|--------|---------|--------|
| `ls` | Nur Dateinamen | Schneller Check |
| `ls -l` | Groae in Bytes | Unleserlich fur groae Dateien |
| `ls -lh` | Groae in KB/MB/GB | **Empfohlen** – gut lesbar |
| `ls -la` | Mit versteckten Dateien | Prufen auf versteckte temporare Dateien |

## Schritt-fur-Schritt: Download prufen

1. In den entsprechenden Modellordner wechseln:
   ```bash
   cd /data/pool/m4z-d1t/comfyui-project/models/checkpoints
   ```

2. Dateien mit lesbaren Groaen anzeigen:
   ```bash
   ls -lh
   ```
   Beispielausgabe:
   ```text
   -rw-r--r-- 1 m4z-d1t m4z-d1t 6.9G Mar  5 10:23 sd_xl_base_1.0.safetensors
   ```

3. Prufen, ob die Groae plausibel ist:
   - Ein Checkpoint ist typischerweise 2-7 GB
   - Eine LoRA ist typischerweise 10-300 MB
   - Ein VAE ist typischerweise 100-500 MB

4. Nur eine bestimmte Datei prufen:
   ```bash
   ls -lh sd_xl_base_1.0.safetensors
   ```

## Wichtige Befehle

```bash
# Einzelne Datei prufen
ls -lh models/checkpoints/mein_modell.safetensors

# Alle Modellordner mit Groaen anzeigen
du -sh models/*/

# Sortiert nach Groae (groate zuerst)
du -sh models/checkpoints/* | sort -rh

# Nur .safetensors-Dateien anzeigen
find models/ -name "*.safetensors" -ls
```

## Typische Fehler

- **Fehler**: Datei existiert, aber ComfyUI zeigt sie nicht an
  - **Ursache**: Datei liegt im falschen Unterordner von `models/`
  - **Losung**: Mit `mv` in den korrekten Ordner verschieben

- **Fehler**: Dateigroae ist 0 oder sehr klein
  - **Ursache**: Download fehlgeschlagen oder abgebrochen
  - **Losung**: Mit `wget -c` fortsetzen oder neu starten

## Merksatz

`ls -lh` nach jedem Download. 6.9 GB sehen im Terminal gut aus – 0 Byte sind ein Problem.
