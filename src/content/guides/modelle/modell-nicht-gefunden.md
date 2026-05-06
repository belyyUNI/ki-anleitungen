---
title: "Warum findet ComfyUI mein Modell nicht?"
description: "Die haufigsten Grunde, warum heruntergeladene Modelle nicht in ComfyUI erscheinen – und wie du sie behebst."
difficulty: "anfanger"
topic: "modelle"
tags: ["modelle", "comfyui", "fehler", "ordner", "troubleshooting"]
publishedAt: 2025-03-11
featured: true
readingTimeMinutes: 5
---

## Frage

Warum wird eine Datei nicht angezeigt, obwohl sie heruntergeladen wurde?

## Kurze Antwort

Meist liegt sie im **falschen Ordner** oder hat nicht den erwarteten Dateinamen. ComfyUI erwartet bestimmte Modelltypen in bestimmten Ordnern.

## Erklarung

ComfyUI durchsucht nicht das gesamte Dateisystem nach Modellen. Jeder Node-Typ hat einen festen Suchpfad:

| Node-Typ | Sucht in | Unterstutzte Endungen |
|----------|----------|----------------------|
| CheckpointLoader | `models/checkpoints/` | `.safetensors`, `.ckpt` |
| UNETLoader | `models/diffusion_models/` | `.safetensors` |
| LoraLoader | `models/loras/` | `.safetensors` |
| CLIPLoader | `models/text_encoders/` | `.safetensors`, Ordner |
| VAELoader | `models/vae/` | `.safetensors` |
| UpscaleModelLoader | `models/upscale_models/` | `.pth`, `.safetensors` |

Wenn du einen Checkpoint in `models/diffusion_models/` legst, wird der CheckpointLoader ihn **nicht** finden, weil er nur in `models/checkpoints/` sucht.

### Weitere Ursachen

- **Falsche Dateiendung**: `.bin`-Dateien werden oft nicht erkannt; `.safetensors` ist der Standard
- **Container-Neustart notig**: Nachdem du eine Datei hinzugefugt hast, muss ComfyUI die Ordner neu scannen (passiert beim Start)
- **Rechteproblem**: Datei gehort root und ist fur den Container nicht lesbar

## Schritt-fur-Schritt: Fehler eingrenzen

1. Prufen, ob die Datei existiert:
   ```bash
   ls -lh /data/pool/m4z-d1t/comfyui-project/models/checkpoints/
   ```

2. Prufen, ob die Datei im **richtigen** Ordner liegt:
   - Checkpoint → `models/checkpoints/`
   - LoRA → `models/loras/`
   - VAE → `models/vae/`

3. Falls falsch, verschieben:
   ```bash
   mv /data/pool/m4z-d1t/comfyui-project/models/checkpoints/meine_lora.safetensors /data/pool/m4z-d1t/comfyui-project/models/loras/
   ```

4. ComfyUI neu starten (Ordner-Scan passiert beim Start):
   ```bash
   sudo docker stop comfyui_data
   sudo docker start comfyui_data
   ```

5. Im Browser ComfyUI neu laden (F5) und Dropdown-Liste prufen.

## Typische Fehler

- **Fehler**: Modell erscheint nicht in der Dropdown-Liste
  - **Ursache 1**: Falscher Ordner
  - **Ursache 2**: ComfyUI wurde nach dem Hinzufugen nicht neu gestartet
  - **Losung**: Ordner prufen, Container neustarten.

- **Fehler**: "Model not found" im Node
  - **Ursache**: Der im Workflow referenzierte Dateiname stimmt nicht mit dem tatsachlichen uberein.
  - **Losung**: Genauen Dateinamen mit `ls` prufen und im Node auswahlen.

## Merksatz

Wenn ComfyUI ein Modell nicht findet: erst Ordner prufen, dann Container neustarten. 95% der Falle sind ein falscher Ordner.
