---
title: "Modelle herunterladen und richtig einsortieren"
description: "Wie du KI-Modelle von Hugging Face und Civitai herunterlaast, in die richtigen Ordner legst und typische Download-Fehler behebst."
difficulty: "anfanger"
topic: "modelle"
tags: ["modelle", "download", "huggingface", "civitai", "wget", "ordnerstruktur"]
publishedAt: 2025-02-05
featured: false
readingTimeMinutes: 15
---

## Die Modell-Ordnerstruktur im Projekt

Jeder Modelltyp hat seinen eigenen Ordner unter `/data/pool/m4z-d1t/comfyui-project/models/`:

| Ordner | Inhalt | Beispiele |
|--------|--------|-----------|
| `checkpoints` | Hauptmodelle (SDXL, Flux, etc.) | `sd_xl_base_1.0.safetensors` |
| `diffusion_models` | Flux-Modelle (separater Typ) | `flux1-dev.safetensors` |
| `loras` | LoRA-Adapter | `detail_enhancer.safetensors` |
| `text_encoders` | Text-Encoder (CLIP, T5) | `clip_l.safetensors`, `t5xxl_fp16.safetensors` |
| `vae` | Variational Autoencoder | `sdxl_vae.safetensors` |
| `upscale_models` | Upscaler | `4x-UltraSharp.pth` |
| `latent_upscale_models` | Latente Upscaler | `latent_upscaler.pt` |

Dateien mussen im **richtigen** Ordner liegen, sonst findet ComfyUI sie nicht – auch wenn sie korrekt heruntergeladen wurden.

## Hugging Face: Korrekte Download-Links bauen

Auf Hugging Face gibt es zwei Link-Typen:

| Typ | Verwendung | Beispiel |
|-----|------------|---------|
| `resolve/main` | Immer verwenden | `https://huggingface.co/stabilityai/.../resolve/main/model.safetensors` |
| `blob/main` | Nur Browser-Vorschau | Nicht fur `wget` benutzen |

**So baust du den richtigen Link:**

1. Gehe zur Modell-Seite auf huggingface.co
2. Klicke auf die Datei → Tab "Files"
3. Rechtsklick auf den Dateinamen → "Link kopieren"
4. Andere `blob` in `resolve` im kopierten Link

```bash
# Falsch:
wget https://huggingface.co/stabilityai/sd-xl-base-1.0/blob/main/sd_xl_base_1.0.safetensors

# Richtig:
wget https://huggingface.co/stabilityai/sd-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors
```

## Modell mit wget herunterladen

**Vor dem Download: Zielordner muss existieren.**

```bash
# 1. In den richtigen Ordner wechseln:
cd /data/pool/m4z-d1t/comfyui-project/models/checkpoints

# 2. Download starten:
wget https://huggingface.co/stabilityai/sd-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors

# 3. Prufen, ob die Datei vollstandig ist:
ls -lh sd_xl_base_1.0.safetensors
```

## Abgebrochene Downloads fortsetzen

Mit `wget -c` setzt du unterbrochene Downloads fort, ohne von vorne anzufangen:

```bash
wget -c https://huggingface.co/.../model.safetensors
```

## Gated Models – Zugriff auf geschutzte Modelle

Manche Modelle auf Hugging Face sind "gated" (zugriffsbeschrankt), z.B. LLaMA oder Flux. Du brauchst:

1. Einen Hugging Face Account
2. Zugriffsanfrage auf der Modell-Seite (Button "Request Access")
3. Einen Hugging Face API-Token

```bash
# Token in Umgebungsvariable speichern (nicht im Klartext in Logs!):
export HF_TOKEN=hf_dein_token_hier

# Download mit Token:
wget --header="Authorization: Bearer $HF_TOKEN" \
  https://huggingface.co/meta-llama/Meta-Llama-3-8B/resolve/main/model.safetensors
```

> **Sicherheitshinweis**: Gib deinen Token niemals im Klartext in Chat-Verlaufen, Skripten oder Logs weiter. Nutze immer Umgebungsvariablen.

## CivitAI-Downloads

CivitAI erfordert meist einen API-Key fur Downloads. Der Prozess ist ahnlich:

```bash
# Token in Variable speichern:
export CIVITAI_TOKEN=dein_token

# Download mit Query-Parameter:
wget "https://civitai.com/api/download/models/12345?token=$CIVITAI_TOKEN" \
  -O modellname.safetensors
```

## Nach dem Download: Modell im richtigen Ordner?

Das haufigste Problem: **Datei ist da, aber ComfyUI findet sie nicht.**

```bash
# Prufen, ob die Datei im richtigen Ordner liegt:
find /data/pool/m4z-d1t/comfyui-project/models -name "*.safetensors" | grep dein_modell

# Wenn sie im falschen Ordner liegt, verschieben:
mv /data/pool/m4z-d1t/comfyui-project/models/checkpoints/mein_vae.safetensors \
  /data/pool/m4z-d1t/comfyui-project/models/vae/
```

## Typische Fehler

**401 Unauthorized**: Du versuchst ein geschutztes Modell ohne Token herunterzuladen. Zugriff auf Hugging Face beantragen und Token verwenden.

**wget: No such file or directory**: Der Zielordner existiert nicht. Erst mit `mkdir -p` anlegen.

**Datei zu klein**: Download wurde unterbrochen. Mit `wget -c` fortsetzen.

> **Merksatz**: Die Datei ist oft da, aber im falschen Ordner. Erst Ordner prufen, dann Download wiederholen.
