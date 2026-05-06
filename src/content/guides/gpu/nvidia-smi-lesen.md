---
title: "Wie lese ich nvidia-smi?"
description: "Die GPU-Statusanzeige verstehen: Welche GPU ist frei, welche ausgelastet, welche hat noch VRAM?"
difficulty: "anfanger"
topic: "gpu"
tags: ["gpu", "nvidia-smi", "vram", "auslastung", "monitoring"]
publishedAt: 2025-02-20
featured: true
readingTimeMinutes: 7
---

## Frage

Wie lese und interpretiere ich die Ausgabe von nvidia-smi?

## Kurze Antwort

Mit:

```bash
nvidia-smi
```

Wichtig sind drei Spalten: `Memory-Usage`, `GPU-Util` und die Prozessliste unten. Eine GPU mit wenig Speicherbelegung und niedriger Auslastung ist meist besser geeignet.

## Erklarung

`nvidia-smi` (NVIDIA System Management Interface) ist das Cockpit fur alle GPUs im Server. Die Ausgabe zeigt eine Tabelle mit allen verfugbaren Karten und darunter eine Liste laufender Prozesse.

### Die Ausgabe im Detail

```
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 550.120   Driver Version: 550.120   CUDA Version: 12.4                       |
+-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|=========================================+========================+======================|
|   0  NVIDIA A100-SXM4-80GB          Off |   00000000:07:00.0 Off |                    0 |
| N/A   38C    P0             64W / 500W |       0MiB / 81920MiB |      0%      Default |
+-----------------------------------------+------------------------+----------------------+
```

### Worauf du achten musst

| Spalte | Bedeutung | Gut | Schlecht |
|--------|-----------|-----|----------|
| `Memory-Usage` | Belegter VRAM | 0-10000 MiB | > 70000 MiB |
| `GPU-Util` | Rechenauslastung | 0-20% | > 80% |
| `Temp` | Temperatur | < 60°C | > 80°C |
| Prozesse unten | Wer nutzt die GPU? | Keine / deine | Fremde Prozesse |

**Faustregel**: Suche die GPU mit dem niedrigsten Memory-Usage-Wert und einer GPU-Util nahe 0%. Die ist am wahrscheinlichsten frei.

## Schritt-fur-Schritt: Freie GPU finden

1. `nvidia-smi` aufrufen:
   ```bash
   nvidia-smi
   ```

2. In der Tabelle die Spalte `Memory-Usage` vergleichen:
   - `0MiB / 81920MiB` = komplett frei
   - `45231MiB / 81920MiB` = etwa halb voll
   - `78320MiB / 81920MiB` = fast voll

3. `GPU-Util` prufen:
   - `0%` = GPU ist untatig
   - `98%` = GPU rechnet gerade intensiv

4. Prozessliste unten prufen:
   - Zeigt, **wer** die GPU nutzt (z. B. ein anderer ComfyUI-Container)
   - Wenn dein eigener Container dort steht, weiat du, dass er aktiv ist

5. GPU auswahlen und notieren (z. B. "GPU 5 ist frei").

## Wichtige Befehle

```bash
# Komplette Ubersicht
nvidia-smi

# Nur bestimmte GPUs anzeigen
nvidia-smi -i 0,2,5

# Kurzfassung nur mit Speicher
nvidia-smi --query-gpu=index,name,memory.used,memory.total --format=csv

# Live-Updates (jede Sekunde)
watch -n 1 nvidia-smi
```

## Typische Fehler

- **Fehler**: `nvidia-smi: command not found`
  - **Ursache**: Du bist nicht auf dem Server, sondern im lokalen Terminal.
  - **Losung**: Erst per SSH verbinden.

- **Fehler**: GPU scheint "frei" (0% Util), aber ComfyUI startet trotzdem mit OOM
  - **Ursache**: Ein anderer Prozess hat VRAM belegt (Memory-Usage > 0), auch wenn er nicht rechnet.
  - **Losung**: Immer Memory-Usage prufen, nicht nur GPU-Util.

## Merksatz

Nicht die GPU-Util ist entscheidend, sondern der freie VRAM. Eine GPU kann 0% Util zeigen und trotzdem voll belegt sein.
