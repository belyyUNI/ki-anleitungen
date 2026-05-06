---
title: "Wie gehe ich mit mehreren Modellvarianten um?"
description: "fp8, fp16, bf16, distilled, dev, pro, lite – was die Bezeichnungen bedeuten und welche Variante du wahlen solltest."
difficulty: "fortgeschritten"
topic: "modelle"
tags: ["modelle", "varianten", "quantisierung", "vram", "fp8", "fp16", "bf16"]
publishedAt: 2026-05-06
featured: true
readingTimeMinutes: 9
---

## Frage

Was mache ich, wenn es mehrere Versionen eines Modells gibt, zum Beispiel fp8, fp16, bf16, distilled, dev, pro oder lite?

## Kurze Antwort

Man sollte Modellvarianten nicht wahllos mischen. Die Variante muss zum Workflow, zum Loader und zum verfugbaren VRAM passen. Grosser bedeutet oft bessere Qualitat, aber auch mehr Speicherbedarf und langere Laufzeit.

## Erklarung

KI-Modelle gibt es in verschiedenen Varianten – nicht aus Willkur, sondern weil unterschiedliche Einsatzzwecke unterschiedliche Anforderungen haben. Die Variante beeinflusst:

1. **VRAM-Verbrauch** – grossere Modelle brauchen mehr GPU-Speicher
2. **Qualitat** – hohere Prazision liefert meist bessere Ergebnisse
3. **Geschwindigkeit** – kleinere Modelle rechnen schneller
4. **Kompatibilitat** – Workflows erwarten oft eine bestimmte Variante

### Prazisionsstufen

| Begriff | Bedeutung | VRAM-Bedarf | Einsatz |
|---------|-----------|-------------|---------|
| fp4 | 4-Bit-Quantisierung | sehr gering | Tests, schnelle Iterationen |
| fp8 | 8-Bit-Quantisierung | gering | guter Kompromiss fur die meisten Workflows |
| fp16 | 16-Bit-Gleitkomma | mittel | hohere Prazision, haufiger Standard |
| bf16 | Brain Floating Point 16 | mittel | oft stabiler fur grosse Modelle als fp16 |

### Variantenbezeichnungen

| Begriff | Bedeutung |
|---------|-----------|
| distilled | Fur Geschwindigkeit optimiert, leichte Qualitatseinbussen |
| dev | Entwicklungs-/Basisvariante |
| pro | Grossere, qualitativ starkere Variante |
| lite | Kleinere Test-/Leichtversion |
| sft | Supervised Fine-Tuned – auf bestimmte Aufgaben trainiert |

### Warum nicht einfach immer die grosste Variante?

Weil sie vielleicht nicht in deinen VRAM passt. Ein fp32-Checkpoint mit 24 GB VRAM-Bedarf lauft nicht auf einer GPU mit 16 GB. Und selbst wenn er passt: Wenn ein fp8-Modell 80 % der Zeit spart und die Qualitat fast gleich ist, ist fp8 die klugere Wahl.

### Warum ist der Dateiname so wichtig?

Ein Workflow erwartet oft eine bestimmte Modellarchitektur. Wenn du `modell-fp8.safetensors` durch `modell-bf16.safetensors` ersetzt, kann es zu `size mismatch`-Fehlern kommen, weil die Gewichte anders dimensioniert sind.

## Schritt-fur-Schritt: Die richtige Variante wahlen

1. **VRAM der GPU prufen:**
   ```bash
   nvidia-smi
   ```

2. **Workflow-Dokumentation lesen.** Welche Variante wird empfohlen?

3. **Mit der kleinsten kompatiblen Variante starten.** Wenn fp8 funktioniert, hast du eine Baseline.

4. **Erst dann grossere Variante testen**, wenn die Qualitat nicht ausreicht.

5. **Nicht mischen.** Wenn der Workflow fur fp8 ausgelegt ist, nicht einfach fp16-Modelle einwechseln.

## Wichtige Befehle

```bash
# Modellgrossen vergleichen
ls -lh models/diffusion_models/ | grep modellname

# VRAM prufen
nvidia-smi

# Dateiname auf Variante prufen
find models/ -name "*modellname*" -exec ls -lh {} \;
```

## Typische Fehler

- **Fehler**: Eine fp16-Variante in einen Workflow laden, der fur fp8 geschrieben wurde.
  - **Folge**: `size mismatch`-Fehler oder unerwartetes Verhalten.
  - **Losung**: Exakt die Variante verwenden, die der Workflow erwartet.

- **Fehler**: Immer die grosste Variante nehmen, "weil sie besser ist".
  - **Folge**: OOM-Fehler, weil der VRAM nicht ausreicht.
  - **Losung**: VRAM prufen und passende Variante wahlen.

- **Fehler**: Varianten nach Gefuhl auswahlen, ohne die Workflow-Doku zu lesen.
  - **Folge**: Stundenlanges Debugging, warum der Workflow nicht funktioniert.
  - **Losung**: Workflow-Dokumentation lesen, bevor man Modelle herunterladt.

## Merksatz

Das beste Modell ist nicht nur das grosste, sondern das grosste Modell, das stabil in deinem Workflow lauft.
