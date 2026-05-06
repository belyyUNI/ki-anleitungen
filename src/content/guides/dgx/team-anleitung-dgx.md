---
title: "Wie sollte eine Team-Anleitung fur den DGX-Server aussehen?"
description: "Eine Team-Anleitung braucht klare Startbefehle, Projektpfade, GPU-Regeln, Warnungen und Troubleshooting-Schritte."
difficulty: "anfanger"
topic: "dgx"
tags: ["team", "server", "einsteiger", "organisation", "regeln", "anleitung"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 7
---

## Frage

Was muss eine Anleitung enthalten, damit auch andere Personen das Setup nutzen konnen?

## Kurze Antwort

Eine gute Team-Anleitung braucht klare Startbefehle, Projektpfade, Regeln zur GPU-Nutzung, Warnungen vor fremden Containern und einfache Troubleshooting-Schritte. Sie muss nicht alles erklaren, aber sie muss verhindern, dass jemand etwas kaputtmacht.

## Erklarung

Wenn mehrere Personen denselben DGX-Server nutzen, braucht es verbindliche Regeln. Ohne Anleitung passieren schnell Fehler: Jemand stoppt den falschen Container, uberschreibt fremde Dateien oder blockiert tagelang eine GPU.

Eine Team-Anleitung sollte so kurz sein, dass sie auf eine Seite passt – aber so konkret, dass niemand raten muss.

### Was eine Team-Anleitung mindestens braucht

- Serverzugang (SSH-Befehl)
- Projektordner (wo liegt das Projekt?)
- Standardcontainer (welcher Container gehort zum Projekt?)
- Browser-URL (wie erreicht man ComfyUI?)
- GPU-Prufung (vor jedem Start: ist eine GPU frei?)
- Start/Stop (Container hoch- und runterfahren)
- Logs (wo und wie findet man Fehler?)
- Verhalten auf gemeinsamem Server (was ist tabu?)
- Ansprechpartner (wer hilft bei Problemen?)

## Schritt-fur-Schritt: Team-Anleitung erstellen

1. **Serverzugang notieren:**
   ```text
   ssh m4z-d1t@hal9000.skim.th-owl.de
   ```

2. **Projektpfad dokumentieren:**
   ```text
   cd /data/pool/m4z-d1t/comfyui-project
   ```

3. **Standardcontainer und Image:**
   ```text
   Container: comfyui_data
   Image: comfyui-custom-torch271
   ```

4. **Browser-URL:**
   ```text
   http://hal9000.skim.th-owl.de:18810
   ```

5. **GPU-Prufung (IMMER vor dem Start):**
   ```bash
   nvidia-smi
   ```

6. **Start/Stop-Befehle:**
   ```bash
   sudo docker start comfyui_data
   sudo docker stop comfyui_data
   ```

7. **Logs prufen:**
   ```bash
   sudo docker logs --tail 100 comfyui_data
   ```

## Team-Regeln auf dem DGX-Server

Diese Regeln verhindern die haufigsten Konflikte:

- **Keine fremden Container stoppen.** Immer erst `sudo docker ps` prufen, wem ein Container gehort.
- **GPU-Auslastung prufen** bevor ein eigener Container gestartet wird. `nvidia-smi` zeigt belegte GPUs.
- **Keine grossen Downloads ohne Ankundigung** – das belastet die Server-Bandbreite und den Speicherplatz.
- **Tokens nicht teilen.** Hugging-Face-Tokens sind personlich. Jeder nutzt seinen eigenen.
- **Funktionierende Workflows dokumentieren**, damit andere sie nachvollziehen konnen (Modelle, Nodes, Parameter).
- **Keine riskanten Updates ohne Backup** (`docker commit` vor jedem Custom-Node-Update oder Torch-Upgrade).
- **Modelle nicht doppelt herunterladen.** Vor dem Download prufen, ob die Datei schon in `models/` liegt.
- **Outputs aufraumen.** Nicht unbegrenzt Videos und Bilder sammeln. Platz auf /data/pool ist begrenzt.

## Erste-Hilfe-Tabelle

| Problem | Erster Schritt |
|---|---|
| ComfyUI offnet nicht im Browser | `sudo docker ps` – lauft der Container? |
| Rote Missing Nodes | Browser-Cache leeren (`Cmd+Shift+R`), Container-Logs prufen |
| Out of Memory | Kleinere Auflosung/Steps testen, `nvidia-smi` prufen |
| Permission Denied | `ls -ld` auf den Pfad, Besitzer prufen |
| Modell nicht gefunden | `ls` im models-Ordner, genauen Dateinamen prufen |

## Wichtige Befehle

```bash
# Server betreten
ssh m4z-d1t@hal9000.skim.th-owl.de

# Projektverzeichnis
cd /data/pool/m4z-d1t/comfyui-project

# GPU-Status
nvidia-smi
watch -n 1 nvidia-smi

# Container starten/stoppen
sudo docker start comfyui_data
sudo docker stop comfyui_data

# Logs
sudo docker logs --tail 100 comfyui_data

# Eigene Prozesse finden
ps -u $(whoami) | grep python
```

## Typische Fehler

- **Fehler**: Anleitung ist zu lang und wird nicht gelesen.
  - **Losung**: Die wichtigsten 5 Regeln zuerst, alles Weitere als Referenz. Maximal eine Seite.

- **Fehler**: Anleitung enthalt veraltete Befehle oder Pfade.
  - **Losung**: Nach jeder Projektanderung die Team-Anleitung aktualisieren. Datum der letzten Aktualisierung notieren.

- **Fehler**: Jeder dokumentiert anders, es gibt keine gemeinsame Struktur.
  - **Losung**: Eine zentrale `team-anleitung.md` im Projektordner. Nicht in individuellen Notizen verteilen.

## Merksatz

Eine Team-Anleitung muss nicht alles erklaren, aber sie muss verhindern, dass jemand etwas kaputtmacht.
