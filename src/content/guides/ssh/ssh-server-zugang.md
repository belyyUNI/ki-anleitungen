---
title: "SSH & Server-Zugang – Erste Schritte"
description: "Wie du dich per SSH mit dem DGX-Server verbindest, was du lokal brauchst, und die ersten Kommandos nach dem Login."
difficulty: "anfanger"
topic: "ssh"
tags: ["ssh", "server", "terminal", "mac", "windows", "einsteiger"]
publishedAt: 2025-01-15
featured: true
readingTimeMinutes: 8
---

## Voraussetzungen

Bevor du dich mit dem Server verbindest, brauchst du:

- **Zugangsdaten**: Benutzername, Server-Adresse und Passwort (oder SSH-Key)
- **Terminal**: Auf dem Mac ist das Terminal.app bereits eingebaut. Unter Windows empfehlen wir Windows Terminal oder PowerShell
- **Netzwerkverbindung**: Du musst im selben Netzwerk sein wie der Server (oder per VPN verbunden)

## Was ist SSH?

SSH (Secure Shell) ist ein Protokoll, mit dem du dich sicher auf einem entfernten Rechner anmelden und dort Befehle ausfuhren kannst – als wurdest du direkt vor dem Server sitzen. Die Verbindung ist verschlusselt.

Der grundlegende Befehl:

```bash
ssh benutzername@server-adresse
```

In diesem Projekt:

```bash
ssh m4z-d1t@hal9000.skim.th-owl.de
```

## Erste Schritte nach dem Login

Nach erfolgreicher Anmeldung landest du im **Home-Verzeichnis** deines Benutzers. Das ist personlicher Speicherplatz, aber **nicht** der Ort, an dem das Projekt liegt.

### Orientierungs-Kommandos

Diese drei Befehle solltest du direkt nach dem Login kennen:

| Befehl | Was er tut |
|--------|------------|
| `pwd` | Zeigt dein aktuelles Verzeichnis (print working directory) |
| `whoami` | Zeigt deinen Benutzernamen |
| `ls` | Listet Dateien und Ordner im aktuellen Verzeichnis auf |

```bash
pwd
# /home/m4z-d1t

whoami
# m4z-d1t

ls -la
# Zeigt alle Dateien inkl. versteckter Ordner
```

## Lokaler Rechner vs. Server

Ein haufiges Missverstandnis: **Dein Mac oder Windows-Rechner ist nicht der Server.** Dein lokaler Rechner ist nur das Zugangsgerat. Die eigentliche Arbeit – Docker, ComfyUI, GPU-Berechnungen – findet auf dem DGX-Server statt.

- **Lokal**: Terminal, Browser, Dateien zum Hochladen
- **Server**: Docker-Container, GPU, Modelle, Workflows, Outputs

## Vom Home-Verzeichnis zum Projekt

Das Projekt liegt **nicht** unter `~/comfyui-project`, sondern im gemeinsamen Speicherpool:

```bash
cd /data/pool/m4z-d1t/comfyui-project
```

Der Pfad `/data/pool/` ist ein zentraler Speicherbereich mit ausreichend Platz fur groae Modelle (mehrere hundert GB). Dein Home-Verzeichnis ware dafur zu klein.

Nach dem Wechsel solltest du dich orientieren:

```bash
ls -la
# Zeigt: models/  custom_nodes/  workflows/  output/
```

## Nutzliche SSH-Tipps

**Verbindung halten**: Wenn die SSH-Verbindung bei Inaktivitat getrennt wird, hilft `tmux` oder `screen`:

```bash
tmux new -s comfyui
# ... arbeit erledigen ...
# Strg+B, dann D zum Abmelden (Session lauft weiter)
tmux attach -t comfyui  # spater wieder verbinden
```

**Dateien ubertragen**: Mit `scp` kopierst du Dateien zwischen lokalem Rechner und Server:

```bash
# Vom Mac auf den Server:
scp lokale_datei.txt benutzer@server:/pfad/zum/ziel/

# Vom Server auf den Mac:
scp benutzer@server:/pfad/zur/datei.txt .
```

> **Merksatz**: SSH ist dein Fenster zum Server. Alles, was du im Terminal siehst, passiert auf dem Server – nicht auf deinem lokalen Rechner.
