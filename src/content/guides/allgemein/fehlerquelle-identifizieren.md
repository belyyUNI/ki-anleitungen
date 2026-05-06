---
title: "Wie erkenne ich, ob ein Fehler vom Workflow oder vom System kommt?"
description: "Systematisch unterscheiden, ob ein Problem durch den Workflow, das Modell, den Container oder ComfyUI entsteht."
difficulty: "fortgeschritten"
topic: "allgemein"
tags: ["troubleshooting", "fehler", "debugging", "workflow", "system", "container"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 7
---

## Frage

Woher weiss ich, ob ein Problem durch den Workflow, das Modell, den Container oder ComfyUI entsteht?

## Kurze Antwort

Man schaut auf die Fehlerstelle. Fehler in Loadern deuten oft auf Modell-/Pfadprobleme hin. Fehler in Custom Nodes deuten auf Node-Abhangigkeiten hin. Fehler in Torch/CUDA deuten auf Container-/GPU-/Versionsthemen hin.

## Erklarung

Nicht jeder Fehler in ComfyUI ist ein ComfyUI-Problem. Die Fehlerquelle zu identifizieren ist der erste Schritt zur Losung. Der Dateipfad und der Modulname in der Fehlermeldung verraten meist, in welchem Bereich das Problem liegt.

### Fehler-Kategorien

| Fehlerstelle | Wahrscheinliche Ursache | Bereich |
|---|---|---|
| Loader Node | Falsches Modell, falscher Ordner, falscher Dateiname | Modelle |
| Custom Node Import | Fehlende Dependencies | Custom Nodes |
| `torch.OutOfMemoryError` | VRAM zu knapp | GPU / VRAM |
| `size mismatch` | Falsches Modell fur erwartete Architektur | Modelle |
| `ModuleNotFoundError` | Python-Paket fehlt | Container / Dependencies |
| CUDA / Torch Fehler | Version oder GPU-Setup | Container / GPU |
| `Connection refused` | Container lauft nicht oder Port falsch | Docker |
| `Permission denied` | Dateirechte | Dateisystem |
| `No such file or directory` | Pfad existiert nicht | Dateisystem |

## Schritt-fur-Schritt: Fehlerquelle eingrenzen

1. **Fehlermeldung vollstandig lesen.** Nicht nur die erste Zeile, sondern den ganzen Traceback.

2. **Dateipfade in der Meldung identifizieren:**
   - Pfade mit `/app/` = innerhalb des Containers
   - Pfade mit `/data/pool/` = auf dem Host (uber Volume-Mount)
   - Pfade mit `models/` = Modell-Problem
   - Pfade mit `custom_nodes/` = Custom-Node-Problem

3. **Fehlertyp bestimmen:**
   - `OutOfMemoryError` = GPU-VRAM
   - `ModuleNotFoundError` = Fehlendes Python-Paket
   - `FileNotFoundError` = Fehlende Datei oder falscher Pfad
   - `size mismatch` = Falsches Modell

4. **Eingrenzen, ob Workflow oder System:**
   - Funktioniert ein anderer, einfacher Workflow? → Problem liegt am spezifischen Workflow
   - Funktioniert gar nichts? → Problem liegt am Container oder System

5. **Logs gezielt durchsuchen:**
   ```bash
   sudo docker logs --tail 500 comfyui_data | grep -i "FEHLERBEGRIFF"
   ```

## Orientierungstabelle

| Fehlermeldung enthalt | Wahrscheinlicher Bereich | Nachster Schritt |
|---|---|---|
| `checkpoints/` oder `diffusion_models/` | Modell-Pfad | Modellordner prufen |
| `custom_nodes/` | Custom Node | Node-Installation prufen |
| `torch.` oder `cuda` | PyTorch / GPU | GPU und Torch-Version prufen |
| `site-packages/` | Python-Dependency | Paket neu installieren |
| `PermissionError` | Dateirechte | `ls -la` auf den Pfad |
| `KeyError` oder `TypeError` | Workflow-Logik | Workflow-Parameter prufen |

## Wichtige Befehle

```bash
# Volle Logs eines fehlerhaften Runs
sudo docker logs --tail 500 comfyui_data

# Nach spezifischen Fehlertypen suchen
sudo docker logs --tail 500 comfyui_data | grep -i "outofmemory"
sudo docker logs --tail 500 comfyui_data | grep -i "modulenotfound"
sudo docker logs --tail 500 comfyui_data | grep -i "traceback"
```

## Typische Fehler

- **Fehler**: Bei einem Modell-Fehler sofort den Container neu starten.
  - **Warum falsch**: Ein Container-Neustart lost kein Modell-Problem.
  - **Losung**: Erst die Fehlermeldung lesen und den Bereich eingrenzen.

- **Fehler**: Jeden Fehler als "ComfyUI-Problem" abtun.
  - **Warum falsch**: Die meisten Fehler liegen in Workflows, Modellen oder Custom Nodes, nicht in ComfyUI selbst.
  - **Losung**: Systematisch nach der obigen Tabelle vorgehen.

## Merksatz

Der Dateipfad im Fehlertext verrat meistens, in welchem Bereich das Problem liegt.
