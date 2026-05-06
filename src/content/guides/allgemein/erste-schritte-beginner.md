---
title: "Vom Start zum ersten Bild – die Einsteiger-Anleitung"
description: "Schritt fur Schritt vom ersten SSH-Login uber Docker, Modelle und Workflows bis zum ersten generierten Bild. Der rote Faden fur absolute Beginner."
difficulty: "anfanger"
topic: "allgemein"
tags: ["einsteiger", "erstes-bild", "ssh", "docker", "comfyui", "modelle", "workflows", "komplettanleitung"]
publishedAt: 2025-05-06
featured: true
readingTimeMinutes: 18
---

## Frage

Ich bin neu. Wo fange ich an, und wie komme ich von null zum ersten generierten Bild?

## Kurze Antwort

1. Per SSH auf den DGX-Server verbinden
2. Docker-Container mit ComfyUI starten
3. ComfyUI im Browser offnen
4. Mindestens ein Modell (Checkpoint) herunterladen
5. Einen Workflow laden (aus Vorlage oder importieren)
6. Prompt eingeben und auf "Queue Prompt" klicken
7. Bild ansehen und herunterladen

Diese Anleitung fuhrt dich durch jeden dieser Schritte. Plane fur das erste Mal etwa 30-60 Minuten ein – der Modell-Download braucht den groaten Teil davon.

## Voraussetzungen

Bevor du loslegst, brauchst du:

| Was? | Woher? | Zustandig |
|------|--------|-----------|
| SSH-Zugang zum DGX-Server | Server-Admin richtet ihn ein | [SSH-Server-Zugang](/guides/ssh/ssh-server-zugang/) |
| Server-Adresse (Hostname) | Vom Admin oder Projektleiter | `hal9000.skim.th-owl.de` |
| Benutzername | Dein TH-OWL-Kurzel | z.B. `m4z-d1t` |
| Docker ist auf dem Server installiert | Vom Admin eingerichtet | – |
| Ein Docker-Image mit ComfyUI | Einmalig gebaut | [ComfyUI starten](/guides/comfyui/comfyui-starten/) |
| Projektverzeichnis auf dem Server | Einmalig angelegt | [Projektstruktur neu anlegen](/guides/dgx/projektstruktur-neu-anlegen/) |

Die Punkte mit "Zustandig" sind normalerweise schon erledigt, bevor du startest. Falls nicht, helfen dir die verlinkten Anleitungen weiter.

## Schritt 1: SSH-Verbindung herstellen

Offne ein Terminal auf deinem Rechner:

- **Mac**: `Terminal.app` (unter Programme → Dienstprogramme)
- **Windows**: PowerShell oder Windows Terminal

```bash
ssh DEIN_BENUTZERNAME@hal9000.skim.th-owl.de
```

Beim ersten Mal wirst du gefragt, ob du dem Fingerprint vertraust. Tippe `yes` und bestatige mit Enter.

Danach gibst du dein Passwort ein. Die Eingabe ist unsichtbar – kein Sternchen, nichts. Einfach tippen und Enter.

Wenn alles klappt, siehst du einen Prompt wie:

```
m4z-d1t@hal9000:~$
```

Jetzt bist du auf dem Server. Alle weiteren Befehle fuhrst du in diesem Terminal aus.

> **Merke**: Das Terminal ist dein Cockpit. Alles, was du hier eintippst, wird auf dem Server ausgefuhrt – nicht auf deinem eigenen Rechner.

## Schritt 2: Erste Orientierung auf dem Server

Sobald du eingeloggt bist, verschaff dir einen Uberblick:

```bash
# Wo bin ich?
pwd
# → /home/m4z-d1t

# Welche GPUs sind verfugbar?
nvidia-smi
# → Zeigt alle GPUs, deren Speichernutzung und laufende Prozesse
```

Wechsle in dein Projektverzeichnis:

```bash
cd /data/pool/DEIN_BENUTZERNAME/comfyui-project
```

Ersetze `DEIN_BENUTZERNAME` mit deinem tatsachlichen Kurzel. In allen folgenden Beispielen verwenden wir `m4z-d1t` – das musst du entsprechend anpassen.

Schau dir an, was schon da ist:

```bash
ls -la
```

Du solltest etwa diese Ordner sehen:

```
models/          ← Hier kommen alle KI-Modelle rein
custom_nodes/    ← ComfyUI-Erweiterungen
workflows/       ← Deine Workflow-Dateien (.json)
output/          ← Generierte Bilder landen hier
```

## Schritt 3: ComfyUI-Container starten

ComfyUI lauft in einem Docker-Container. Das ist wie eine abgeschottete virtuelle Umgebung, die alles enthalt, was ComfyUI braucht.

```bash
# Ist der Container schon mal erstellt worden?
docker ps -a | grep comfyui

# Falls du einen Eintrag siehst (z.B. comfyui_data):
docker start comfyui_data

# Falls nicht, muss der Container einmalig erstellt werden – siehe nachster Abschnitt
```

### Einmalig: Container erstellen (nur beim ersten Mal)

Falls noch kein Container existiert:

```bash
docker run -d --name comfyui_data \
  --gpus '"device=0"' \
  -p 8188:8188 \
  -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
  -v /data/pool/m4z-d1t/comfyui-project/custom_nodes:/app/custom_nodes \
  -v /data/pool/m4z-d1t/comfyui-project/workflows:/app/user/default/workflows \
  -v /data/pool/m4z-d1t/comfyui-project/output:/app/output \
  comfyui-custom-torch271
```

Was bedeuten diese Parameter?

| Parameter | Bedeutung |
|-----------|-----------|
| `-d` | Container lauft im Hintergrund (detached) |
| `--name comfyui_data` | Name des Containers, zum spateren Ansprechen |
| `--gpus '"device=0"'` | Nutzt GPU Nummer 0 |
| `-p 8188:8188` | Leitet Port 8188 vom Container nach auaen |
| `-v /pfad/auf/server:/pfad/im/container` | Bindet Server-Ordner in den Container ein |

Die `-v`-Parameter sind entscheidend: Sie sorgen dafur, dass ComfyUI deine Modelle, Custom Nodes und Workflows sieht – und dass die generierten Bilder nicht verloren gehen, wenn der Container stoppt.

Prufe, ob ComfyUI erfolgreich gestartet ist:

```bash
docker logs --tail 30 comfyui_data
```

Du solltest etwa das sehen:

```
To see the GUI go to: http://0.0.0.0:8188
```

## Schritt 4: ComfyUI im Browser offnen

Offne deinen Browser (Chrome, Firefox, Edge – alles geht) und rufe auf:

```
http://hal9000.skim.th-owl.de:8188
```

Du solltest die ComfyUI-Oberflache sehen: ein graues Raster (Canvas), eine Menuleiste oben und eine Queue-Leiste seitlich.

Du bist jetzt in ComfyUI. Aber noch kann nichts generiert werden – es fehlen Modelle.

## Schritt 5: Modelle herunterladen

Ohne Modell keine Bilder. Der wichtigste Modelltyp fur den Start ist ein **Checkpoint**.

### 5a. Was fur Modelle brauchst du?

| Rang | Typ | Wofur? | Grobe (ca.) | Ordner |
|------|-----|--------|-------------|--------|
| 1 | **Checkpoint** | Das Hauptmodell, erzeugt die Bilder | 6-7 GB (SDXL) | `models/checkpoints/` |
| 2 | LoRA | Kleine Zusatzmodelle fur Stil/Details | 10-300 MB | `models/loras/` |
| 3 | VAE | Verbessert Bildqualitat/Dekodierung | 100-330 MB | `models/vae/` |

Fur den Start reicht **ein Checkpoint**. Alles andere kannst du spater erganzen.

### 5b. Empfohlenes Startmodell: SDXL Base

Fur den Einstieg empfehle ich **SDXL Base 1.0** – das ist das Basis-Modell von Stability AI, liefert gute Ergebnisse und ist gut dokumentiert.

Download auf den Server (du bist per SSH verbunden):

```bash
# Ins Modell-Verzeichnis wechseln
cd /data/pool/m4z-d1t/comfyui-project/models/checkpoints

# SDXL Base 1.0 herunterladen (~6.9 GB)
wget https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors
```

Das dauert je nach Internetanbindung 5-20 Minuten. Du kannst den Fortschritt in deinem Terminal beobachten.

Falls `wget` auf dem Server nicht verfugbar ist, verwende `curl`:

```bash
curl -L -o sd_xl_base_1.0.safetensors \
  https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors
```

### 5c. ComfyUI das neue Modell zeigen

Nach dem Download musst du ComfyUI kurz neustarten, damit das Modell erkannt wird:

```bash
docker restart comfyui_data
```

Warte ~10 Sekunden und lade dann die ComfyUI-Seite im Browser neu (F5).

> **Tipp**: Weitere Modelle findest du auf [Civitai](https://civitai.com) und [Hugging Face](https://huggingface.co). Welches Modell in welchen Ordner kommt, steht in der [Modell-Ordner-Zuordnung](/guides/modelle/modell-ordner-zuordnung/).

## Schritt 6: Workflow laden

Ein Workflow ist eine Anordnung von Nodes (Knoten), die ComfyUI sagt, was es tun soll. Jeder Node macht eine Aufgabe: Modell laden, Prompt verarbeiten, Bild generieren, speichern.

### 6a. Einfachsten Workflow von Grund auf bauen

Das brauchst du fur ein TXT2IMG-Basis-Workflow:

1. **Rechtsklick** auf die leere Canvas → `Add Node` → `loaders` → `Load Checkpoint`
2. **Rechtsklick** → `Add Node` → `conditioning` → `CLIP Text Encode (Prompt)`
3. **Rechtsklick** → `Add Node` → `conditioning` → `CLIP Text Encode (Prompt)` (fur negative Prompt)
4. **Rechtsklick** → `Add Node` → `sampling` → `KSampler`
5. **Rechtsklick** → `Add Node` → `latent` → `Empty Latent Image`
6. **Rechtsklick** → `Add Node` → `image` → `VAE Decode`
7. **Rechtsklick** → `Add Node` → `image` → `Save Image`

Dann die Nodes verbinden (einen Output-Punkt zum Input-Punkt des nachsten Nodes ziehen):

```
[Load Checkpoint]
  ├─ MODEL     → KSampler (model)
  ├─ CLIP      → CLIP Text Encode (clip)
  └─ VAE       → VAE Decode (vae)

[CLIP Text Encode - Positive] → KSampler (positive)
[CLIP Text Encode - Negative] → KSampler (negative)
[Empty Latent Image]          → KSampler (latent_image)

[KSampler]     → VAE Decode (samples)
[VAE Decode]   → Save Image (images)
```

### 6b. Oder: Fertigen Workflow importieren

Einfacher ist es, einen fertigen Workflow zu laden. Dafur die Workflow-JSON-Datei einfach per Drag & Drop auf die ComfyUI-Canvas ziehen – oder die Datei im Browser offnen und den Inhalt mit Strg+A, Strg+C kopieren und in ComfyUI mit Strg+V einfugen.

Fertige Workflows findest du in eurem Projekt-Repository oder auf Plattformen wie [OpenArt](https://openart.ai/workflows) und [ComfyUI Workflows](https://comfyanonymous.github.io/ComfyUI_examples/).

## Schritt 7: Modell im Workflow auswahlen

Klicke im **Load Checkpoint**-Node auf das Dropdown-Feld `ckpt_name`. Du solltest jetzt `sd_xl_base_1.0.safetensors` in der Liste sehen. Wahle es aus.

Falls es nicht erscheint:
- Prufe, ob die Datei wirklich im richtigen Ordner liegt: `ls -la /data/pool/m4z-d1t/comfyui-project/models/checkpoints/`
- ComfyUI-Container einmal neustarten: `docker restart comfyui_data`

## Schritt 8: Prompt eingeben

### Positiver Prompt

Klicke in den oberen **CLIP Text Encode**-Node und gib deinen Prompt ein. Fur SDXL eignen sich englische Prompts am besten:

```
A serene mountain lake at sunset, crystal clear water reflecting orange and pink clouds, pine trees on the shore, photorealistic, 8k, highly detailed
```

Ein guter Prompt-Nachbau fur SDXL:

```
[TYP DES BILDES], [HAUPTMOTIV], [UMGEBUNG/HINTERGRUND], [STIL], [QUALITAT], [LICHT/STIMMUNG]
```

### Negativer Prompt

Klicke in den unteren **CLIP Text Encode**-Node. Der negative Prompt sagt dem Modell, was es vermeiden soll. Ein guter Standard:

```
blurry, low quality, distorted, deformed, ugly, bad anatomy, watermark, text, signature
```

## Schritt 9: KSampler einstellen

Der KSampler-Node steuert die Bildqualitat und den Zufallsfaktor:

| Einstellung | Wert fur Start | Bedeutung |
|-------------|----------------|-----------|
| seed | `randomize` (Button) | Zufallszahl – gleicher Seed = gleiches Bild |
| control_after_generate | `randomize` | Nachster Seed wird automatisch neu gewurfelt |
| steps | `20-30` | Mehr Steps = mehr Details, aber langer |
| cfg | `5-8` (SDXL) | Wie stark der Prompt befolgt wird |
| sampler_name | `euler_ancestral` oder `dpmpp_2m_sde` | Algorithmus fur die Bildentstehung |
| scheduler | `karras` oder `normal` | Steuert die Rauschabnahme |

Fur den Start: **Steps 25, CFG 7, Euler Ancestral, Karras** – das gibt zuverlassig gute Ergebnisse.

## Schritt 10: Bild generieren (Queue Prompt)

Jetzt der groae Moment:

1. Drucke **Strg+Enter** oder klicke auf **"Queue Prompt"** in der rechten Seitenleiste
2. ComfyUI beginnt zu arbeiten – du siehst grune Fortschrittsbalken an jedem Node
3. Nach einigen Sekunden erscheint das Bild im **Save Image**-Node

Die Dauer hangt von GPU, Schritten und Bildgroae ab. Mit einer DGX-GPU und SDXL bei 1024x1024, 25 Steps: etwa 10-30 Sekunden.

> **Tipp**: Alle generierten Bilder findest du auch im `output/`-Ordner deines Projekts.

## Schritt 11: Bild ansehen und speichern

### In ComfyUI

- Rechtsklick auf das Bild im Save-Image-Node → "Save Image" zum Herunterladen
- Oder: Rechtsklick → "Open Image" zum Groaansicht

### Per SSH auf den Server ubertragen

Um mehrere Bilder auf einmal auf deinen Rechner zu holen:

```bash
# Auf deinem eigenen Rechner (nicht auf dem Server!):
scp -r "m4z-d1t@hal9000.skim.th-owl.de:/data/pool/m4z-d1t/comfyui-project/output/*" ~/Downloads/comfyui-bilder/
```

## Wie geht es weiter?

Jetzt, wo du dein erstes Bild generiert hast, kannst du Schritt fur Schritt mehr lernen:

| Nachstes Thema | Anleitung |
|----------------|-----------|
| Bessere Prompts schreiben | Workflow-Dokumentation folgt dem nachsten Artikel |
| LoRA fur bestimmte Stile nutzen | [Modell-Varianten verstehen](/guides/modelle/modellvarianten-verstehen/) |
| Andere Modelle ausprobieren | [Modelle herunterladen](/guides/modelle/modelle-herunterladen/) |
| ComfyUI-Alltag lernen | [ComfyUI im Alltag neustarten](/guides/comfyui/comfyui-alltag-neustart/) |
| GPU wechseln | [ComfyUI GPU wechseln](/guides/comfyui/comfyui-gpu-wechseln/) |
| Eigenen Workflow dokumentieren | [Workflow dokumentieren](/guides/workflows/workflow-dokumentieren/) |
| Fehler verstehen und beheben | [Fehlerquelle identifizieren](/guides/allgemein/fehlerquelle-identifizieren/) |

## Typische Fehler beim ersten Mal

### "No checkpoint found" im Load Checkpoint Node

→ Modell liegt im falschen Ordner oder Container sieht es nicht. Prufe den Pfad und fuhre `docker restart comfyui_data` aus.

### "CUDA out of memory"

→ GPU-Speicher voll. Losungen:
- Kleinere Bildgroae wahlen (z.B. 768x768 statt 1024x1024)
- Weniger Steps probieren
- Prufen, ob jemand anderes die GPU nutzt: `nvidia-smi`
- Andere GPU wahlen: [GPU wechseln](/guides/comfyui/comfyui-gpu-wechseln/)

### ComfyUI-Seite ladt nicht im Browser

→ Container lauft nicht oder Port stimmt nicht:
```bash
docker ps | grep comfyui      # Lauft der Container?
docker logs --tail 20 comfyui_data  # Was sagen die Logs?
```

### "Permission denied" beim Schreiben in Ordner

→ Deine Benutzerrechte reichen nicht. Wahrscheinlich bist du nicht im richtigen Projektverzeichnis oder gehorst nicht der richtigen Gruppe.
→ Details: [Permission Denied richtig beheben](/guides/dgx/permission-denied-richtig/)

### wget/curl: Befehl nicht gefunden

```bash
# Falls wget fehlt:
sudo apt install wget -y

# Falls curl fehlt:
sudo apt install curl -y
```

Falls du kein `sudo` hast, frag deinen Admin.

## Wichtige Befehle auf einen Blick

```bash
# ── SSH & Navigation ─────────────────────
ssh m4z-d1t@hal9000.skim.th-owl.de    # Mit Server verbinden
cd /data/pool/m4z-d1t/comfyui-project # Ins Projekt wechseln
nvidia-smi                             # GPU-Status anzeigen

# ── Docker & ComfyUI ────────────────────
docker ps                              # Laufende Container anzeigen
docker start comfyui_data              # ComfyUI starten
docker stop comfyui_data               # ComfyUI stoppen
docker restart comfyui_data            # ComfyUI neustarten
docker logs --tail 50 comfyui_data     # Letzte 50 Log-Zeilen
docker logs -f comfyui_data            # Live-Logs verfolgen (Strg+C zum Beenden)

# ── Modelle ─────────────────────────────
cd /data/pool/m4z-d1t/comfyui-project/models/checkpoints
wget https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors

# ── Dateien ─────────────────────────────
ls -lh models/checkpoints/             # Modelle mit Groae auflisten
du -sh models/                         # Speicherplatz der Modelle
scp -r BENUTZER@SERVER:/pfad/zu/bildern/* ~/Downloads/  # Bilder runterladen
```

## Merksatz

Deine erste Session ist die aufwendigste. Danach brauchst du nur noch drei Schritte: SSH verbinden, `docker start comfyui_data`, Browser offnen. Der Rest wird Routine.
