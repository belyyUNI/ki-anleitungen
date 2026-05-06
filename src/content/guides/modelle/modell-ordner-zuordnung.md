---
title: "Welches Modell gehort in welchen Ordner?"
description: "Die vollstandige Zuordnungstabelle: Checkpoints, LoRAs, VAE, Text Encoder und alle anderen Modelltypen."
difficulty: "anfanger"
topic: "modelle"
tags: ["modelle", "ordner", "comfyui", "checkpoints", "loras", "vae", "referenz"]
publishedAt: 2025-03-13
featured: true
readingTimeMinutes: 6
---

## Frage

Wo mussen Checkpoints, LoRAs, VAE und Text Encoder hin?

## Kurze Antwort

- **Checkpoints**: `models/checkpoints`
- **Diffusion Models**: `models/diffusion_models`
- **LoRAs**: `models/loras`
- **Text Encoder**: `models/text_encoders`
- **VAE**: `models/vae`
- **Upscaler**: `models/upscale_models`
- **Latent Upscaler**: `models/latent_upscale_models`

## Erklarung

Jeder Modelltyp hat seinen festen Platz. Diese Zuordnung ist in ComfyUI **hart verdrahtet** – du kannst sie nicht andern. Deshalb ist es wichtig, diese Tabelle zu kennen.

### Zuordnungstabelle

| Was ist es? | Wohin? | Typische Groae | Beispiele |
|-------------|--------|---------------|----------|
| SDXL-Checkpoint | `models/checkpoints/` | 6-7 GB | `sd_xl_base_1.0.safetensors` |
| Flux-Dev-Modell | `models/diffusion_models/` | 12+ GB | `flux1-dev.safetensors` |
| LoRA-Datei | `models/loras/` | 10-300 MB | `detail_slider.safetensors` |
| CLIP-Encoder | `models/text_encoders/` | 200-700 MB | `clip_l.safetensors` |
| T5-Encoder | `models/text_encoders/` | 3-5 GB | `t5_xxl_fp16.safetensors` |
| VAE-Datei | `models/vae/` | 100-330 MB | `sdxl_vae.safetensors` |
| ESRGAN-Upscaler | `models/upscale_models/` | 60-300 MB | `4x-esrgan.pth` |
| Latent-Upscaler | `models/latent_upscale_models/` | 100-200 MB | `latent_upscaler.safetensors` |

### Wie erkenne ich den Typ?

- **Dateiname**: Enthalt oft Hinweise wie `lora`, `vae`, `xl`
- **Dateigroae**: Grobe Dateien (6+ GB) sind meist Checkpoints oder Diffusion Models
- **Download-Quelle**: Auf Civitai oder Hugging Face steht der Typ meist in der Beschreibung
- **Workflow-Anforderung**: Der Node-Typ im Workflow verrat, was erwartet wird

## Schritt-fur-Schritt: Richtigen Ordner finden

1. Dateinamen prufen:
   ```bash
   ls -lh datei.safetensors
   ```

2. Typ anhand der Tabelle bestimmen.

3. In den korrekten Ordner kopieren/verschieben:
   ```bash
   mv datei.safetensors /data/pool/m4z-d1t/comfyui-project/models/checkpoints/
   ```

4. Falls der Ordner fehlt:
   ```bash
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/checkpoints
   ```

## Wichtige Befehle

```bash
# Vollstandigen Pfad notieren:
/data/pool/m4z-d1t/comfyui-project/models/checkpoints/mein_modell.safetensors
/data/pool/m4z-d1t/comfyui-project/models/loras/meine_lora.safetensors
/data/pool/m4z-d1t/comfyui-project/models/vae/mein_vae.safetensors
/data/pool/m4z-d1t/comfyui-project/models/text_encoders/clip_l.safetensors
/data/pool/m4z-d1t/comfyui-project/models/upscale_models/4x_upscaler.pth
/data/pool/m4z-d1t/comfyui-project/models/latent_upscale_models/latent_upscaler.safetensors
/data/pool/m4z-d1t/comfyui-project/models/diffusion_models/flux_model.safetensors
```

## Merksatz

Nicht raten, wo ein Modell hingehort. Die Tabelle oben ist die einzige Wahrheit. Falscher Ordner = Modell unsichtbar.
