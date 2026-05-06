---
title: "Wie baue ich aus Fehlermeldungen neue Dokumentation?"
description: "Jeder geloste Fehler sollte als kurzer Troubleshooting-Artikel dokumentiert werden – mit Fehlermeldung, Ursache, Losung und Merksatz."
difficulty: "fortgeschritten"
topic: "allgemein"
tags: ["troubleshooting", "dokumentation", "fehler", "debugging", "wissen"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 5
---

## Frage

Wie kann ich aus einem gelosten Fehler einen neuen Guide machen?

## Kurze Antwort

Jeder geloste Fehler sollte als kurzer Troubleshooting-Artikel dokumentiert werden: Fehlermeldung, Ursache, Losung, Befehle und Merksatz. Die Doku wachst mit der Erfahrung.

## Erklarung

Wenn ein Fehler einmal aufgetreten und gelost wurde, ist das Wissen da – aber nur im Kopf. Beim nachsten Mal, oder wenn eine andere Person denselben Fehler sieht, beginnt die Suche von vorne.

Eine systematische Fehlerdokumentation baut uber Zeit eine Wissensbasis auf, die allen im Projekt hilft.

### Warum Fehler dokumentieren?

- **Wiederholung vermeiden**: Ein Fehler sollte nur einmal gelost werden mussen
- **Teamarbeit**: Andere konnen aus deinen Fehlern lernen
- **Geschwindigkeit**: Beim nachsten Mal reicht ein Blick in die Doku
- **Qualitat**: Aus dokumentierten Fehlern entstehen bessere Workflows

## Schritt-fur-Schritt: Aus Fehler wird Guide

1. **Fehlermeldung vollstandig kopieren**, nicht nur die erste Zeile.

2. **Fehler eingrenzen**: In welchem Bereich liegt er? Modell, Custom Node, Container, GPU?

3. **Losung finden und testen**.

4. **Dokumentieren mit dieser Vorlage:**

```markdown
# Fehler: KURZBESCHREIBUNG

## Fehlermeldung

[Komplette Fehlermeldung hier einfugen]

## Ursache

[Warum tritt der Fehler auf?]

## Losung

```bash
[Konkrete Befehle]
```

## Prufung

```bash
[Wie bestatigt man, dass die Losung wirkt?]
```

## Merksatz

[Einpragsamer Kurzsatz]
```

5. **In die Guidesammlung aufnehmen:** Je nach Themenbereich als neue .md-Datei im passenden Order.

## Beispiel: Aus einem echten Fehler

```markdown
# Fehler: "size mismatch" bei Kandinsky-Modell

## Fehlermeldung

RuntimeError: size mismatch for transformer.blocks.0.attn.to_k.weight:
copying a param with shape torch.Size([1920, 2560]) from checkpoint,
the shape in current model is torch.Size([1920, 1920]).

## Ursache

Es wurde das falsche Kandinsky-Modell fur diesen Workflow geladen.

## Losung

Nicht `kandinsky5pro_i2v_fp16.safetensors` verwenden, sondern
`kandinsky5pro_i2v_sft_5s.safetensors`.

## Prufung

Workflow mit der korrekten Datei neu laden und ausfuhren.

## Merksatz

Size-Mismatch heisst fast immer: falsches Modell fur diesen Loader.
```

## Wichtige Befehle

```bash
# Fehlermeldung aus Logs extrahieren
sudo docker logs --tail 500 comfyui_data | grep -A 20 "Traceback"

# Fehlermeldung in Datei speichern fur Dokumentation
sudo docker logs --tail 500 comfyui_data > fehler_log.txt
```

## Typische Fehler

- **Fehler**: Nur die erste Zeile der Fehlermeldung notieren.
  - **Folge**: Die Ursache steht oft weiter unten im Traceback.
  - **Losung**: Immer den vollstandigen Traceback dokumentieren.

- **Fehler**: Fehler losen, aber nicht dokumentieren.
  - **Folge**: Nach drei Monaten tritt derselbe Fehler wieder auf – und das Wissen ist weg.
  - **Losung**: Direkt nach der Losung den Guide schreiben, solange die Details frisch sind.

- **Fehler**: Dokumentation nur fur sich selbst schreiben, mit Abkurzungen und unvollstandigen Befehlen.
  - **Losung**: So dokumentieren, dass jemand ohne Vorwissen es versteht.

## Merksatz

Jeder geloste Fehler ist ein zukunftiger Guide.
