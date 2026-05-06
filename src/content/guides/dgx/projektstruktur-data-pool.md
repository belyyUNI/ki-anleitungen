---
title: "Warum arbeiten wir in /data/pool/?"
description: "Verstehen, warum das Projekt nicht im Home-Ordner liegt und welche Vorteile der Speicherpool bietet."
difficulty: "anfanger"
topic: "dgx"
tags: ["projektstruktur", "data-pool", "speicher", "home-ordner", "einsteiger"]
publishedAt: 2025-01-20
featured: false
readingTimeMinutes: 5
---

## Frage

Warum nutzen wir nicht einfach den Home-Ordner?

## Kurze Antwort

Groae Modelle konnen sehr viel Speicher brauchen (mehrere hundert GB). Der Home-Ordner ist dafur zu klein und nicht fur groae Datenmengen ausgelegt. Deshalb liegt das Projekt unter:

```bash
/data/pool/m4z-d1t/comfyui-project
```

Dort ist der richtige Arbeitsbereich fur groae Dateien.

## Erklarung

Auf einem DGX-Server gibt es verschiedene Speicherbereiche mit unterschiedlichen Eigenschaften:

| Bereich | Zweck | Geeignet fur |
|---------|-------|-------------|
| `/home/m4z-d1t/` | Personliches Verzeichnis | Konfiguration, Skripte, kleine Dateien |
| `/data/pool/m4z-d1t/` | Gemeinsamer Speicherpool | Modelle (mehrere GB pro Datei), Outputs, Workflows |

Der Home-Ordner (`~` oder `/home/m4z-d1t/`) ist wie ein personlicher Schreibtisch – gut fur Notizen und kleine Dateien, aber nicht fur einen ganzen Maschinenpark. Der Speicherpool `/data/pool/` ist wie ein Lagerhaus mit genugend Platz fur Checkpoints mit 7 GB, LoRA-Sammlungen und tausende generierter Bilder.

**Wichtig**: Der alte Pfad `~/comfyui-project` wird nicht mehr verwendet. Alle neuen Arbeiten finden unter `/data/pool/m4z-d1t/comfyui-project/` statt.

## Schritt-fur-Schritt: Vom Home zum Projekt

1. Nach dem SSH-Login bist du standardmaaig im Home-Ordner:
   ```bash
   pwd
   # /home/m4z-d1t
   ```

2. Wechsle in den Projektordner:
   ```bash
   cd /data/pool/m4z-d1t/comfyui-project
   ```

3. Prufe, ob du richtig bist:
   ```bash
   pwd
   # /data/pool/m4z-d1t/comfyui-project
   ls
   # models/  custom_nodes/  output/  workflows/
   ```

## Wichtige Befehle

```bash
# Speicherplatz prufen
df -h /data/pool

# Groae des Projektordners anzeigen
du -sh /data/pool/m4z-d1t/comfyui-project

# Groae der Modellordner anzeigen
du -sh /data/pool/m4z-d1t/comfyui-project/models/*
```

## Typische Fehler

- **Fehler**: `No such file or directory` beim `cd`-Befehl
  - **Ursache**: Tippfehler im Pfad oder der Ordner existiert noch nicht.
  - **Losung**: Pfad genau prufen. Bei erstmaliger Einrichtung den Ordner mit `mkdir -p` anlegen.

- **Fehler**: "Kein Speicherplatz mehr" im Home-Ordner
  - **Ursache**: Du hast versehentlich Modelle nach `~/` heruntergeladen.
  - **Losung**: Dateien nach `/data/pool/m4z-d1t/comfyui-project/` verschieben und in Zukunft direkt dorthin herunterladen.

## Merksatz

`/data/pool/` ist dein Arbeitsbereich fur alles Groae. Der Home-Ordner ist fur Konfiguration, nicht fur Modelle.
