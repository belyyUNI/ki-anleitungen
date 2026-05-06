---
title: "Wie arbeite ich sicher auf einem geteilten DGX-Server?"
description: "Verhaltensregeln fur die Arbeit auf einem gemeinsam genutzten DGX-Server – Container, GPUs und Dateien anderer Nutzer respektieren."
difficulty: "anfanger"
topic: "dgx"
tags: ["server", "sicherheit", "team", "container", "gpu", "einsteiger"]
publishedAt: 2026-05-06
featured: true
readingTimeMinutes: 7
---

## Frage

Was muss ich beachten, wenn mehrere Personen denselben DGX-Server nutzen?

## Kurze Antwort

Auf einem geteilten DGX-Server sollte man nie blind Container, Prozesse oder Dateien anderer Nutzer stoppen, loschen oder uberschreiben. Vor Anderungen immer prufen, welche Prozesse laufen, wem Container gehoren und welche GPUs bereits belegt sind.

## Erklarung

Ein DGX-Server ist eine gemeinsam genutzte Ressource. Mehrere Personen konnen gleichzeitig darauf arbeiten – jeder mit eigenen Containern, eigenen Modellen und eigenen Workflows. Ein unbedachter Befehl kann die Arbeit anderer Personen abbrechen oder Daten zerstoren.

### Die drei goldenen Regeln

1. **Nie fremde Container stoppen oder loschen.** Jeder Container gehort der Person, die ihn erstellt hat.
2. **Nie ohne Rucksprache GPUs belegen, die bereits stark genutzt werden.** Auch wenn eine GPU "nur" belegt aussieht – vielleicht lauft dort ein langer Trainingslauf.
3. **Keine fremden Dateien uberschreiben.** Vor allem in gemeinsam genutzten Ordnern wie `/data/pool/` sollte man nicht annehmen, dass eine Datei "herrenlos" ist.

### Container und Besitzer

Docker-Container laufen alle unter `root`, aber der Ersteller ist die Person, die `docker run` ausgefuhrt hat. Mit `docker ps` sieht man die Containernamen. Der Name verrat oft, wem der Container gehort.

Wenn du einen Container mit einem bereits vergebenen Namen erstellen willst, schlagt das fehl – das schutzt vor versehentlichem Uberschreiben.

## Schritt-fur-Schritt: Vor einer Aktion prufen

1. **Laufende Container anzeigen:**
   ```bash
   sudo docker ps
   ```
   Das zeigt alle aktiven Container mit Namen, Image und Laufzeit.

2. **Alle Container anzeigen (auch gestoppte):**
   ```bash
   sudo docker ps -a
   ```

3. **GPU-Belegung prufen:**
   ```bash
   nvidia-smi
   ```
   Achte auf `Memory-Usage` und laufende Prozesse in der unteren Tabelle.

4. **Eigenen Benutzer bestatigen:**
   ```bash
   whoami
   ```

5. **Eigene Prozesse anzeigen:**
   ```bash
   ps -u $(whoami)
   ```

6. **Erst dann handeln.** Wenn du unsicher bist, ob eine GPU oder ein Container frei ist, frage im Team nach.

## Wichtige Befehle

```bash
# Container-Ubersicht
sudo docker ps
sudo docker ps -a

# GPU-Status
nvidia-smi

# Wer bin ich?
whoami

# Meine laufenden Prozesse
ps -u $(whoami)

# Wer nutzt eine bestimmte Datei?
lsof /pfad/zur/datei
```

## Typische Fehler

- **Fehler**: `docker stop` auf einen fremden Container ausfuhren, weil man denkt, er sei "hangen geblieben".
  - **Folge**: Die Arbeit einer anderen Person wird abrupt abgebrochen.
  - **Losung**: Vorher `docker ps` prufen und den Containernamen mit dem eigenen abgleichen.

- **Fehler**: GPU 0 nutzen, weil sie "frei aussieht", ohne zu prufen, ob dort ein Prozess im Hintergrund lauft.
  - **Folge**: OOM-Fehler oder Leistungseinbruch bei beiden Workloads.
  - **Losung**: `nvidia-smi` genau lesen – nicht nur `GPU-Util`, sondern auch `Memory-Usage`.

- **Fehler**: Eine Datei in `/data/pool/` loschen, weil man dachte, sie sei "alt".
  - **Folge**: Ein Workflow einer anderen Person funktioniert nicht mehr.
  - **Losung**: Vor dem Loschen prufen, wem die Datei gehort: `ls -la /pfad/zur/datei`.

## Merksatz

Erst prufen, dann stoppen. Auf einem geteilten Server kann ein falscher Befehl die Arbeit anderer Personen abbrechen.
