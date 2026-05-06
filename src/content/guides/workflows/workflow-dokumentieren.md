---
title: "Wie dokumentiere ich einen funktionierenden Workflow sauber?"
description: "Was du sofort notieren solltest, wenn ein Workflow endlich lauft – damit du ihn spater reproduzieren kannst."
difficulty: "anfanger"
topic: "workflows"
tags: ["workflow", "dokumentation", "organisation", "comfyui", "modelle", "einsteiger"]
publishedAt: 2026-05-06
featured: true
readingTimeMinutes: 8
---

## Frage

Was sollte ich notieren, wenn ein Workflow endlich funktioniert?

## Kurze Antwort

Wenn ein Workflow lauft, sollte man sofort festhalten, welche Modelle, Custom Nodes, GPU-Einstellungen, Parameter und Workarounds notig waren. Sonst ist der Workflow spater schwer reproduzierbar.

## Erklarung

Ein funktionierender ComfyUI-Workflow ist das Ergebnis vieler kleiner Entscheidungen: Welches Modell in welcher Variante? Welche Custom Nodes? Welche GPU? Welche Batch Size? Ohne Dokumentation ist dieses Wissen nach wenigen Tagen verloren – und der Workflow wird bei einem erneuten Versuch wieder nicht laufen.

### Warum sofort dokumentieren?

Weil das menschliche Gedachtnis unzuverlassig ist. Python-Versionen, Torch-Versionen, Custom-Node-Versionen, Dateinamen und Download-Quellen verschwimmen schnell. Eine gute Dokumentation direkt nach dem Erfolgserlebnis spart spater Stunden an Fehlersuche.

## Schritt-fur-Schritt: Dokumentationsvorlage

Erstelle fur jeden funktionierenden Workflow eine Markdown-Datei mit diesen Feldern:

```markdown
# Workflow: [Name]

## Zweck
Was macht dieser Workflow? Welches Ergebnis liefert er?

## JSON-Datei / Quelle
Wo liegt die Workflow-JSON? Von wem stammt sie?

## Benotigte Modelle
- Modellname
- Variante (fp8, fp16, bf16)
- Dateiname
- Quelle (Hugging Face, CivitAI, etc.)
- Zielordner unter models/

## Benotigte Custom Nodes
- Node-Repo-Name
- GitHub-URL
- Installationsdatum

## Getestete Einstellungen
- GPU: [Nummer]
- Batch Size: [Wert]
- Auflosung: [Breite]x[Hohe]
- Frames / Lange: [Wert]
- Steps: [Wert]
- CFG: [Wert]

## Container / Umgebung
- Image: comfyui-custom-torch271
- PyTorch-Version:
- Python-Version:

## Startbefehl
\`\`\`bash
sudo docker start comfyui_data
\`\`\`

## Bekannte Fehler
- Fehler 1: ...
- Losung: ...

## Datum des letzten Tests
YYYY-MM-DD
```

## Beispiel: Ausgefullte Dokumentation

```markdown
# Workflow: LTX-2 HD I2V Audio CFG

## Zweck
Image-to-Video mit Audio-/CFG-Erweiterung fur hochauflosende Videos.

## Benotigte Modelle
- LTX-Video-2B-v2-fp8.safetensors (models/diffusion_models/ltx/)
- t5-v1_1-xxl-encoder-bf16.safetensors (models/text_encoders/)

## Benotigte Custom Nodes
- ComfyUI-KJNodes
- ComfyUI-VideoHelperSuite

## Getestete Einstellungen
- GPU: 0
- Batch Size: 1
- Auflosung: 768x512
- Frames: 121
- Steps: 40

## Datum des letzten Tests
2026-05-06
```

## Wichtige Befehle

```bash
# Workflow-JSON sichern
cp /pfad/zum/workflow.json /data/pool/m4z-d1t/comfyui-project/workflows/

# Aktuelles Image notieren
sudo docker inspect comfyui_data | grep Image

# Torch-Version notieren
sudo docker exec -it comfyui_data python3 -c "import torch; print(torch.__version__)"
```

## Typische Fehler

- **Fehler**: Man denkt: "Das merke ich mir", und dokumentiert nichts.
  - **Folge**: Zwei Wochen spater weiss man nicht mehr, welche Custom-Node-Version funktioniert hat.
  - **Losung**: Dokumentation als festen Schritt im Workflow-Prozess einplanen.

- **Fehler**: Nur den Workflow-JSON speichern, aber nicht die benotigten Modelle notieren.
  - **Folge**: ComfyUI zeigt "Missing Models", und man findet das passende Modell nicht.
  - **Losung**: Sofort nach dem erfolgreichen Run die Modellliste aus ComfyUI abschreiben.

## Merksatz

Ein funktionierender Workflow ist erst wirklich wertvoll, wenn er reproduzierbar dokumentiert ist.
