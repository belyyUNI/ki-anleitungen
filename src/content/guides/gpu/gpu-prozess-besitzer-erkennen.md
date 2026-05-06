---
title: "Wie erkenne ich, ob ein GPU-Prozess mir gehort?"
description: "So findest du heraus, ob ein laufender GPU-Prozess von dir stammt – mit nvidia-smi, ps und whoami."
difficulty: "anfanger"
topic: "gpu"
tags: ["gpu", "nvidia-smi", "prozesse", "sicherheit", "team", "einsteiger"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 5
---

## Frage

Wie finde ich heraus, ob ein Prozess auf einer GPU von mir stammt?

## Kurze Antwort

Mit `nvidia-smi` sieht man die Prozess-ID (PID). Danach kann man mit `ps` prufen, welcher Benutzer diesen Prozess gestartet hat.

## Erklarung

`nvidia-smi` zeigt in der unteren Tabelle alle Prozesse, die gerade GPU-Ressourcen nutzen. Jeder Prozess hat eine PID (Process ID). Mit dieser PID kann man herausfinden, welcher Benutzer den Prozess gestartet hat und welcher Befehl dahintersteckt.

### Warum ist das wichtig?

Auf einem geteilten DGX-Server laufen oft mehrere GPU-Prozesse gleichzeitig. Nicht jeder Prozess gehort dir. Bevor du einen Prozess beendest oder eine GPU "freiraumst", musst du sicher sein, dass es dein eigener Prozess ist.

### Was die Spalten bedeuten

In der `nvidia-smi`-Prozesstabelle:

| Spalte | Bedeutung |
|--------|-----------|
| GPU | Welche GPU genutzt wird |
| PID | Prozess-ID (eindeutige Nummer) |
| Type | C (Compute) oder G (Graphics) |
| Process Name | Name des Programms (z. B. `python`) |
| GPU Memory Usage | Wie viel VRAM der Prozess belegt |

## Schritt-fur-Schritt

1. **GPU-Auslastung prufen:**
   ```bash
   nvidia-smi
   ```

2. **PID aus der unteren Tabelle ablesen.** Notiere die PID des Prozesses, den du prufen willst.

3. **Benutzer und Befehl zur PID prufen:**
   ```bash
   ps -fp PID
   ```
   Ersetze `PID` durch die echte Prozess-ID. Die Ausgabe zeigt `UID` (Benutzer) und `CMD` (Befehl).

4. **Nur eigene Prozesse beenden.** Wenn die UID zu deinem Benutzernamen passt, ist es dein Prozess.

5. **Alternative: Alle eigenen Prozesse anzeigen:**
   ```bash
   ps -u $(whoami)
   ```
   Das zeigt alle Prozesse deines Benutzers, nicht nur GPU-Prozesse.

## Wichtige Befehle

```bash
# GPU-Status mit Prozessliste
nvidia-smi

# Details zu einem bestimmten Prozess
ps -fp PID

# Alle meine Prozesse
ps -u $(whoami)

# Prozess mit mehr Details
ps -fPID

# Prozess beenden (nur eigene!)
kill PID
```

## Typische Fehler

- **Fehler**: Nur auf GPU-Speicher schauen, aber nicht auf den Besitzer des Prozesses.
  - **Folge**: Man beendet einen fremden Prozess und zerstort fremde Arbeit.
  - **Losung**: Immer erst `ps -fp PID` ausfuhren, bevor man `kill` verwendet.

- **Fehler**: Denken, dass 0 % GPU-Util bedeutet, dass der Prozess unwichtig ist.
  - **Realitat**: Ein Prozess kann pausieren, auf I/O warten oder zwischen Berechnungen sein. Die GPU-Auslastung schwankt.
  - **Losung**: Nicht nur `GPU-Util`, sondern auch `Memory-Usage` und die Laufzeit des Prozesses beachten.

- **Fehler**: `nvidia-smi` zeigt keinen Prozess, aber die GPU ist belegt.
  - **Ursache**: Der Prozess lauft in einem anderen Container oder wurde nicht sauber freigegeben.
  - **Losung**: `sudo docker ps` prufen – der Container konnte die GPU noch reservieren.

## Merksatz

Die PID aus `nvidia-smi` sagt dir, welchen Prozess du genauer prufen musst.
