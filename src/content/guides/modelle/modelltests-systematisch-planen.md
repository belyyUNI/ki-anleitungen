---
title: "Wie plane ich neue Modelltests systematisch?"
description: "Neue Modelle sollten in einem eigenen Ordner, mit eigenem Testworkflow und dokumentierten Parametern getestet werden."
difficulty: "fortgeschritten"
topic: "modelle"
tags: ["modelle", "tests", "organisation", "workflow", "debugging"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 6
---

## Frage

Wie teste ich ein neues Modell, ohne das bestehende Setup durcheinanderzubringen?

## Kurze Antwort

Neue Modelle sollten in einem eigenen Ordner, mit eigenem Testworkflow und dokumentierten Parametern getestet werden. Erst wenn sie stabil laufen, sollten sie in die Hauptdokumentation aufgenommen werden.

## Erklarung

Wenn ein neues Modell einfach in den bestehenden Projektordner geladen wird, kann es zu Konflikten kommen: Namensgleichheit mit vorhandenen Modellen, Workflows greifen versehentlich auf die neue Version zu, Custom Nodes fehlen fur die neue Architektur.

Ein isolierter Test verhindert Seiteneffekte auf bereits getestete Workflows.

### Wann ein eigener Testordner sinnvoll ist

- Bei einem komplett neuen Modelltyp (z. B. erstes Image-to-Video-Modell)
- Bei einem grossen Versionssprung (z. B. SDXL zu SD3)
- Wenn neue Custom Nodes dafur installiert werden mussen
- Wenn unklar ist, ob das Modell uberhaupt funktioniert

## Schritt-fur-Schritt: Isolierten Modelltest durchfuhren

1. **Modellgruppe anlegen:**
   ```bash
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/test_neues_modell
   ```

2. **Modelle in den passenden Ordner laden:**
   ```bash
   cd /data/pool/m4z-d1t/comfyui-project/models/test_neues_modell
   wget --content-disposition "https://huggingface.co/..."
   ```

3. **Custom Nodes prufen:** Welche Nodes braucht der Beispielworkflow? Sind sie installiert?

4. **Beispielworkflow importieren:** In ComfyUI den Beispielworkflow des Modells laden. Noch NICHT ausfuhren.

5. **Erst kleiner Test:** Geringe Auflosung (512x512), wenige Steps, kurzes Video (1-2 Sekunden). Prüfen, ob der Workflow ohne Fehler durchlauft.

6. **Fehler dokumentieren:** Falls Fehler auftreten, die genaue Meldung und den Node notieren.

7. **Erfolgreiche Parameter notieren:** Auflosung, Steps, CFG, Batch-Size, Seed.

8. **Erst dann finalen Workflow speichern** und das Modell in die Hauptdokumentation aufnehmen.

## Test-Protokollvorlage

```markdown
# Modell-Test: NAME

## Quelle
## Dateien
## Zielordner
## Benotigte Nodes
## Workflow (Pfad zur JSON)
## Testparameter
- Auflosung: 512x512
- Steps: 20
- CFG: 7.0
- Batch-Size: 1
## Ergebnis
## Fehler
## Status: getestet / fehlerhaft / nicht getestet
```

## Wichtige Befehle

```bash
# Testordner anlegen
mkdir -p models/test_NEUER_NAME

# Nach dem Test: Modell in den richtigen Ordner verschieben
mv models/test_NEUER_NAME/datei.safetensors models/diffusion_models/ziel/

# Testordner aufraumen
rm -rf models/test_NEUER_NAME
```

## Typische Fehler

- **Fehler**: Neues Modell direkt in den Hauptordner laden.
  - **Folge**: Vorhandene Workflows greifen versehentlich auf die neue Modellversion zu.
  - **Losung**: Immer einen separaten Testordner verwenden.

- **Fehler**: Erster Test mit maximaler Auflosung und Steps.
  - **Folge**: Lange Wartezeit, schwerer Fehlschlag, unklare Fehlerursache.
  - **Losung**: Erst mit minimalen Einstellungen testen, dann hochskalieren.

## Merksatz

Neue Modelle erst isoliert testen, dann in den normalen Workflow ubernehmen.
