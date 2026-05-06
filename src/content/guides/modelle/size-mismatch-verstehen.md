---
title: "Wie gehe ich mit 'size mismatch' bei Modellen um?"
description: "Was ein size mismatch-Fehler bedeutet, warum er auftritt und wie du ihn behebst – ohne das Modell mehrfach neu zu starten."
difficulty: "fortgeschritten"
topic: "modelle"
tags: ["size-mismatch", "fehler", "modelle", "troubleshooting", "comfyui", "loader"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 7
---

## Frage

Was bedeutet ein `size mismatch` beim Laden eines Modells?

## Kurze Antwort

Ein `size mismatch` bedeutet, dass die Datei nicht zur erwarteten Modellarchitektur passt. Das ist kein Namensproblem, sondern ein inhaltlich falsches Modell.

## Erklarung

Jedes KI-Modell hat eine interne Struktur aus Gewichtsmatrizen mit bestimmten Dimensionen. Der Loader in ComfyUI erwartet eine bestimmte Struktur – zum Beispiel `[262208, 3840]`. Wenn das geladene Modell eine andere Struktur hat – zum Beispiel `[152064, 3584]` – passt das nicht zusammen. Dann erscheint der Fehler.

### Typische Fehlermeldung

```text
Error(s) in loading state_dict for FluxTransformer2DModel:
size mismatch for x_embedder.weight: copying a param with shape
torch.Size([152064, 3584]) from checkpoint, the shape in current
model is torch.Size([262208, 3840]).
```

### Was diese Zahlen bedeuten

- **checkpoint shape**: Die Dimensionen in der heruntergeladenen Datei
- **expected shape**: Die Dimensionen, die der Loader erwartet

Wenn diese nicht ubereinstimmen, wurde entweder das falsche Modell heruntergeladen oder der falsche Loader verwendet.

### Haufige Ursachen

1. **Falsche Modellvariante** – fp8 statt fp16, Lite statt Pro, Dev statt SFT
2. **Falscher Loader** – Checkpoint Loader statt Diffusion Model Loader
3. **Falsches Modell** – Ein ganz anderes Modell als erwartet
4. **Datei beschaftigt** – Der Download wurde abgebrochen und die Datei ist unvollstandig

## Schritt-fur-Schritt: Size Mismatch beheben

1. **Fehlermeldung genau lesen.** Welche `shape` wird erwartet, welche ist vorhanden?

2. **Nicht umbenennen.** Die Datei einfach umzubenennen lost das Problem nicht.

3. **Nicht mehrfach neu starten.** Ein Neustart andert nichts an der Datei.

4. **Workflow-Dokumentation prufen.** Welches Modell wird exakt erwartet?

5. **Loader-Auswahl prufen.** Ist es der richtige Loader-Typ fur dieses Modell?

6. **Passendes Modell suchen.** Auf Hugging Face oder in der Workflow-Dokumentation das exakt passende Modell finden.

7. **Download prufen.** Mit `ls -lh` sicherstellen, dass die Datei vollstandig ist.

## Wichtige Befehle

```bash
# Dateigrosse und Name prufen
ls -lh models/diffusion_models/

# Nach ahnlichen Modellen suchen
find models -name "*modellname*" -exec ls -lh {} \;

# Modell-Hash prufen (falls verfugbar)
sha256sum models/diffusion_models/datei.safetensors
```

## Typische Fehler

- **Fehler**: Die Datei umbenennen, in der Hoffnung, dass der Loader sie dann akzeptiert.
  - **Warum falsch**: Der Dateiname andert nicht die internen Gewichtsdimensionen.
  - **Losung**: Das richtige Modell herunterladen.

- **Fehler**: Den Container mehrfach neu starten.
  - **Warum falsch**: Der Fehler liegt in der Datei, nicht im Container.
  - **Losung**: Die Datei prufen und ersetzen.

- **Fehler**: Nicht prufen, ob der Download vollstandig ist.
  - **Warum falsch**: Eine unvollstandige Datei kann ebenfalls `size mismatch` verursachen.
  - **Losung**: `ls -lh` und gegebenenfalls `wget -c` erneut ausfuhren.

## Merksatz

Bei `size mismatch` ist fast immer das falsche Modell ausgewahlt.
