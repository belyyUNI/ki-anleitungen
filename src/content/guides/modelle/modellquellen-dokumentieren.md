---
title: "Wie dokumentiere ich Modellquellen sauber?"
description: "Zu jedem Modell sollten Quelle, Dateiname, Zielordner, Download-Link und Einsatzzweck dokumentiert werden."
difficulty: "anfanger"
topic: "modelle"
tags: ["dokumentation", "modelle", "quellen", "organisation", "downloads"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 6
---

## Frage

Wie sollte ich notieren, woher ein Modell stammt?

## Kurze Antwort

Zu jedem Modell sollten Quelle, Dateiname, Zielordner, Download-Link und Einsatzzweck dokumentiert werden.

## Erklarung

Modelle sind die wertvollste Ressource in einem KI-Workflow. Ohne Dokumentation weiss man spater nicht mehr, woher ein Modell kam, welche Variante es ist, und ob es durch eine neuere Version ersetzt werden sollte.

### Warum Modellquellen dokumentieren?

- Updates: Wenn eine neue Version erscheint, weisst du, wo du suchen musst
- Teamarbeit: Andere konnen das Setup nachvollziehen
- Reproduzierbarkeit: Ein Workflow von vor drei Monaten soll wieder funktionieren
- Lizenzkonformitat: Was darfst du mit dem Output machen?

## Schritt-fur-Schritt: Modelltabelle anlegen

Erstelle eine zentrale `modelle.md` mit einer Tabelle:

```markdown
# Modellinventar

| Modellgruppe | Datei | Quelle | Zielordner | Zweck | Getestet | Workflow |
|---|---|---|---|---|---|---|
| Kandinsky 5 Pro | kandinsky5pro_i2v_sft_5s.safetensors | Hugging Face | models/diffusion_models/kandinsky | Image-to-Video | ja | video_kandinsky5_i2v |
| Flux Dev | flux1-dev-fp8.safetensors | Hugging Face | models/diffusion_models/flux | Text-to-Image | ja | txt2img_flux_dev |
```

### Empfohlene Felder

| Feld | Beispiel | Warum wichtig |
|---|---|---|
| Modellgruppe | Kandinsky 5 Pro | Gruppierung verwandter Modelle |
| Dateiname | kandinsky5pro_i2v_sft_5s.safetensors | Exakter Dateiname fur Workflows |
| Quelle | Hugging Face / CivitAI / Direktlink | Wo gibt es Updates? |
| Zielordner | models/diffusion_models/kandinsky | Pfad im Projekt |
| Download-Link | https://huggingface.co/... | Direkter Zugriff |
| Zweck | Image-to-Video | Wofur wird es verwendet? |
| Getestet | ja/nein | Wurde es erfolgreich geladen? |
| Workflow | video_kandinsky5_i2v | Welcher Workflow nutzt es? |
| Variante | fp8 / fp16 / bf16 | Welche Prazision? |
| Datum | 2026-05-06 | Wann heruntergeladen? |
| Lizenz | CC BY-NC 4.0 | Nutzungsrechte |

## Beispiel: Ausgefullte Tabelle

```markdown
| Modellgruppe | Datei | Quelle | Zielordner | Zweck | Getestet |
|---|---|---|---|---|---|
| Kandinsky 5 Pro | kandinsky5pro_i2v_sft_5s.safetensors | Hugging Face | models/diffusion_models/kandinsky/ | Image-to-Video | ja |
| Flux.1 Dev | flux1-dev-fp8.safetensors | Hugging Face | models/diffusion_models/flux/ | Text-to-Image | ja |
| SDXL Base | sd_xl_base_1.0.safetensors | Hugging Face | models/checkpoints/ | Text-to-Image | ja |
| T5 Encoder | t5-v1_1-xxl-encoder-bf16.safetensors | Hugging Face | models/text_encoders/ | Text-Encoding | ja |
```

## Wichtige Befehle

```bash
# Alle Modelle mit Grossen auflisten
find models -name "*.safetensors" -exec ls -lh {} \;

# Nach einem bestimmten Modell suchen
find models -name "*kandinsky*" -exec ls -lh {} \;

# Alle Modellordner mit Inhalt
for dir in models/*/; do echo "=== $dir ==="; ls -lh "$dir" 2>/dev/null; done
```

## Typische Fehler

- **Fehler**: Modell herunterladen, aber Quelle nicht notieren.
  - **Folge**: Wenn das Modell ein Update braucht, weiss man nicht, wo man suchen muss.
  - **Losung**: Nach jedem Download Quelle, Link und Zweck in der Modelltabelle notieren.

- **Fehler**: Dateinamen in der Doku verkurzen oder abandern.
  - **Folge**: Die Dokumentation passt nicht mehr zu den tatsachlichen Dateien.
  - **Losung**: Exakte Dateinamen in die Tabelle kopieren (`ls` verwenden, nicht aus dem Kopf).

## Merksatz

Ein Modell ohne Quelle ist spater schwer zu aktualisieren oder zu ersetzen.
