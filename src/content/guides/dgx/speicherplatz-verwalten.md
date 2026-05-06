---
title: "Wie verhindere ich, dass der Server-Speicher volllauft?"
description: "Speicherplatz auf dem DGX-Server uberwachen, grosse Dateien identifizieren und Platzverschwendung vermeiden."
difficulty: "anfanger"
topic: "dgx"
tags: ["speicher", "organisation", "modelle", "outputs", "cleanup", "df", "du"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 6
---

## Frage

Wie vermeide ich Speicherprobleme durch viele grosse Modelle und Outputs?

## Kurze Antwort

Regelmassig Speicher prufen, alte fehlerhafte Downloads entfernen, Outputs sortieren und keine grossen Modelle doppelt speichern. Besonders 0-Byte-Dateien und abgebrochene Downloads sollte man kontrollieren.

## Erklarung

KI-Modelle sind riesig – ein einzelnes Modell kann mehrere Gigabyte gross sein. Outputs wie Videos konnen ebenfalls schnell Speicher fressen. Auf einem geteilten Server mit begrenztem Plattenplatz ist Speichermanagement keine optionale Aufgabe.

### Was verbraucht am meisten Platz?

1. **Modelle** – Checkpoints, Diffusion Models, Text Encoder (oft 2-15 GB pro Datei)
2. **Outputs** – Generierte Videos und Bilder, besonders in hoher Auflosung
3. **Doppelte Dateien** – Gleiches Modell in mehreren Ordnern
4. **Kaputte Downloads** – 0-Byte-Dateien oder abgebrochene Downloads
5. **Alte Workflow-Tests** – Outputs von Experimenten, die nicht mehr gebraucht werden

### Die wichtigsten Speicherbefehle

`df -h` zeigt den belegten und freien Speicher aller eingehangten Laufwerke. `du -sh` zeigt, wie viel Platz ein bestimmter Ordner belegt.

## Schritt-fur-Schritt: Speicher-Check

1. **Gesamtspeicher prufen:**
   ```bash
   df -h
   ```
   Achte auf die Zeile mit `/data/pool`. Die Spalte `Use%` zeigt die Auslastung.

2. **Projektordner-Grosse prufen:**
   ```bash
   du -sh /data/pool/m4z-d1t/comfyui-project
   ```

3. **Modellordner einzeln prufen:**
   ```bash
   du -sh /data/pool/m4z-d1t/comfyui-project/models/*
   ```
   Das zeigt, welche Kategorie am meisten Platz braucht.

4. **Output-Ordner prufen:**
   ```bash
   du -sh /data/pool/m4z-d1t/comfyui-project/output
   ```

5. **0-Byte-Dateien finden (kaputte Downloads):**
   ```bash
   find /data/pool/m4z-d1t/comfyui-project/models -type f -size 0
   ```

6. **Aufraumen:** Kaputte Dateien loschen, alte Outputs archivieren.

## Wichtige Befehle

```bash
# Gesamtspeicher
df -h

# Ordner-Grosse rekursiv
du -sh /pfad/zum/ordner

# Alle Unterordner mit Grossen
du -sh /pfad/zum/ordner/*

# 0-Byte-Dateien finden
find /pfad -type f -size 0

# Grosse Dateien finden (>1GB)
find /pfad -type f -size +1G -exec ls -lh {} \;

# Die 10 groessten Dateien in einem Ordner
du -sh /pfad/* | sort -rh | head -10
```

## Typische Fehler

- **Fehler**: Ein Modell doppelt herunterladen, weil man vergessen hat, dass es schon da ist.
  - **Losung**: Vor jedem Download mit `find` oder `ls` prufen, ob die Datei bereits existiert.

- **Fehler**: Outputs nie aufraumen und nach Wochen feststellen, dass der Speicher voll ist.
  - **Losung**: Nach jedem Projekt Outputs durchgehen und Test-Material loschen.

- **Fehler**: Einen kaputten Download nicht erkennen und sich wundern, warum der Workflow nicht lauft.
  - **Losung**: Nach jedem Download mit `ls -lh` die Dateigrosse prufen.

## Merksatz

Grosse Modelle sind teuer im Speicher. Prufe regelmassig, was wirklich noch gebraucht wird.
