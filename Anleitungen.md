# Anleitungen – Redaktionsplan für Claude / DeepSeek

## Zweck dieser Datei

Diese Datei ist ein Arbeitsplan für Claude, DeepSeek oder eine andere KI, die Inhalte für eine technische Wissensplattform erstellen soll.

Die Webseite soll Anleitungen, Erklärungen, Fehlerlösungen und Befehlsreferenzen rund um das aktuelle DGX-/Docker-/ComfyUI-Setup enthalten.

Die Inhalte sollen nicht nur oberflächlich beschreiben, sondern als echte praktische Dokumentation nutzbar sein.

---

## Projektkontext

Wir arbeiten auf einem TH OWL DGX-Server über SSH.

### Serverzugang

```bash
ssh m4z-d1t@hal9000.skim.th-owl.de
```

### Projektordner

```bash
/data/pool/m4z-d1t/comfyui-project
```

### Nicht mehr verwenden

```bash
~/comfyui-project
```

Der Home-Ordner ist für große Modelle ungeeignet, weil es dort Speicherprobleme geben kann.

### Hauptcontainer

```bash
comfyui_data
```

### Aktuelles Standard-Image

```bash
comfyui-custom-torch271
```

### Browser-Zugriff

```text
http://hal9000.skim.th-owl.de:8188
```

### Wichtige Ordner

```bash
models/
models/diffusion_models
models/checkpoints
models/loras
models/text_encoders
models/vae
models/upscale_models
models/latent_upscale_models
custom_nodes
output
workflows
```

---

## Schreibauftrag für Claude / DeepSeek

Erstelle aus diesem Plan vollständige Webseiteninhalte im Stil einer hochwertigen technischen Wissensplattform.

Jede Anleitung soll nach diesem Muster aufgebaut werden:

```markdown
# Titel der Anleitung

## Frage

Welche konkrete Frage beantwortet diese Anleitung?

## Kurze Antwort

Kurze, direkte Antwort in wenigen Sätzen.

## Erklärung

Ausführliche Erklärung mit Hintergrund.

## Schritt-für-Schritt-Anleitung

1. Schritt
2. Schritt
3. Schritt

## Wichtige Befehle

```bash
...
```

## Typische Fehler

- Fehler
- Ursache
- Lösung

## Merksatz

Kurze Regel, die man sich merken kann.
```

Die Inhalte sollen klar, ruhig, technisch korrekt und für Anfänger verständlich sein. Keine unnötige Theorie, aber genug Erklärung, damit man versteht, was man tut.

---

# Inhaltsstruktur der Webseite

## Hauptbereiche

1. Einstieg und Grundverständnis
2. Serverzugang per SSH
3. Projektstruktur auf dem DGX-Server
4. Docker-Grundlagen
5. ComfyUI starten, stoppen und verwalten
6. GPU-Nutzung und `nvidia-smi`
7. Modelle herunterladen und einsortieren
8. Workflows importieren
9. Custom Nodes installieren
10. Troubleshooting
11. PyTorch / Torch-Versionen / Container-Upgrades
12. Befehlslegende
13. Cheat-Sheets

---

# Geplante Anleitungen mit Titel, Frage und Antwort

## 1. Einstieg

### Anleitung 1: Was ist dieses Projekt?

**Frage:**  
Worum geht es bei dieser Wissensplattform?

**Antwort:**  
Diese Plattform dokumentiert den praktischen Umgang mit einem DGX-Server, Docker, ComfyUI, KI-Modellen, Workflows, Custom Nodes und typischen Fehlern. Ziel ist es, wiederkehrende Aufgaben und Probleme so zu erklären, dass man sie Schritt für Schritt nachmachen kann.

---

### Anleitung 2: Was läuft lokal und was läuft auf dem Server?

**Frage:**  
Was passiert auf meinem Mac oder Windows-PC, und was passiert auf dem DGX-Server?

**Antwort:**  
Der lokale Rechner dient hauptsächlich als Zugang. Dort öffnet man Terminal, PowerShell oder den Browser. Die eigentliche Arbeit passiert auf dem DGX-Server: Docker läuft dort, ComfyUI läuft dort, Modelle liegen dort, und die GPUs werden dort genutzt.

---

### Anleitung 3: Brauche ich Docker lokal auf Mac oder Windows?

**Frage:**  
Muss Docker Desktop auf dem lokalen Rechner installiert sein?

**Antwort:**  
Für den reinen DGX-Workflow ist lokales Docker nicht zwingend nötig. Docker läuft auf dem Server. Der lokale Rechner braucht nur Terminal/PowerShell, SSH und einen Browser. Docker lokal kann trotzdem sinnvoll sein, wenn man später auch lokale Container testen möchte oder wenn es zum Firmenstandard gehört.

---

## 2. Serverzugang per SSH

### Anleitung 4: Wie verbinde ich mich mit dem DGX-Server?

**Frage:**  
Wie komme ich vom lokalen Rechner auf den DGX-Server?

**Antwort:**  
Über SSH:

```bash
ssh m4z-d1t@hal9000.skim.th-owl.de
```

Nach der Eingabe wird das Passwort abgefragt. Beim Tippen des Passworts werden keine Zeichen angezeigt. Das ist normal.

---

### Anleitung 5: Wie erkenne ich, ob ich auf dem Server bin?

**Frage:**  
Wie prüfe ich, ob ich wirklich auf dem Server arbeite?

**Antwort:**  
Mit:

```bash
whoami
pwd
```

`whoami` zeigt den aktuellen Benutzer. `pwd` zeigt den aktuellen Ordner.

---

### Anleitung 6: Welche ersten Befehle sollte ich nach dem Login kennen?

**Frage:**  
Welche Befehle helfen mir direkt nach dem SSH-Login?

**Antwort:**  
Die wichtigsten Startbefehle sind:

```bash
pwd
whoami
ls -la
cd /data/pool/m4z-d1t/comfyui-project
```

Damit prüft man Benutzer, aktuellen Ordner, vorhandene Dateien und wechselt in das Projekt.

---

## 3. Projektstruktur

### Anleitung 7: Warum arbeiten wir in `/data/pool/...`?

**Frage:**  
Warum nutzen wir nicht einfach den Home-Ordner?

**Antwort:**  
Große Modelle können sehr viel Speicher brauchen. Der Home-Ordner kann begrenzt sein. Deshalb liegt das Projekt unter:

```bash
/data/pool/m4z-d1t/comfyui-project
```

Dort ist der richtige Arbeitsbereich für große Dateien.

---

### Anleitung 8: Welche Ordner braucht ComfyUI?

**Frage:**  
Welche Ordnerstruktur wird für Modelle, Outputs und Custom Nodes verwendet?

**Antwort:**  
Die wichtigste Struktur ist:

```bash
models/diffusion_models
models/checkpoints
models/loras
models/text_encoders
models/vae
models/upscale_models
models/latent_upscale_models
custom_nodes
output
workflows
```

Jeder Modelltyp muss in den richtigen Ordner, sonst findet ComfyUI die Datei oft nicht.

---

### Anleitung 9: Wie lege ich die Projektstruktur neu an?

**Frage:**  
Wie erstelle ich alle benötigten Ordner von null?

**Antwort:**  

```bash
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/diffusion_models
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/checkpoints
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/loras
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/text_encoders
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/vae
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/upscale_models
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/latent_upscale_models
mkdir -p /data/pool/m4z-d1t/comfyui-project/custom_nodes
mkdir -p /data/pool/m4z-d1t/comfyui-project/output
mkdir -p /data/pool/m4z-d1t/comfyui-project/workflows
```

---

## 4. Docker-Grundlagen

### Anleitung 10: Was ist ein Docker-Image?

**Frage:**  
Was bedeutet Docker-Image?

**Antwort:**  
Ein Docker-Image ist die Vorlage für einen Container. Es enthält die Software, Abhängigkeiten und Umgebung. In diesem Projekt ist das aktuelle Image:

```bash
comfyui-custom-torch271
```

---

### Anleitung 11: Was ist ein Docker-Container?

**Frage:**  
Was ist der Unterschied zwischen Image und Container?

**Antwort:**  
Das Image ist die Vorlage. Der Container ist die laufende Instanz davon. Man kann ein Image mehrfach starten, aber jeder laufende Container hat einen eigenen Namen, z. B.:

```bash
comfyui_data
```

---

### Anleitung 12: Wann nutze ich `docker run`, `docker start`, `docker stop` und `docker rm`?

**Frage:**  
Wann nimmt man welchen Docker-Befehl?

**Antwort:**  

- `docker run` erstellt einen neuen Container.
- `docker start` startet einen vorhandenen Container.
- `docker stop` stoppt einen laufenden Container.
- `docker rm` entfernt einen gestoppten Container.
- Wenn sich die GPU-Zuordnung ändern soll, muss der Container neu erstellt werden.

---

## 5. ComfyUI starten und stoppen

### Anleitung 13: Wie starte ich ComfyUI im Alltag?

**Frage:**  
Wie starte ich ComfyUI, wenn der Container bereits existiert?

**Antwort:**  

```bash
ssh m4z-d1t@hal9000.skim.th-owl.de
cd /data/pool/m4z-d1t/comfyui-project
sudo docker start comfyui_data
sudo docker ps
```

Danach im Browser öffnen:

```text
http://hal9000.skim.th-owl.de:8188
```

---

### Anleitung 14: Wie stoppe ich ComfyUI?

**Frage:**  
Wie beende ich ComfyUI sauber?

**Antwort:**  

```bash
sudo docker stop comfyui_data
```

Das stoppt den Container, löscht aber keine Modelle, Outputs oder Workflows.

---

### Anleitung 15: Wie starte ich ComfyUI mit einer bestimmten GPU neu?

**Frage:**  
Wie ändere ich die GPU, auf der ComfyUI läuft?

**Antwort:**  
Die GPU wird beim `docker run` festgelegt. Deshalb muss der Container entfernt und neu erstellt werden:

```bash
sudo docker stop comfyui_data
sudo docker rm comfyui_data
sudo docker run -d \
  --name comfyui_data \
  --gpus '"device=5"' \
  -p 8188:8188 \
  -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
  -v /data/pool/m4z-d1t/comfyui-project/output:/app/output \
  -v /data/pool/m4z-d1t/comfyui-project/custom_nodes:/app/custom_nodes \
  -v /data/pool/m4z-d1t/comfyui-project/workflows:/app/user \
  comfyui-custom-torch271
```

---

### Anleitung 16: Wie starte ich ComfyUI mit mehreren GPUs?

**Frage:**  
Wie mache ich mehrere GPUs für den Container sichtbar?

**Antwort:**  

```bash
--gpus '"device=0,2,5"'
```

Beispiel:

```bash
sudo docker run -d \
  --name comfyui_data \
  --gpus '"device=0,2,5"' \
  -p 8188:8188 \
  -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
  -v /data/pool/m4z-d1t/comfyui-project/output:/app/output \
  -v /data/pool/m4z-d1t/comfyui-project/custom_nodes:/app/custom_nodes \
  -v /data/pool/m4z-d1t/comfyui-project/workflows:/app/user \
  comfyui-custom-torch271
```

Wichtig: Mehr sichtbare GPUs bedeuten nicht automatisch, dass ein einzelner Workflow den VRAM aller Karten kombiniert.

---

## 6. GPU-Nutzung

### Anleitung 17: Wie lese ich `nvidia-smi`?

**Frage:**  
Wie erkenne ich, welche GPU frei ist?

**Antwort:**  
Mit:

```bash
nvidia-smi
```

Wichtig sind:

- `Memory-Usage`
- `GPU-Util`
- laufende Prozesse unten in der Tabelle

Eine GPU mit wenig Speicherbelegung und niedriger Auslastung ist meist besser geeignet.

---

### Anleitung 18: Warum bringt mehr GPUs nicht automatisch mehr Speicher?

**Frage:**  
Warum bekomme ich OOM, obwohl ich mehrere GPUs ausgewählt habe?

**Antwort:**  
Docker macht GPUs nur sichtbar. ComfyUI verteilt ein Modell nicht automatisch auf mehrere GPUs. Viele Workflows rechnen praktisch auf einer Haupt-GPU. Deshalb kann eine GPU voll laufen, obwohl andere sichtbar sind.

---

### Anleitung 19: Wie beobachte ich GPUs live?

**Frage:**  
Wie sehe ich live, ob eine GPU arbeitet?

**Antwort:**  

```bash
watch -n 1 nvidia-smi
```

Nur bestimmte GPUs:

```bash
watch -n 1 nvidia-smi -i 0,2,5
```

Beenden mit:

```text
Ctrl + C
```

---

## 7. Modelle herunterladen

### Anleitung 20: Wie lade ich ein Modell direkt auf den Server?

**Frage:**  
Wie verwende ich einen Hugging-Face-Link im Terminal?

**Antwort:**  

```bash
wget -c --show-progress -O /data/pool/m4z-d1t/comfyui-project/models/ORDNER/datei.safetensors "DIREKTER_LINK"
```

`-c` sorgt dafür, dass ein abgebrochener Download fortgesetzt werden kann.

---

### Anleitung 21: Was ist der Unterschied zwischen `blob` und `resolve`?

**Frage:**  
Warum funktionieren manche Hugging-Face-Links nicht direkt mit `wget`?

**Antwort:**  
`blob` ist die Webseite zur Datei. `resolve` ist der direkte Download-Link.

Falsch für `wget`:

```text
https://huggingface.co/.../blob/main/datei.safetensors
```

Richtig für `wget`:

```text
https://huggingface.co/.../resolve/main/datei.safetensors
```

---

### Anleitung 22: Wie prüfe ich, ob ein Modell angekommen ist?

**Frage:**  
Wie sehe ich, ob die Datei wirklich heruntergeladen wurde?

**Antwort:**  

```bash
ls -lh /data/pool/m4z-d1t/comfyui-project/models/ORDNER
```

`-lh` zeigt Dateigrößen lesbar an.

---

### Anleitung 23: Was mache ich bei `No such file or directory` beim Download?

**Frage:**  
Warum bricht `wget` ab, obwohl der Link stimmt?

**Antwort:**  
Meist existiert der Zielordner noch nicht. Lösung:

```bash
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/upscale_models
```

Dann den `wget`-Befehl erneut ausführen.

---

### Anleitung 24: Was mache ich bei `401 Unauthorized`?

**Frage:**  
Warum kann ein Hugging-Face-Modell nicht geladen werden?

**Antwort:**  
Das Modell ist wahrscheinlich geschützt oder gated. Man braucht ggf.:

- Hugging-Face-Login
- akzeptierte Lizenz
- HF-Token

Beispiel:

```bash
wget --header="Authorization: Bearer DEIN_HF_TOKEN" -c --show-progress -O /data/pool/m4z-d1t/comfyui-project/models/diffusion_models/datei.safetensors "DIREKTER_DATEILINK"
```

Tokens dürfen nicht öffentlich geteilt werden.

---

## 8. Modellordner

### Anleitung 25: Warum findet ComfyUI mein Modell nicht?

**Frage:**  
Warum wird eine Datei nicht angezeigt, obwohl sie heruntergeladen wurde?

**Antwort:**  
Meist liegt sie im falschen Ordner oder hat nicht den erwarteten Namen. ComfyUI erwartet bestimmte Modelltypen in bestimmten Ordnern.

---

### Anleitung 26: Welches Modell gehört in welchen Ordner?

**Frage:**  
Wo müssen Checkpoints, LoRAs, VAE und Text Encoder hin?

**Antwort:**  

- Checkpoints: `models/checkpoints`
- Diffusion Models: `models/diffusion_models`
- LoRAs: `models/loras`
- Text Encoder: `models/text_encoders`
- VAE: `models/vae`
- Upscaler: `models/upscale_models`
- Latent Upscaler: `models/latent_upscale_models`

---

### Anleitung 27: Wie verschiebe ich eine Datei in den richtigen Ordner?

**Frage:**  
Wie korrigiere ich einen falsch gespeicherten Modellpfad?

**Antwort:**  

```bash
mv /alter/pfad/datei.safetensors /data/pool/m4z-d1t/comfyui-project/models/korrekter_ordner/
```

Wenn man die Originaldatei behalten möchte:

```bash
cp /alter/pfad/datei.safetensors /neuer/pfad/
```

---

## 9. Workflows

### Anleitung 28: Wie importiere ich einen Workflow in ComfyUI?

**Frage:**  
Wie bekomme ich eine Workflow-JSON in ComfyUI?

**Antwort:**  
Am einfachsten lädt man die JSON-Datei lokal herunter und zieht sie per Drag-and-drop in die ComfyUI-Oberfläche.

---

### Anleitung 29: Warum kann ich nicht in den `workflows`-Ordner schreiben?

**Frage:**  
Warum kommt `Permission denied`, wenn ich eine Workflow-Datei per Terminal speichern will?

**Antwort:**  
Der Ordner kann root gehören oder von ComfyUI selbst erzeugt worden sein. Wenn er nicht leer ist, sollte man ihn nicht löschen. Sicherer ist der Import über die Browseroberfläche.

---

### Anleitung 30: Wie lade ich einen Workflow von GitHub?

**Frage:**  
Wie lade ich eine Workflow-JSON per Terminal herunter?

**Antwort:**  

```bash
wget -c --show-progress -O "workflow.json" "RAW_GITHUB_LINK"
```

Wichtig: Für `wget` braucht man den Raw-Link, nicht die normale GitHub-Ansicht.

---

## 10. Custom Nodes

### Anleitung 31: Was sind Custom Nodes?

**Frage:**  
Warum fehlen in Workflows manchmal Nodes?

**Antwort:**  
Custom Nodes erweitern ComfyUI um zusätzliche Funktionen. Wenn ein Workflow solche Nodes nutzt, müssen die entsprechenden Node-Pakete in `custom_nodes` installiert sein.

---

### Anleitung 32: Wie installiere ich Custom Nodes manuell?

**Frage:**  
Wie installiere ich ein Custom-Node-Repo ohne ComfyUI Manager?

**Antwort:**  

```bash
cd /data/pool/m4z-d1t/comfyui-project/custom_nodes
git clone REPO_URL
sudo docker exec -it comfyui_data pip install -r /app/custom_nodes/REPO_NAME/requirements.txt
sudo docker stop comfyui_data
sudo docker start comfyui_data
```

---

### Anleitung 33: Was mache ich bei `Permission denied` in `custom_nodes`?

**Frage:**  
Warum kann ich kein Repo in `custom_nodes` klonen?

**Antwort:**  
Der Ordner gehört eventuell root. Prüfen mit:

```bash
ls -ld /data/pool/m4z-d1t/comfyui-project/custom_nodes
```

Wenn der Ordner leer ist:

```bash
cd /data/pool/m4z-d1t/comfyui-project
rmdir custom_nodes
mkdir custom_nodes
```

Dann erneut klonen.

---

### Anleitung 34: Warum wird ein installierter Node trotzdem als fehlend angezeigt?

**Frage:**  
Warum bleibt ein Node rot, obwohl das Repo vorhanden ist?

**Antwort:**  
Das Repo ist eventuell vorhanden, aber beim Start von ComfyUI schlägt der Import fehl. Dann muss man die Logs prüfen:

```bash
sudo docker logs --tail 300 comfyui_data | grep -i -E "import failed|traceback|error|failed"
```

---

### Anleitung 35: Wie behebe ich `libGL.so.1` oder `ffmpeg`-Fehler?

**Frage:**  
Warum laden VideoHelperSuite oder Easy-Use nicht?

**Antwort:**  
Oft fehlen Systembibliotheken im Container:

```bash
sudo docker exec -u 0 -it comfyui_data bash -lc "apt-get update && apt-get install -y libgl1 libglib2.0-0 ffmpeg python3-opencv"
```

Danach:

```bash
sudo docker stop comfyui_data
sudo docker start comfyui_data
```

---

## 11. PyTorch und Container-Upgrades

### Anleitung 36: Warum war PyTorch 2.7.1 nötig?

**Frage:**  
Warum musste Torch aktualisiert werden?

**Antwort:**  
Ein KJNodes-Workflow brauchte `fp16 accumulation`. Der Fehler lautete:

```text
Failed to set fp16 accumulation, this requires pytorch 2.7.1 or higher
```

Deshalb wurde ein neues Image mit PyTorch 2.7.1 erstellt.

---

### Anleitung 37: Was ist der Unterschied zwischen Python und PyTorch?

**Frage:**  
Warum reicht es nicht, Python zu aktualisieren?

**Antwort:**  
Python ist die Programmiersprache. PyTorch ist die KI-Bibliothek, die GPU-Berechnung übernimmt. Der Fehler bezog sich auf PyTorch, nicht auf Python.

---

### Anleitung 38: Wie wurde das neue Image erstellt?

**Frage:**  
Wie wurde aus dem alten Container ein neues Image mit Torch 2.7.1?

**Antwort:**  
Es wurde Torch im Container aktualisiert und danach ein neues Image committed:

```bash
sudo docker commit comfyui_data comfyui-custom-torch271
```

Das aktuelle Standard-Image ist:

```bash
comfyui-custom-torch271
```

---

### Anleitung 39: Wie starte ich ab jetzt mit dem neuen Image?

**Frage:**  
Welches Image muss ich ab jetzt für ComfyUI benutzen?

**Antwort:**  
Bei neuen `docker run`-Befehlen muss am Ende stehen:

```bash
comfyui-custom-torch271
```

Nicht mehr:

```bash
comfyui-custom
```

---

## 12. SageAttention

### Anleitung 40: Was bedeutet `No module named sageattention`?

**Frage:**  
Warum kommt dieser Fehler?

**Antwort:**  
Ein KJNodes-Optimierungsnode versucht SageAttention zu verwenden, aber das Paket ist nicht installiert oder nicht richtig gebaut.

---

### Anleitung 41: Warum reicht `pip install sageattention` nicht immer?

**Frage:**  
Warum gibt es danach trotzdem Fehler?

**Antwort:**  
PyPI bietet teilweise nur ältere Versionen. Manche Funktionen wie `sageattn_qk_int8_pv_fp16_cuda` brauchen neuere Versionen oder einen Build aus GitHub mit CUDA-Unterstützung.

---

### Anleitung 42: Was ist die sichere Zwischenlösung bei SageAttention-Problemen?

**Frage:**  
Wie kann ich weiterarbeiten, wenn SageAttention nicht läuft?

**Antwort:**  
Im Workflow den betreffenden Knoten so einstellen, dass SageAttention deaktiviert ist, oder den Node bypassen. Das ist oft schneller und sicherer als ein komplizierter Build.

---

## 13. OOM / Speicherfehler

### Anleitung 43: Was bedeutet `torch.OutOfMemoryError`?

**Frage:**  
Warum läuft die GPU voll?

**Antwort:**  
Der Workflow braucht mehr VRAM, als die ausgewählte GPU frei hat. Mehr sichtbare GPUs helfen nicht automatisch, wenn der Workflow nicht wirklich verteilt rechnet.

---

### Anleitung 44: Wie reduziere ich VRAM-Verbrauch?

**Frage:**  
Welche Einstellungen helfen gegen OOM?

**Antwort:**  

- Batch Size auf 1
- Auflösung senken
- weniger Frames
- weniger Steps
- weniger LoRAs
- kleinere Modellvariante nutzen
- freie GPU auswählen

---

### Anleitung 45: Wie finde ich die beste GPU für einen Run?

**Frage:**  
Welche GPU sollte ich auswählen?

**Antwort:**  
Mit `nvidia-smi` die GPU suchen, die möglichst wenig Speicher belegt hat und wenig ausgelastet ist.

---

# Befehlslegende

## Lokale / SSH-Befehle

### `ssh`

**Bedeutung:**  
Verbindet den lokalen Rechner mit dem Server.

**Beispiel:**

```bash
ssh m4z-d1t@hal9000.skim.th-owl.de
```

**Merksatz:**  
SSH ist der Eingang zum Server.

---

### `pwd`

**Bedeutung:**  
Zeigt den aktuellen Ordner.

**Beispiel:**

```bash
pwd
```

**Merksatz:**  
Wenn du nicht weißt, wo du bist: `pwd`.

---

### `whoami`

**Bedeutung:**  
Zeigt den aktuellen Benutzer.

**Beispiel:**

```bash
whoami
```

---

### `ls`

**Bedeutung:**  
Zeigt Dateien und Ordner.

**Beispiel:**

```bash
ls
```

---

### `ls -la`

**Bedeutung:**  
Zeigt Dateien, Ordner, versteckte Dateien und Rechte.

**Beispiel:**

```bash
ls -la
```

**Nützlich bei:**  
`Permission denied`, Eigentümer prüfen.

---

### `ls -lh`

**Bedeutung:**  
Zeigt Dateien mit gut lesbaren Größen.

**Beispiel:**

```bash
ls -lh models/checkpoints
```

---

### `cd`

**Bedeutung:**  
Wechselt den Ordner.

**Beispiel:**

```bash
cd /data/pool/m4z-d1t/comfyui-project
```

---

### `mkdir -p`

**Bedeutung:**  
Legt Ordner an. Erstellt auch fehlende Zwischenordner.

**Beispiel:**

```bash
mkdir -p models/upscale_models
```

**Merksatz:**  
Vor Downloads immer Zielordner anlegen.

---

### `cp`

**Bedeutung:**  
Kopiert Dateien.

**Beispiel:**

```bash
cp quelle.safetensors ziel.safetensors
```

---

### `mv`

**Bedeutung:**  
Verschiebt oder benennt Dateien um.

**Beispiel:**

```bash
mv datei.safetensors models/checkpoints/
```

---

### `rm`

**Bedeutung:**  
Löscht Dateien.

**Beispiel:**

```bash
rm datei.safetensors
```

**Warnung:**  
Vorsichtig benutzen. Gelöschte Dateien sind nicht automatisch wiederherstellbar.

---

### `rmdir`

**Bedeutung:**  
Löscht leere Ordner.

**Beispiel:**

```bash
rmdir custom_nodes
```

**Wichtig:**  
Funktioniert nur, wenn der Ordner leer ist.

---

## Docker-Befehle

### `sudo docker ps`

**Bedeutung:**  
Zeigt laufende Container.

```bash
sudo docker ps
```

---

### `sudo docker ps -a`

**Bedeutung:**  
Zeigt alle Container, auch gestoppte.

```bash
sudo docker ps -a
```

---

### `sudo docker images`

**Bedeutung:**  
Zeigt Docker-Images.

```bash
sudo docker images
```

---

### `sudo docker run`

**Bedeutung:**  
Erstellt und startet einen neuen Container.

**Beispiel:**

```bash
sudo docker run -d \
  --name comfyui_data \
  --gpus '"device=5"' \
  -p 8188:8188 \
  -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
  -v /data/pool/m4z-d1t/comfyui-project/output:/app/output \
  -v /data/pool/m4z-d1t/comfyui-project/custom_nodes:/app/custom_nodes \
  -v /data/pool/m4z-d1t/comfyui-project/workflows:/app/user \
  comfyui-custom-torch271
```

**Merksatz:**  
`run` nur, wenn ein neuer Container erstellt werden soll.

---

### `sudo docker start`

**Bedeutung:**  
Startet einen vorhandenen Container.

```bash
sudo docker start comfyui_data
```

---

### `sudo docker stop`

**Bedeutung:**  
Stoppt einen laufenden Container.

```bash
sudo docker stop comfyui_data
```

---

### `sudo docker rm`

**Bedeutung:**  
Entfernt einen gestoppten Container.

```bash
sudo docker rm comfyui_data
```

**Wichtig:**  
Löscht nicht die gemounteten Modelle und Outputs, wenn sie in `/data/pool/...` liegen.

---

### `sudo docker logs`

**Bedeutung:**  
Zeigt Container-Logs.

```bash
sudo docker logs --tail 100 comfyui_data
```

---

### `sudo docker logs -f`

**Bedeutung:**  
Zeigt Logs live.

```bash
sudo docker logs -f comfyui_data
```

Beenden mit:

```text
Ctrl + C
```

---

### `sudo docker exec -it`

**Bedeutung:**  
Führt einen Befehl im Container aus.

**Beispiel:**

```bash
sudo docker exec -it comfyui_data pip install paketname
```

**Merksatz:**  
`docker exec` = Befehl im Container, nicht auf dem Host.

---

### `sudo docker commit`

**Bedeutung:**  
Speichert den aktuellen Zustand eines Containers als neues Image.

**Beispiel:**

```bash
sudo docker commit comfyui_data comfyui-custom-torch271
```

---

## GPU-Befehle

### `nvidia-smi`

**Bedeutung:**  
Zeigt GPUs, Speicherbelegung, Auslastung und Prozesse.

```bash
nvidia-smi
```

---

### `watch -n 1 nvidia-smi`

**Bedeutung:**  
Aktualisiert `nvidia-smi` jede Sekunde.

```bash
watch -n 1 nvidia-smi
```

---

### `watch -n 1 nvidia-smi -i 5`

**Bedeutung:**  
Zeigt nur GPU 5 live.

```bash
watch -n 1 nvidia-smi -i 5
```

---

## Download-Befehle

### `wget`

**Bedeutung:**  
Lädt Dateien aus dem Internet.

```bash
wget -O datei.safetensors "LINK"
```

---

### `wget -c`

**Bedeutung:**  
Setzt abgebrochene Downloads fort.

```bash
wget -c --show-progress -O datei.safetensors "LINK"
```

---

### `--show-progress`

**Bedeutung:**  
Zeigt Download-Fortschritt übersichtlicher.

---

## Python / Pip im Container

### `pip install`

**Bedeutung:**  
Installiert Python-Pakete.

```bash
sudo docker exec -it comfyui_data pip install paketname
```

---

### `pip uninstall`

**Bedeutung:**  
Entfernt Python-Pakete.

```bash
sudo docker exec -it comfyui_data pip uninstall -y paketname
```

---

### Version prüfen

```bash
sudo docker exec -it comfyui_data python3 -c "import torch; print(torch.__version__)"
```

---

# Cheat-Sheet

## Start

```bash
ssh m4z-d1t@hal9000.skim.th-owl.de
cd /data/pool/m4z-d1t/comfyui-project
sudo docker start comfyui_data
sudo docker ps
```

## Browser

```text
http://hal9000.skim.th-owl.de:8188
```

## Stop

```bash
sudo docker stop comfyui_data
```

## Logs

```bash
sudo docker logs --tail 100 comfyui_data
```

## Live-Logs

```bash
sudo docker logs -f comfyui_data
```

## GPU prüfen

```bash
nvidia-smi
```

## GPU live prüfen

```bash
watch -n 1 nvidia-smi
```

## Container mit anderer GPU neu erstellen

```bash
sudo docker stop comfyui_data
sudo docker rm comfyui_data
sudo docker run -d \
  --name comfyui_data \
  --gpus '"device=5"' \
  -p 8188:8188 \
  -v /data/pool/m4z-d1t/comfyui-project/models:/app/models \
  -v /data/pool/m4z-d1t/comfyui-project/output:/app/output \
  -v /data/pool/m4z-d1t/comfyui-project/custom_nodes:/app/custom_nodes \
  -v /data/pool/m4z-d1t/comfyui-project/workflows:/app/user \
  comfyui-custom-torch271
```

## Modell herunterladen

```bash
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/ORDNER
wget -c --show-progress -O /data/pool/m4z-d1t/comfyui-project/models/ORDNER/datei.safetensors "DIREKTER_LINK"
```

---

# Zusatzauftrag für Claude / DeepSeek

Bitte erstelle aus dieser Datei echte Webseiteninhalte.

Die Seite soll nicht nur diese Datei anzeigen, sondern daraus strukturierte Unterseiten, Artikel und Referenzen erzeugen.

Priorität:

1. ComfyUI von 0 bis 100
2. Docker-Grundlagen für dieses Projekt
3. GPU-Auswahl und VRAM verstehen
4. Modelle herunterladen und richtig einsortieren
5. Custom Nodes installieren
6. Troubleshooting
7. Befehlslegende
8. Cheat-Sheets

Jede Seite soll mit Titel, Frage, Antwort, Erklärung, Befehlen, typischen Fehlern und Merksätzen aufgebaut sein.
