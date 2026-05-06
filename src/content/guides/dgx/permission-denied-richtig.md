---
title: "Wie gehe ich mit 'Permission denied' richtig um?"
description: "Warum Permission denied kein Freifahrtschein fur sudo rm ist – und wie du Berechtigungsprobleme sicher lost."
difficulty: "anfanger"
topic: "dgx"
tags: ["permissions", "sudo", "sicherheit", "ordner", "rechte", "einsteiger"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 6
---

## Frage

Was soll ich tun, wenn ich in einem Projektordner keine Datei schreiben darf?

## Kurze Antwort

Zuerst prufen, wem der Ordner gehort. Nicht sofort mit `sudo` alles erzwingen. Wenn ein leerer Ordner root gehort, kann man ihn ersetzen. Wenn er wichtige Dateien enthalt, sollte man vorsichtig sein.

## Erklarung

`Permission denied` ist eine Schutzmassnahme, keine Schikane. Das System verhindert, dass du versehentlich Dateien anderer Benutzer oder Systemdateien veranderst.

### Warum `sudo rm` nicht die erste Wahl sein sollte

`sudo rm` loscht ohne Ruckfrage und ohne Papierkorb. Wenn du damit einen Ordner erwischt, der wichtige Dateien enthalt, sind sie unwiederbringlich weg.

### Typische Situationen und der richtige Umgang

| Situation | Richtiges Vorgehen |
|-----------|-------------------|
| Leerer Ordner gehort root, du willst ihn nutzen | `rmdir` (falls leer) oder Besitzer andern |
| Ordner mit wichtigen Dateien gehort root | Nicht loschen – Besitzer prufen und ggf. anpassen |
| Ordner gehort einem anderen Benutzer | Nicht anfassen – Rucksprache halten |
| Eigene Datei, aber falsche Rechte | `chmod` oder `chown` mit Bedacht |

## Schritt-fur-Schritt: Permission denied untersuchen

1. **Berechtigung prufen:**
   ```bash
   ls -ld /pfad/zum/ordner
   ```
   Die Ausgabe zeigt Besitzer (`root` oder `m4z-d1t`) und Rechte (`drwxr-xr-x`).

2. **Eigenen Benutzer prufen:**
   ```bash
   whoami
   ```

3. **Ordnerinhalt prufen:**
   ```bash
   ls -la /pfad/zum/ordner
   ```
   Ist der Ordner wirklich leer? Enthalt er wichtige Dateien?

4. **Falls der Ordner leer ist und root gehort:**
   ```bash
   cd /data/pool/m4z-d1t/comfyui-project
   rmdir custom_nodes  # funktioniert nur bei leerem Ordner
   mkdir custom_nodes
   ```

5. **Falls der Ordner wichtige Dateien enthalt:**
   Nicht loschen! Stattdessen Besitzer andern (nur eigene Projektordner):
   ```bash
   sudo chown -R $(whoami) /pfad/zum/ordner
   ```
   **Warnung**: Nur in eigenen Projektordnern anwenden, nie in Systemordnern.

## Wichtige Befehle

```bash
# Ordner-Berechtigungen prufen
ls -ld /pfad/zum/ordner

# Alle Dateien mit Besitzer anzeigen
ls -la /pfad/zum/ordner

# Wer bin ich?
whoami

# Leeren Ordner loschen
rmdir /pfad/zum/leeren/ordner

# Besitzer rekursiv andern (nur eigene Projektordner!)
sudo chown -R $(whoami) /pfad/zum/ordner
```

## Typische Fehler

- **Fehler**: Bei `Permission denied` sofort `sudo rm -rf` ausfuhren.
  - **Gefahr**: Wichtige Dateien werden unwiederbringlich geloscht.
  - **Losung**: Erst mit `ls -la` prufen, was in dem Ordner ist.

- **Fehler**: `chown` auf Systemordner oder fremde Projektordner anwenden.
  - **Gefahr**: Systemdienste konnen nicht mehr auf ihre Dateien zugreifen.
  - **Losung**: `chown` nur auf eigene Projektordner unter `/data/pool/m4z-d1t/` anwenden.

- **Fehler**: Bei einem leeren root-Ordner aufgeben, statt ihn einfach zu ersetzen.
  - **Losung**: Leeren Ordner mit `rmdir` loschen und mit `mkdir` neu anlegen.

## Merksatz

`Permission denied` ist ein Hinweis, nicht automatisch eine Einladung zu `sudo rm`.
