---
title: "Was ist dieses Projekt?"
description: "Worum geht es bei dieser Wissensplattform? Ein Uberblick uber Ziel, Umfang und Zielgruppe der Dokumentation."
difficulty: "anfanger"
topic: "allgemein"
tags: ["projekt", "einsteiger", "uberblick", "dokumentation"]
publishedAt: 2025-01-10
featured: true
readingTimeMinutes: 5
---

## Frage

Worum geht es bei dieser Wissensplattform?

## Kurze Antwort

Diese Plattform dokumentiert den praktischen Umgang mit einem DGX-Server, Docker, ComfyUI, KI-Modellen, Workflows, Custom Nodes und typischen Fehlern. Ziel ist es, wiederkehrende Aufgaben und Probleme so zu erklaren, dass man sie Schritt fur Schritt nachmachen kann.

## Erklarung

Die Inhalte sind aus der taglichen Praxis auf einem TH-OWL-DGX-Server entstanden. Statt jedes Mal dieselben Fragen zu stellen oder dieselben Fehler zu suchen, steht hier alles an einem Ort.

Die Plattform richtet sich an:

- **Einsteiger**, die noch nie mit SSH, Docker oder ComfyUI gearbeitet haben
- **Fortgeschrittene**, die bestimmte Workflows oder Custom Nodes verstehen wollen
- **Projektteilnehmer**, die schnell eine Losung fur einen konkreten Fehler brauchen

Alle Anleitungen folgen einem einheitlichen Schema: Frage, Antwort, Erklarung, Schritt-fur-Schritt-Anleitung, wichtige Befehle, typische Fehler und ein Merksatz.

## Was findest du hier?

| Bereich | Inhalt |
|---------|--------|
| **Anleitungen** | Schritt-fur-Schritt-Guides von SSH bis Multi-GPU-Konfiguration |
| **Modelle** | Informationen zu KI-Modellen, Speicherorten und Download-Quellen |
| **Workflows** | ComfyUI-Workflows und wie man sie verwendet |
| **Troubleshooting** | Haufige Fehler mit exakten Fehlermeldungen zum direkten Finden |
| **Befehlslegende** | Alle wichtigen Befehle mit Erklarung und Beispielen |
| **Cheat-Sheets** | Kurzreferenz fur haufige Arbeitsablaufe |

## Schritt-fur-Schritt: Erste Orientierung

1. Starte auf der **Startseite** – sie zeigt die neuesten Anleitungen und Troubleshooting-Eintrage.
2. Gehe zu **Anleitungen**, um alle Guides thematisch sortiert zu sehen.
3. Nutze **Troubleshooting**, wenn du eine konkrete Fehlermeldung hast.
4. Die **Befehlslegende** hilft dir, wenn du einen Befehl nicht mehr genau weiat.

## Wichtige Befehle

Diese Plattform dokumentiert unter anderem:

```bash
# SSH-Verbindung zum Server
ssh m4z-d1t@hal9000.skim.th-owl.de

# Projektverzeichnis
cd /data/pool/m4z-d1t/comfyui-project

# Docker-Container verwalten
sudo docker start comfyui_data
sudo docker stop comfyui_data

# GPU-Status prufen
nvidia-smi
```

## Merksatz

Diese Plattform ist dein Nachschlagewerk fur den DGX-ComfyUI-Alltag. Lieber einmal hier nachschlagen als dreimal denselben Fehler machen.
