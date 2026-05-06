---
title: "Server-Regeln fur den DGX-Server"
description: "Eine kompakte Ubersicht der wichtigsten Regeln fur das gemeinsame Arbeiten auf dem DGX-Server."
difficulty: "anfanger"
topic: "dgx"
tags: ["server", "regeln", "team", "sicherheit", "einsteiger"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 3
---

## Frage

Welche Regeln gelten auf dem gemeinsamen DGX-Server?

## Kurze Antwort

Die wichtigsten Regeln: Keine fremden Container stoppen, GPU-Auslastung vor dem Start prufen, grosse Downloads ankundigen, Tokens nicht teilen, funktionierende Workflows dokumentieren, keine riskanten Updates ohne Backup.

## Erklarung

Ein gemeinsam genutzter DGX-Server funktioniert nur, wenn sich alle Beteiligten an ein paar Grundregeln halten. Die Regeln sind einfach, aber ihre Missachtung kann anderen die Arbeit kaputtmachen.

## Die Regeln

### 1. Keine fremden Container stoppen

Niemals `sudo docker stop` oder `sudo docker rm` auf einen Container anwenden, der nicht der eigene ist. Immer erst `sudo docker ps` prufen.

### 2. GPU-Auslastung vor dem Start prufen

```bash
nvidia-smi
```

Wenn eine GPU schon belegt ist, eine andere wahlen oder warten.

### 3. Grosse Downloads ankundigen

Downloads von mehr als 10 GB belasten den Server. Vorher im Team ansprechen.

### 4. Tokens nicht teilen

Hugging-Face-Tokens sind personliche Zugangsdaten. Jeder nutzt seinen eigenen.

### 5. Funktionierende Workflows dokumentieren

Damit andere das Setup nachvollziehen konnen: Welche Modelle, Nodes und Parameter werden verwendet?

### 6. Keine riskanten Updates ohne Backup

Vor jedem Custom-Node-Update oder Torch-Upgrade: `docker commit`, damit ein Rollback moglich ist.

### 7. Modelle nicht doppelt herunterladen

Vor dem Download mit `find` oder `ls` prufen, ob die Datei schon im Projekt liegt.

### 8. Outputs regelmassig aufraumen

Platz auf `/data/pool` ist begrenzt. Alte Testvideos und -bilder gelegentlich loschen.

## Prufung vor jedem Start

- [ ] `nvidia-smi` – ist eine GPU frei?
- [ ] `sudo docker ps` – welche Container laufen?
- [ ] `ls models/` – sind die benotigten Modelle da?

## Wichtige Befehle

```bash
# GPU-Status
nvidia-smi

# Laufende Container
sudo docker ps

# Eigener Speicherverbrauch
du -sh /data/pool/m4z-d1t/comfyui-project/

# Freier Speicher auf /data/pool
df -h /data/pool
```

## Typische Fehler

- **Fehler**: Ohne `nvidia-smi` einen Container starten.
  - **Folge**: GPU ist doppelt belegt, beide Nutzer haben Performance-Probleme.
  - **Losung**: Immer erst GPU-Auslastung prufen.

- **Fehler**: Einen fremden Container stoppen, weil man den eigenen nicht findet.
  - **Losung**: `sudo docker ps` zeigt Name und Status aller Container. Bei Unsicherheit den Besitzer fragen.

## Merksatz

Gemeinsamer Server heisst: Deine Aktionen konnen andere betreffen. Vorher prufen, kommunizieren, dokumentieren.
