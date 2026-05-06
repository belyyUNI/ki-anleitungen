---
title: "Wie erkenne ich, ob ich auf dem Server bin?"
description: "Zwischen lokalem Rechner und DGX-Server unterscheiden – mit pwd, whoami und dem Prompt."
difficulty: "anfanger"
topic: "ssh"
tags: ["ssh", "server", "login", "pwd", "whoami", "grundlagen"]
publishedAt: 2025-05-04
featured: false
readingTimeMinutes: 3
---

## Frage

Woran erkenne ich, ob ich auf dem Server oder lokal bin?

## Kurze Antwort

Mit drei einfachen Befehlen findest du es heraus:

```bash
pwd         # Zeigt das aktuelle Verzeichnis
whoami      # Zeigt den Benutzernamen
hostname    # Zeigt den Rechnernamen
```

Auf dem Server sieht das so aus:

```text
$ pwd
/data/pool/m4z-d1t
$ whoami
m4z-d1t
$ hostname
hal9000
```

## Erklarung

Nach einer SSH-Verbindung landest du in einer Shell, die genauso aussieht wie deine lokale. Es gibt kein Popup "Sie sind jetzt auf dem Server". Deshalb ist es wichtig, die drei Orientierungsbefehle zu kennen:

| Befehl | Bedeutung | Lokal | Server |
|--------|-----------|-------|--------|
| `pwd` | Aktuelles Verzeichnis | `/Users/deinname/...` | `/data/pool/m4z-d1t/...` |
| `whoami` | Benutzername | Dein lokaler Name | `m4z-d1t` |
| `hostname` | Name des Rechners | `MacBook-Pro.local` o.a. | `hal9000` |

Der einfachste Test: Wenn `pwd` mit `/data/pool/` beginnt, bist du auf dem Server.

## Schritt-fur-Schritt: Herausfinden, wo du bist

1. Prufen, ob du auf dem Server bist:
   ```bash
   pwd
   ```
   Server-Pfade beginnen mit `/data/pool/` – lokale mit `/Users/` oder `/home/`.

2. Prufen, als welcher Benutzer du angemeldet bist:
   ```bash
   whoami
   ```
   Auf dem Server sollte `m4z-d1t` erscheinen.

3. Zur Sicherheit den Rechnernamen prufen:
   ```bash
   hostname
   ```
   `hal9000` = Server. Alles andere = lokal.

## Wichtige Befehle

```bash
# Die drei Orientierungsbefehle
pwd
whoami
hostname

# Alle drei auf einmal
echo "Ort: $(pwd), Benutzer: $(whoami), Rechner: $(hostname)"
```

## Merksatz

`pwd` verrat dir sofort, ob du auf dem Server bist. Beginnt der Pfad mit `/data/pool/`, bist du richtig.
