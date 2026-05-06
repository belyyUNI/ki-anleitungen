---
title: "Was ist der Unterschied zwischen blob und resolve?"
description: "Warum manche Hugging-Face-Links nicht mit wget funktionieren – und wie du den richtigen Link findest."
difficulty: "anfanger"
topic: "modelle"
tags: ["modelle", "huggingface", "download", "wget", "blob", "resolve"]
publishedAt: 2025-03-03
featured: false
readingTimeMinutes: 5
---

## Frage

Warum funktionieren manche Hugging-Face-Links nicht direkt mit `wget`?

## Kurze Antwort

`blob` ist die **Webseite** zur Datei. `resolve` ist der **direkte Download-Link**. Fur `wget` brauchst du `resolve`:

```text
# Falsch (Webseite, nicht die Datei):
https://huggingface.co/.../blob/main/datei.safetensors

# Richtig (direkter Datei-Link):
https://huggingface.co/.../resolve/main/datei.safetensors
```

## Erklarung

Hugging Face bietet zwei Arten von URLs fur dieselbe Datei:

### blob = Anzeigen

`/blob/main/` zeigt eine **Webseite** mit der Datei an – mit Vorschau, Metadaten, Download-Button. Das ist fur den **Browser** gedacht. Wenn du das mit `wget` aufrufst, ladt du HTML-Code herunter, nicht die Modelldatei.

### resolve = Herunterladen

`/resolve/main/` liefert die **reine Datei** – ohne HTML, ohne Webseite. Das ist der direkte Download-Link, den `wget` braucht.

### So findest du den richtigen Link

1. Auf Hugging Face zur gewunschten Datei navigieren
2. Rechtsklick auf den **Download-Button**
3. "Link-Adresse kopieren" wahlen
4. Der kopierte Link enthalt bereits `resolve`

Alternativ: Den `blob`-Link im Browser offnen und in der URL `blob` durch `resolve` ersetzen.

## Schritt-fur-Schritt: Korrekten Link ermitteln

1. Hugging-Face-Modellseite offnen (z. B. `https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0`).

2. Zum Tab **"Files and versions"** gehen.

3. Die gewunschte `.safetensors`-Datei finden.

4. Auf den Dateinamen **klicken** (nicht Rechtsklick – das wurde `blob` geben).

5. Auf der Dateiseite: Rechtsklick auf **"Download"** und Link kopieren. Dieser Link enthalt `resolve`.

6. Link im `wget`-Befehl verwenden.

## Wichtige Befehle

```bash
# Testen, ob ein Link korrekt ist (nur Header prufen, kein Download):
wget --spider "LINK"

# Direkter Download mit resolve:
wget -c --show-progress -O datei.safetensors "https://huggingface.co/USER/MODEL/resolve/main/datei.safetensors"
```

## Typische Fehler

- **Fehler**: `wget` ladt eine kleine HTML-Datei statt des Modells
  - **Ursache**: `blob`-Link verwendet
  - **Losung**: `blob` durch `resolve` ersetzen und erneut ausfuhren

- **Fehler**: "Wget hat nur 200 KB geladen, aber das Modell sollte 7 GB sein"
  - **Ursache**: Ebenfalls `blob`-Link – die 200 KB sind die HTML-Webseite
  - **Losung**: Link prufen und korrigieren. Datei loschen und mit `resolve`-Link neu laden.

## Merksatz

`blob` = zum Anschauen im Browser. `resolve` = zum Herunterladen mit `wget`.
