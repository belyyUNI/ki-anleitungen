---
title: "Welche Ordner braucht ComfyUI?"
description: "Die vollstandige Ordnerstruktur fur Modelle, Outputs und Custom Nodes – und warum jeder Modelltyp in den richtigen Ordner muss."
difficulty: "anfanger"
topic: "dgx"
tags: ["ordnerstruktur", "comfyui", "modelle", "organisation", "einsteiger"]
publishedAt: 2025-01-22
featured: true
readingTimeMinutes: 7
---

## Frage

Welche Ordnerstruktur wird fur Modelle, Outputs und Custom Nodes verwendet?

## Kurze Antwort

Die wichtigste Struktur unter `/data/pool/m4z-d1t/comfyui-project/` ist:

```bash
models/
├── checkpoints/          # Haupt-Checkpoints (SDXL, Flux, etc.)
├── diffusion_models/     # Diffusion-Modelle
├── loras/                # LoRA-Dateien
├── text_encoders/        # CLIP, T5 und andere Text-Encoder
├── vae/                  # VAE-Modelle
├── upscale_models/       # Upscaler
└── latent_upscale_models/ # Latent-Upscaler
custom_nodes/             # Custom-Node-Repositories
output/                   # Generierte Bilder und Videos
workflows/                # Workflow-JSON-Dateien
```

Jeder Modelltyp muss in den richtigen Ordner, sonst findet ComfyUI die Datei oft nicht.

## Erklarung

ComfyUI sucht Modelle nicht wahllos im Dateisystem. Jeder Node-Typ (CheckpointLoader, LoraLoader, VAELoader usw.) erwartet seine Dateien in einem bestimmten Unterordner von `models/`. Diese Struktur ist fest in ComfyUI verdrahtet.

### Die Ordner im Detail

| Ordner | Inhalt | Typische Dateiendungen | Beispiel |
|--------|--------|----------------------|---------|
| `checkpoints` | Hauptmodelle | `.safetensors`, `.ckpt` | `sd_xl_base_1.0.safetensors` |
| `diffusion_models` | Diffusion-Modelle (Flux) | `.safetensors` | `flux1-dev.safetensors` |
| `loras` | LoRA-Anpassungen | `.safetensors` | `detail_slider.safetensors` |
| `text_encoders` | CLIP, T5 | `.safetensors`, Ordner | `clip_l.safetensors` |
| `vae` | VAE-Modelle | `.safetensors` | `sdxl_vae.safetensors` |
| `upscale_models` | Bild-Upscaler | `.pth`, `.safetensors` | `4x-esrgan.pth` |
| `latent_upscale_models` | Latent-Upscaler | `.safetensors` | `latent_upscaler.safetensors` |

### Warum das wichtig ist

Wenn ein Modell im falschen Ordner liegt, zeigt ComfyUI es in der Dropdown-Liste des entsprechenden Nodes **nicht an**. Das ist der haufigste Grund dafur, dass ein heruntergeladenes Modell "verschwunden" scheint.

## Schritt-fur-Schritt: Ordnerstruktur prufen

1. Wechsle ins Projektverzeichnis:
   ```bash
   cd /data/pool/m4z-d1t/comfyui-project
   ```

2. Zeige die Modellordner an:
   ```bash
   ls -d models/*/
   ```

3. Prufe, ob ein bestimmtes Modell im richtigen Ordner liegt:
   ```bash
   ls -lh models/checkpoints/
   ls -lh models/loras/
   ```

## Wichtige Befehle

```bash
# Alle Modellordner mit Inhalt anzeigen
for dir in models/*/; do echo "=== $dir ==="; ls -lh "$dir" 2>/dev/null | head -5; done

# Prufen, ob ein Ordner leer ist
ls -la models/upscale_models/

# Fehlenden Ordner anlegen
mkdir -p models/upscale_models
```

## Typische Fehler

- **Fehler**: Modell wird in ComfyUI nicht angezeigt
  - **Ursache**: Datei liegt im falschen Ordner (z. B. Checkpoint in `models/diffusion_models/` statt `models/checkpoints/`)
  - **Losung**: Datei mit `mv` in den richtigen Ordner verschieben.

- **Fehler**: Ordner `latent_upscale_models` oder `upscale_models` fehlt
  - **Ursache**: Der Ordner wurde nie angelegt, weil bisher keine Upscaler verwendet wurden.
  - **Losung**: Mit `mkdir -p models/upscale_models` anlegen.

## Merksatz

Nicht die Datei ist falsch – sie steht nur im falschen Ordner. Prufe zuerst den Pfad, bevor du das Modell erneut herunterladst.
