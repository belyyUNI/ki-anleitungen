---
title: "Was mache ich bei 401 Unauthorized?"
description: "Geschutzte Hugging-Face-Modelle herunterladen – mit Token, Lizenzakzeptanz und dem richtigen wget-Aufruf."
difficulty: "fortgeschritten"
topic: "modelle"
tags: ["modelle", "huggingface", "gated", "401", "token", "download"]
publishedAt: 2025-03-09
featured: false
readingTimeMinutes: 6
---

## Frage

Wie bekomme ich Zugriff auf ein geschutztes Hugging-Face-Modell (401 Unauthorized)?

## Kurze Antwort

Das Modell ist wahrscheinlich **geschutzt** (gated). Man braucht:

- Hugging-Face-Login
- Akzeptierte Lizenz (auf der Hugging-Face-Webseite)
- Einen HF-Token fur den Download

Beispiel mit Token:

```bash
wget --header="Authorization: Bearer DEIN_HF_TOKEN" -c --show-progress -O /data/pool/m4z-d1t/comfyui-project/models/diffusion_models/datei.safetensors "DIREKTER_DATEILINK"
```

Tokens durfen **nicht** offentlich geteilt werden.

## Erklarung

Manche Modelle auf Hugging Face sind **gated** (durch ein Tor geschutzt). Der Download ist nur nach expliziter Freischaltung moglich. Drei Dinge sind erforderlich:

1. **Hugging-Face-Account**: Du brauchst einen Account auf huggingface.co
2. **Lizenz akzeptieren**: Auf der Modellseite musst du die Nutzungsbedingungen akzeptieren
3. **Access Token**: Ein personlicher Token, der deine Identitat gegenuber der API bestatigt

Der Token wird im `wget`-Befehl als HTTP-Header mitgesendet (`Authorization: Bearer ...`).

### Token erstellen

1. Auf https://huggingface.co/settings/tokens gehen
2. "New token" klicken
3. Typ "Read" auswahlen (reicht fur Downloads)
4. Namen vergeben und erstellen
5. Token kopieren und sicher aufbewahren – er wird nur einmal angezeigt

## Schritt-fur-Schritt: Gated-Modell herunterladen

1. Im Browser auf der Hugging-Face-Seite die Lizenz akzeptieren.

2. Token bereithalten (aus den Hugging-Face-Einstellungen).

3. Zielordner anlegen:
   ```bash
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/diffusion_models
   ```

4. Download mit Token starten:
   ```bash
   wget --header="Authorization: Bearer hf_DeinTokenHier" -c --show-progress -O /data/pool/m4z-d1t/comfyui-project/models/diffusion_models/datei.safetensors "https://huggingface.co/.../resolve/main/datei.safetensors"
   ```

## Wichtige Befehle

```bash
# Mit Token (empfohlen: Token in Umgebungsvariable):
export HF_TOKEN="hf_DeinTokenHier"
wget --header="Authorization: Bearer $HF_TOKEN" -c --show-progress -O datei.safetensors "LINK"

# Token in der Shell-History vermeiden:
read -s HF_TOKEN  # Versteckte Eingabe
wget --header="Authorization: Bearer $HF_TOKEN" -c --show-progress -O datei.safetensors "LINK"
```

> **Sicherheitswarnung**: Tokens nie in Skripte schreiben, die versioniert werden. Nie in Screenshots oder Chat-Verlaufen teilen.

## Typische Fehler

- **Fehler**: `401 Unauthorized` trotz Token
  - **Ursache**: Token ist abgelaufen oder die Lizenz wurde noch nicht akzeptiert.
  - **Losung**: Token erneuern und Lizenz auf der Hugging-Face-Webseite prufen.

- **Fehler**: Token wurde im Befehl eingegeben und ist jetzt in der Bash-History
  - **Losung**: `history -d $(history 1 | awk '{print $1}')` um den letzten Befehl zu loschen, oder `~/.bash_history` bearbeiten.

## Merksatz

Gated-Modelle brauchen Token + Lizenz. Der Token ist wie ein Passwort – niemals teilen oder in Code committen.
