---
title: "Wie gehe ich vor, wenn ein Workflow aus YouTube nicht funktioniert?"
description: "Warum YouTube-Workflows oft nicht direkt laufen und wie du die Abhangigkeiten systematisch nachbaust."
difficulty: "fortgeschritten"
topic: "workflows"
tags: ["workflow", "youtube", "tutorial", "troubleshooting", "comfyui", "custom-nodes"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 8
---

## Frage

Warum funktioniert ein YouTube-Workflow bei mir nicht genauso wie im Video?

## Kurze Antwort

YouTube-Workflows hangen oft von bestimmten Modellversionen, Custom Nodes, ComfyUI-Versionen, Python-/Torch-Versionen und unsichtbaren Einstellungen ab. Man muss die Abhangigkeiten systematisch nachbauen.

## Erklarung

Ein YouTube-Tutorial zeigt das Endergebnis – nicht den tagelangen Einrichtungsprozess, der vorher stattfand. Viele YouTuber haben eine spezifische ComfyUI-Installation mit bestimmten Custom-Node-Versionen, die von deiner abweichen konnen.

### Warum Workflows scheitern

1. **Fehlende Modelle** – Der YouTuber hat Modelle, die du nicht hast
2. **Fehlende Custom Nodes** – Selbst wenn der Node installiert ist, kann die Version falsch sein
3. **Andere ComfyUI-Version** – Nodes konnen sich zwischen Versionen andern
4. **Andere Python-/Torch-Version** – Manche Nodes brauchen bestimmte Versionen
5. **Versteckte Einstellungen** – Seed, Batch-Size oder Sampler-Einstellungen, die im Video nicht gezeigt werden
6. **Geanderte Download-Links** – Modelle oder Nodes wurden verschoben oder geloscht

## Schritt-fur-Schritt: Systematisch nachbauen

1. **Workflow importieren:**
   - JSON-Datei per Drag-and-drop in ComfyUI ziehen oder den Link aus der Videobeschreibung laden.

2. **Missing Models prufen:**
   - ComfyUI markiert fehlende Modelle rot. Jeden roten Node anklicken und den erwarteten Dateinamen notieren.

3. **Missing Nodes prufen:**
   - ComfyUI zeigt fehlende Custom Nodes am oberen Rand oder als rote Platzhalter an.

4. **Exakte Modell-Dateinamen vergleichen:**
   - Nicht nur den Modellnamen, sondern auch die Variante (fp8/fp16/bf16) und den exakten Dateinamen prufen.

5. **Custom Nodes aus der Videobeschreibung installieren:**
   - Meist sind die GitHub-Links in der Videobeschreibung verlinkt.
   - Nicht einfach die neueste Version nehmen – das Video zeigt eine bestimmte Version.

6. **ComfyUI-Logs lesen:**
   ```bash
   sudo docker logs --tail 300 comfyui_data | grep -i -E "import failed|traceback|error|missing"
   ```

7. **Erst klein testen:**
   - Auflosung reduzieren, nur 1 Frame oder 1 Bild generieren, bevor du den vollen Workflow startest.

8. **Erfolgreiche Parameter dokumentieren:**
   - Wenn der Workflow lauft, sofort alles notieren (siehe Workflow-Dokumentation).

## Wichtige Befehle

```bash
# Logs nach Fehlern durchsuchen
sudo docker logs --tail 500 comfyui_data 2>&1 | grep -i -E "error|traceback|failed|missing"

# Alle installierten Custom Nodes anzeigen
ls -la /data/pool/m4z-d1t/comfyui-project/custom_nodes/

# Git-Status eines Custom Nodes prufen
cd /data/pool/m4z-d1t/comfyui-project/custom_nodes/NodeName
git log --oneline -5

# Nach einem bestimmten Modell suchen
find /data/pool/m4z-d1t/comfyui-project/models -name "*modellname*"
```

## Typische Fehler

- **Fehler**: Workflow importieren und sofort mit voller Auflosung starten.
  - **Folge**: Stundenlanges Warten auf ein Ergebnis, das dann doch fehlschlagt.
  - **Losung**: Erst mit minimalen Einstellungen testen (Batch 1, wenig Frames).

- **Fehler**: Die neueste Custom-Node-Version installieren, obwohl das Video eine altere zeigt.
  - **Folge**: Nodes haben andere Namen, Parameter oder Verhalten.
  - **Losung**: Git-Commit-Datum des Videos mit der Custom-Node-Historie abgleichen.

- **Fehler**: Nur die offensichtlichen Modelle herunterladen, aber Text-Encoder, VAE oder LoRA ubersehen.
  - **Losung**: Jeden einzelnen Node im Workflow anklicken und die erwarteten Dateien prufen.

## Merksatz

Ein Workflow aus einem Video ist kein fertiges Setup, sondern eine Vorlage.
