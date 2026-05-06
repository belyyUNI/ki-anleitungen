---
title: "Wie gehe ich mit alten oder doppelten Modellen um?"
description: "Alte Modellvarianten besser in ein _archive verschieben als sofort loschen – so bleiben Workflows heil."
difficulty: "anfanger"
topic: "modelle"
tags: ["modelle", "archiv", "organisation", "aufraumen", "speicherplatz"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 5
---

## Frage

Wann sollte ich alte Modellvarianten loschen?

## Kurze Antwort

Nur loschen, wenn klar ist, dass die Datei nicht mehr gebraucht wird und kein Workflow sie erwartet. Vorher prufen, ob Workflows oder Notizen auf diese Datei verweisen. Archivieren ist sicherer als sofortiges Loschen.

## Erklarung

Mit der Zeit sammeln sich alte Modellvarianten an: eine fruhere fp16-Version, die durch fp8 ersetzt wurde, ein alter Checkpoint, der durch eine neue Version uberholt ist, oder versehentlich doppelt heruntergeladene Dateien.

Loschen scheint einfach, hat aber Risiken: Ein gespeicherter Workflow erwartet genau diesen Dateinamen. Loscht man das Modell, ist der Workflow kaputt.

### Archivieren vs. Loschen

| Aktion | Risiko | Ruckgangig machbar |
|---|---|---|
| Loschen | Hoch – Workflow erwartet Datei moglicherweise | Nein (es sei denn, Backup existiert) |
| Archivieren | Niedrig – Datei bleibt verfugbar | Ja – einfach zuruckverschieben |

## Schritt-fur-Schritt: Sicheres Archivieren

1. **Archiv-Ordner anlegen (einmalig):**
   ```bash
   mkdir -p /data/pool/m4z-d1t/comfyui-project/models/_archive
   ```

2. **Datei ins Archiv verschieben:**
   ```bash
   mv /data/pool/m4z-d1t/comfyui-project/models/alter_ordner/datei.safetensors /data/pool/m4z-d1t/comfyui-project/models/_archive/
   ```

3. **Eine Woche warten und beobachten**, ob ein Workflow die Datei vermisst.

4. **Erst dann aus dem Archiv loschen:**
   ```bash
   rm /data/pool/m4z-d1t/comfyui-project/models/_archive/datei.safetensors
   ```

5. **Optional: Unbenutzte Dateien identifizieren:**
   ```bash
   find models -name "*.safetensors" -mtime +30
   ```
   Zeigt Dateien, die seit 30 Tagen nicht mehr geandert wurden (moglicherweise ungenutzt).

## Wichtige Befehle

```bash
# Archiv-Ordner anlegen
mkdir -p models/_archive

# Datei archivieren
mv models/ordner/datei.safetensors models/_archive/

# Archivierte Dateien anzeigen
ls -lh models/_archive/

# Datei aus Archiv zuruckholen
mv models/_archive/datei.safetensors models/urspruenglicher_ordner/

# Doppelte Dateien finden (nach Name)
find models -name "*.safetensors" -exec basename {} \; | sort | uniq -d

# Grosse Dateien identifizieren (Kandidaten fur Archivierung)
find models -name "*.safetensors" -exec ls -lh {} \; | sort -k5 -h
```

## Typische Fehler

- **Fehler**: Alte Modelle sofort loschen, weil sie "nicht mehr gebraucht werden".
  - **Folge**: Ein gespeicherter Workflow findet die Datei nicht mehr.
  - **Losung**: Erst ins _archive verschieben und mindestens eine Woche warten.

- **Fehler**: Archiv-Ordner im gleichen models-Pfad anlegen, sodass ComfyUI ihn scannt.
  - **Folge**: ComfyUI durchsucht auch das Archiv und zeigt doppelte oder veraltete Eintrage an.
  - **Losung**: _archive am besten nicht in einem Ordner anlegen, den ComfyUI aktiv scannt. Alternativ: Sicherstellen, dass ComfyUI den Archiv-Pfad nicht in der `extra_model_paths.yaml` hat.

- **Fehler**: Doppelte Dateien anhand des Dateinamens erkennen und die falsche loschen.
  - **Losung**: Zuerst `ls -lh` auf beide Dateien, Grosse vergleichen, bei Unsicherheit beide behalten.

## Merksatz

Archivieren ist sicherer als sofort loschen. Erst verschieben, dann warten, dann endgultig loschen.
