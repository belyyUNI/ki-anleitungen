# Erweiterungsplan für weitere DGX-/ComfyUI-/ConfigureAI-Anleitungen

## Zweck dieser Datei

Diese Datei ergänzt die bisherige Website-Planung um weitere sinnvolle Anleitungen, Fragen und Antworten für eine technische Wissensplattform rund um:

- DGX-Server
- ComfyUI
- ConfigureAI / KI-Workflow-Umgebungen
- Docker
- GPU-Nutzung
- Modellverwaltung
- Teamarbeit auf gemeinsam genutzten Servern
- Sicherheit, Wartung und Troubleshooting

Die Inhalte sind als Redaktionsplan gedacht. Claude Code oder DeepSeek kann diese Datei lesen und daraus neue Seiten, Unterseiten oder Guide-Artikel erstellen.

Jede Anleitung sollte später idealerweise nach diesem Schema umgesetzt werden:

```markdown
# Titel

## Frage

## Kurze Antwort

## Erklärung

## Schritt-für-Schritt

## Wichtige Befehle

## Typische Fehler

## Merksatz
```

Die Inhalte sollen klar, ruhig, technisch korrekt und für Anfänger verständlich sein.

---

# Neue Anleitungen

## 1. Wie arbeite ich sicher auf einem geteilten DGX-Server?

### Frage

Was muss ich beachten, wenn mehrere Personen denselben DGX-Server nutzen?

### Kurze Antwort

Auf einem geteilten DGX-Server sollte man nie blind Container, Prozesse oder Dateien anderer Nutzer stoppen, löschen oder überschreiben. Vor Änderungen immer prüfen, welche Prozesse laufen, wem Container gehören und welche GPUs bereits belegt sind.

### Inhaltspunkte

- Unterschied zwischen eigenem Container und fremden Containern
- Warum `docker ps` vor Aktionen wichtig ist
- Warum man nicht wahllos Container stoppen sollte
- Wie man GPU-Prozesse liest
- Wie man eigene Jobs erkennt
- Wann man Rücksprache halten sollte

### Wichtige Befehle

```bash
sudo docker ps
sudo docker ps -a
nvidia-smi
whoami
ps -u $(whoami)
```

### Merksatz

Erst prüfen, dann stoppen. Auf einem geteilten Server kann ein falscher Befehl die Arbeit anderer Personen abbrechen.

---

## 2. Wie erkenne ich, ob ein GPU-Prozess mir gehört?

### Frage

Wie finde ich heraus, ob ein Prozess auf einer GPU von mir stammt?

### Kurze Antwort

Mit `nvidia-smi` sieht man die Prozess-ID. Danach kann man mit `ps` prüfen, welcher Benutzer diesen Prozess gestartet hat.

### Schritt-für-Schritt

1. GPU-Auslastung prüfen.
2. PID aus `nvidia-smi` ablesen.
3. Benutzer und Befehl zur PID prüfen.
4. Nur eigene Prozesse beenden.

### Wichtige Befehle

```bash
nvidia-smi
ps -fp PID
ps -u $(whoami)
```

### Typische Fehler

- Nur auf GPU-Speicher schauen, aber nicht auf den Besitzer des Prozesses.
- Fremde Prozesse beenden.
- Denken, dass 0% GPU-Util bedeutet, dass der Prozess unwichtig ist.

### Merksatz

Die PID aus `nvidia-smi` sagt dir, welchen Prozess du genauer prüfen musst.

---

## 3. Wann sollte ich einen Container neu starten und wann neu erstellen?

### Frage

Wann reicht `docker restart` oder `docker start`, und wann muss der Container mit `docker run` neu erstellt werden?

### Kurze Antwort

Ein einfacher Neustart reicht, wenn nur ComfyUI neu laden soll. Neu erstellen muss man den Container, wenn sich Startparameter ändern, zum Beispiel GPU-Zuordnung, Port, Mounts oder Image.

### Inhaltspunkte

- `docker start`: vorhandenen Container starten
- `docker stop`: laufenden Container stoppen
- `docker restart`: stoppen und starten
- `docker rm`: Container entfernen
- `docker run`: Container neu erstellen
- GPU-Zuordnung wird beim `docker run` gesetzt
- Image-Wechsel erfordert neuen Container

### Tabelle

| Situation | Aktion |
|---|---|
| ComfyUI reagiert nicht | Neustart |
| Neue Custom Nodes installiert | Neustart |
| Neue Modelle geladen | meist Neustart |
| Andere GPU nutzen | Container neu erstellen |
| Neues Docker-Image nutzen | Container neu erstellen |
| Mount-Pfade ändern | Container neu erstellen |

### Merksatz

Starten ist für Bestehendes. Run ist für Neues.

---

## 4. Wie dokumentiere ich einen funktionierenden Workflow sauber?

### Frage

Was sollte ich notieren, wenn ein Workflow endlich funktioniert?

### Kurze Antwort

Wenn ein Workflow läuft, sollte man sofort festhalten, welche Modelle, Custom Nodes, GPU-Einstellungen, Parameter und Workarounds nötig waren. Sonst ist der Workflow später schwer reproduzierbar.

### Empfohlene Dokumentation

- Workflow-Name
- Zweck
- JSON-Datei / Quelle
- benötigte Modelle
- Modellordner
- benötigte Custom Nodes
- getestete GPU
- getestete Auflösung
- Batch Size
- Frames / Länge
- bekannte Fehler
- funktionierende Startbefehle
- Datum des letzten Tests

### Beispielstruktur

```markdown
# Workflow: LTX-2 HD I2V Audio CFG

## Zweck
Image-to-Video mit Audio-/CFG-Erweiterung.

## Benötigte Modelle
- ...

## Benötigte Custom Nodes
- ComfyUI-KJNodes
- ComfyUI-VideoHelperSuite

## Getestete Einstellungen
- GPU: 0
- Batch Size: 1
- Auflösung: 768x512
```

### Merksatz

Ein funktionierender Workflow ist erst wirklich wertvoll, wenn er reproduzierbar dokumentiert ist.

---

## 5. Wie gehe ich mit mehreren Modellvarianten um?

### Frage

Was mache ich, wenn es mehrere Versionen eines Modells gibt, zum Beispiel fp8, fp16, bf16, distilled, dev, pro oder lite?

### Kurze Antwort

Man sollte Modellvarianten nicht wahllos mischen. Die Variante muss zum Workflow, zum Loader und zum verfügbaren VRAM passen. Größer bedeutet oft bessere Qualität, aber auch mehr Speicherbedarf und längere Laufzeit.

### Inhaltspunkte

- Unterschied zwischen fp4, fp8, fp16 und bf16
- Unterschied zwischen Lite, Pro, Dev, Distilled und SFT
- Warum Dateinamen wichtig sind
- Warum ein Workflow oft exakt eine bestimmte Variante erwartet
- Warum bessere Qualität mehr VRAM braucht
- Wann kleinere Varianten sinnvoll sind
- Wann große Varianten sinnvoll sind

### Vergleich

| Begriff | Bedeutung |
|---|---|
| fp4 | sehr klein, stärker quantisiert |
| fp8 | kleiner, oft guter Kompromiss |
| fp16 | höherer Speicherbedarf, oft bessere Präzision |
| bf16 | ähnlich 16-bit, oft stabil für große Modelle |
| distilled | schneller/kleiner optimiert |
| dev | Entwicklungs-/Basisvariante |
| pro | größere/qualitativ stärkere Variante |
| lite | kleinere Test-/Leichtversion |

### Merksatz

Das beste Modell ist nicht nur das größte, sondern das größte Modell, das stabil in deinem Workflow läuft.

---

## 6. Wie verhindere ich, dass der Server-Speicher vollläuft?

### Frage

Wie vermeide ich Speicherprobleme durch viele große Modelle und Outputs?

### Kurze Antwort

Regelmäßig Speicher prüfen, alte fehlerhafte Downloads entfernen, Outputs sortieren und keine großen Modelle doppelt speichern. Besonders 0-Byte-Dateien und abgebrochene Downloads sollte man kontrollieren.

### Wichtige Befehle

```bash
df -h
du -sh /data/pool/m4z-d1t/comfyui-project
du -sh /data/pool/m4z-d1t/comfyui-project/models/*
du -sh /data/pool/m4z-d1t/comfyui-project/output
find /data/pool/m4z-d1t/comfyui-project/models -type f -size 0
```

### Merksatz

Große Modelle sind teuer im Speicher. Prüfe regelmäßig, was wirklich noch gebraucht wird.

---

## 7. Wie erkenne ich kaputte oder unvollständige Downloads?

### Frage

Wie finde ich heraus, ob ein Modell vollständig heruntergeladen wurde?

### Kurze Antwort

Man prüft die Dateigröße mit `ls -lh` und vergleicht sie mit der erwarteten Größe auf Hugging Face oder im Workflow. 0-Byte-Dateien, ungewöhnlich kleine Dateien oder abgebrochene Downloads sind verdächtig.

### Inhaltspunkte

- Warum `wget -c` wichtig ist
- Was `416 Requested Range Not Satisfiable` bedeutet
- Warum 0-Byte-Dateien gefährlich sind
- Wie man Dateigrößen prüft
- Wie man beschädigte Dateien neu lädt

### Wichtige Befehle

```bash
ls -lh /data/pool/m4z-d1t/comfyui-project/models/text_encoders
find /data/pool/m4z-d1t/comfyui-project/models -type f -size 0
wget -c --show-progress -O zielpfad "LINK"
```

### Merksatz

Nicht jeder rote oder ungewöhnliche Terminaltext ist ein Problem. Entscheidend ist, ob die Datei vollständig und plausibel groß ist.

---

## 8. Wie sollte ich Outputs organisieren?

### Frage

Wie behalte ich bei vielen generierten Bildern und Videos den Überblick?

### Kurze Antwort

Outputs sollten regelmäßig sortiert, umbenannt und dokumentiert werden. Sinnvoll sind Unterordner nach Modell, Workflow, Datum oder Projekt.

### Mögliche Ordnerstruktur

```bash
output/
  ltx/
  wan/
  flux/
  kandinsky/
  hunyuan3d/
  tests/
  final/
```

Oder nach Datum:

```bash
output/
  2026-05-04_kandinsky_i2v/
  2026-05-05_ltx_audio_i2v/
```

### Wichtige Befehle

```bash
mkdir -p /data/pool/m4z-d1t/comfyui-project/output/kandinsky
ls -lh /data/pool/m4z-d1t/comfyui-project/output
mv output/datei.mp4 output/kandinsky/
```

### Merksatz

Ein gutes Ergebnis ohne dokumentierten Workflow ist schwer wiederholbar.

---

## 9. Wie gehe ich vor, wenn ein Workflow aus YouTube nicht funktioniert?

### Frage

Warum funktioniert ein YouTube-Workflow bei mir nicht genauso wie im Video?

### Kurze Antwort

YouTube-Workflows hängen oft von bestimmten Modellversionen, Custom Nodes, ComfyUI-Versionen, Python-/Torch-Versionen und unsichtbaren Einstellungen ab. Man muss die Abhängigkeiten systematisch nachbauen.

### Vorgehen

1. Workflow importieren.
2. Missing Models prüfen.
3. Missing Nodes prüfen.
4. Exakte Dateinamen vergleichen.
5. Logs lesen.
6. Erst klein testen.
7. Parameter dokumentieren.

### Merksatz

Ein Workflow aus einem Video ist kein fertiges Setup, sondern eine Vorlage.

---

## 10. Wie aktualisiere ich Custom Nodes sicher?

### Frage

Sollte ich Custom Nodes regelmäßig aktualisieren?

### Kurze Antwort

Custom Nodes können Updates brauchen, aber Updates können auch funktionierende Workflows kaputtmachen. Deshalb sollte man vor Updates prüfen, ob der Workflow aktuell stabil ist, und Änderungen dokumentieren.

### Wichtige Befehle

```bash
cd /data/pool/m4z-d1t/comfyui-project/custom_nodes/ComfyUI-KJNodes
git status
git pull
sudo docker stop comfyui_data
sudo docker start comfyui_data
```

### Warnung

Nicht alle Custom Nodes sind gleich stabil. Ein Update kann Node-Namen, Parameter oder Verhalten ändern.

### Merksatz

Update nur mit Grund. Dokumentiere vorher, was funktioniert hat.

---

## 11. Wie prüfe ich, welche Custom Nodes installiert sind?

### Frage

Wie sehe ich, welche Custom-Node-Pakete im Projekt vorhanden sind?

### Kurze Antwort

Die installierten Custom Nodes liegen im Ordner `custom_nodes`. Zusätzlich sollte man die ComfyUI-Logs prüfen, weil ein vorhandener Ordner nicht bedeutet, dass der Node auch erfolgreich geladen wurde.

### Wichtige Befehle

```bash
ls -la /data/pool/m4z-d1t/comfyui-project/custom_nodes
sudo docker exec -it comfyui_data ls -la /app/custom_nodes
sudo docker logs --tail 300 comfyui_data | grep -i -E "import failed|traceback|custom nodes"
```

### Merksatz

Installiert heißt nicht automatisch geladen.

---

## 12. Wie gehe ich mit `Permission denied` richtig um?

### Frage

Was soll ich tun, wenn ich in einem Projektordner keine Datei schreiben darf?

### Kurze Antwort

Zuerst prüfen, wem der Ordner gehört. Nicht sofort mit `sudo` alles erzwingen. Wenn ein leerer Ordner root gehört, kann man ihn ersetzen. Wenn er wichtige Dateien enthält, sollte man vorsichtig sein.

### Wichtige Befehle

```bash
ls -ld /data/pool/m4z-d1t/comfyui-project/custom_nodes
ls -la /data/pool/m4z-d1t/comfyui-project/workflows
whoami
```

### Merksatz

`Permission denied` ist ein Hinweis, nicht automatisch eine Einladung zu `sudo rm`.

---

## 13. Wann ist ein Modell im falschen Ordner?

### Frage

Wie erkenne ich, ob eine Modell-Datei falsch einsortiert wurde?

### Kurze Antwort

Wenn ComfyUI ein Modell nicht findet, obwohl es heruntergeladen wurde, liegt es oft im falschen Ordner. Der Loader entscheidet, welche Ordner durchsucht werden.

### Beispiele

- Checkpoint Loader sucht in `models/checkpoints`
- Diffusion Model Loader sucht in `models/diffusion_models`
- LoRA Loader sucht in `models/loras`
- VAE Loader sucht in `models/vae`
- Text Encoder Loader sucht in `models/text_encoders`

### Wichtige Befehle

```bash
find /data/pool/m4z-d1t/comfyui-project/models -name "*modellname*"
mv /alter/pfad/datei.safetensors /data/pool/m4z-d1t/comfyui-project/models/korrekter_ordner/
```

### Merksatz

Der richtige Dateiname hilft nicht, wenn die Datei im falschen Ordner liegt.

---

## 14. Wie prüfe ich, welches Image ein Container nutzt?

### Frage

Wie sehe ich, ob mein ComfyUI-Container wirklich mit dem richtigen Image läuft?

### Kurze Antwort

Mit `docker ps` oder `docker inspect` kann man prüfen, welches Image ein laufender Container verwendet. Das ist wichtig, weil im Projekt das neue Image `comfyui-custom-torch271` verwendet werden soll.

### Wichtige Befehle

```bash
sudo docker ps
sudo docker inspect comfyui_data | grep Image
sudo docker images | grep comfyui
```

### Merksatz

Wenn ein gelöster Fehler zurückkommt, prüfe zuerst, ob du wirklich das richtige Image nutzt.

---

## 15. Wie prüfe ich die PyTorch-Version im Container?

### Frage

Wie sehe ich, welche Torch-Version ComfyUI gerade verwendet?

### Kurze Antwort

Die PyTorch-Version muss im Container geprüft werden, nicht auf dem Host. Dafür nutzt man `docker exec`.

### Befehle

```bash
sudo docker exec -it comfyui_data python3 -c "import torch; print(torch.__version__)"
```

```bash
sudo docker exec -it comfyui_data python3 -c "import torch, torchvision, torchaudio; print(torch.__version__); print(torchvision.__version__); print(torchaudio.__version__)"
```

### Merksatz

Die relevante Python-/Torch-Version ist die im Container.

---

## 16. Wie sichere ich einen funktionierenden Container-Stand?

### Frage

Wie speichere ich einen funktionierenden Zustand, bevor ich riskante Änderungen mache?

### Kurze Antwort

Mit `docker commit` kann man den aktuellen Container als neues Image speichern. Das ist sinnvoll vor größeren Änderungen wie PyTorch-Upgrades oder komplizierten Node-Installationen.

### Wichtige Befehle

```bash
sudo docker commit comfyui_data comfyui-backup-vor-aenderung
sudo docker images | grep comfyui
```

### Sinnvolle Namensgebung

```text
comfyui-backup-before-torch-upgrade
comfyui-custom-torch271
comfyui-backup-before-kandinsky
```

### Merksatz

Vor riskanten Änderungen erst einen Rettungspunkt schaffen.

---

## 17. Wie gehe ich mit gated Hugging-Face-Modellen um?

### Frage

Was mache ich, wenn ein Modell bei Hugging Face nicht frei downloadbar ist?

### Kurze Antwort

Bei gated Modellen muss man meist auf Hugging Face eingeloggt sein, eine Lizenz akzeptieren und einen Token verwenden. Tokens dürfen nicht öffentlich geteilt oder in Dokumentation fest eingetragen werden.

### Beispielbefehl

```bash
wget --header="Authorization: Bearer HF_TOKEN_HIER"   -c --show-progress   -O /ziel/datei.safetensors   "DIREKTER_LINK"
```

### Merksatz

Ein HF-Token ist wie ein Schlüssel. Niemals öffentlich dokumentieren.

---

## 18. Wie erkenne ich, ob ComfyUI einen Node nur falsch cached?

### Frage

Warum zeigt ComfyUI manchmal Missing Nodes an, obwohl ich sie installiert habe?

### Kurze Antwort

ComfyUI oder der Browser können alte Zustände anzeigen. Wichtig sind die Container-Logs. Wenn der Node dort ohne Importfehler geladen wird, ist die rote Anzeige eventuell veraltet oder workflowbezogen.

### Vorgehen

1. Browser hart neu laden.
2. Container neu starten.
3. Logs prüfen.
4. Workflow neu öffnen.
5. Missing-Node-Liste erneut prüfen.

### Wichtige Befehle

```bash
sudo docker stop comfyui_data
sudo docker start comfyui_data
sudo docker logs --tail 300 comfyui_data | grep -i -E "import failed|traceback|error"
```

### Merksatz

Die UI ist ein Hinweis. Die Logs sind die Wahrheit.

---

## 19. Wie erkenne ich, ob ein Fehler vom Workflow oder vom System kommt?

### Frage

Woher weiß ich, ob ein Problem durch den Workflow, das Modell, den Container oder ComfyUI entsteht?

### Kurze Antwort

Man schaut auf die Fehlerstelle. Fehler in Loadern deuten oft auf Modell-/Pfadprobleme hin. Fehler in Custom Nodes deuten auf Node-Abhängigkeiten hin. Fehler in Torch/CUDA deuten auf Container-/GPU-/Versionsthemen hin.

### Orientierung

| Fehlerstelle | Wahrscheinliche Ursache |
|---|---|
| Loader Node | falsches Modell, falscher Ordner, falscher Dateiname |
| Custom Node Import | fehlende Dependencies |
| torch.OutOfMemoryError | VRAM zu knapp |
| size mismatch | falsches Modell für erwartete Architektur |
| ModuleNotFoundError | Python-Paket fehlt |
| CUDA / Torch Fehler | Version oder GPU-Setup |

### Merksatz

Der Dateipfad im Fehlertext verrät meistens, in welchem Bereich das Problem liegt.

---

## 20. Wie gehe ich mit `size mismatch` bei Modellen um?

### Frage

Was bedeutet ein `size mismatch` beim Laden eines Modells?

### Kurze Antwort

Ein `size mismatch` bedeutet, dass die Datei nicht zur erwarteten Modellarchitektur passt. Das ist kein Namensproblem, sondern ein inhaltlich falsches Modell.

### Beispiel

```text
checkpoint shape: [262208, 3840]
expected shape: [152064, 3584]
```

### Lösung

- Nicht umbenennen.
- Nicht mehrfach neu starten.
- Passendes Modell suchen.
- Workflow-Dokumentation prüfen.
- Loader-Auswahl prüfen.

### Merksatz

Bei `size mismatch` ist fast immer das falsche Modell ausgewählt.

---

## 21. Wie dokumentiere ich Modellquellen sauber?

### Frage

Wie sollte ich notieren, woher ein Modell stammt?

### Kurze Antwort

Zu jedem Modell sollten Quelle, Dateiname, Zielordner, Download-Link und Einsatzzweck dokumentiert werden.

### Empfohlene Tabelle

| Feld | Beispiel |
|---|---|
| Modellgruppe | Kandinsky 5 Pro |
| Datei | kandinsky5pro_i2v_sft_5s.safetensors |
| Quelle | Hugging Face |
| Zielordner | models/diffusion_models/kandinsky |
| Zweck | Image-to-Video |
| getestet | ja/nein |
| Workflow | video_kandinsky5_i2v |

### Merksatz

Ein Modell ohne Quelle ist später schwer zu aktualisieren oder zu ersetzen.

---

## 22. Wie plane ich neue Modelltests systematisch?

### Frage

Wie teste ich ein neues Modell, ohne das bestehende Setup durcheinanderzubringen?

### Kurze Antwort

Neue Modelle sollten in einem eigenen Ordner, mit eigenem Testworkflow und dokumentierten Parametern getestet werden. Erst wenn sie stabil laufen, sollten sie in die Hauptdokumentation aufgenommen werden.

### Ablauf

1. Modellgruppe anlegen.
2. Modelle in passenden Ordner laden.
3. Custom Nodes prüfen.
4. Beispielworkflow importieren.
5. Erst kleiner Test.
6. Fehler dokumentieren.
7. Erfolgreiche Parameter notieren.
8. Erst dann finalen Workflow speichern.

### Merksatz

Neue Modelle erst isoliert testen, dann in den normalen Workflow übernehmen.

---

## 23. Wie gehe ich mit alten oder doppelten Modellen um?

### Frage

Wann sollte ich alte Modellvarianten löschen?

### Kurze Antwort

Nur löschen, wenn klar ist, dass die Datei nicht mehr gebraucht wird und kein Workflow sie erwartet. Vorher prüfen, ob Workflows oder Notizen auf diese Datei verweisen.

### Sicherer Ansatz

```bash
mkdir -p /data/pool/m4z-d1t/comfyui-project/models/_archive
mv /data/pool/m4z-d1t/comfyui-project/models/alter_ordner/datei.safetensors /data/pool/m4z-d1t/comfyui-project/models/_archive/
```

### Merksatz

Archivieren ist sicherer als sofort löschen.

---

## 24. Wie sollte eine Team-Anleitung für den DGX-Server aussehen?

### Frage

Was muss eine Anleitung enthalten, damit auch andere Personen das Setup nutzen können?

### Kurze Antwort

Eine gute Team-Anleitung braucht klare Startbefehle, Projektpfade, Regeln zur GPU-Nutzung, Warnungen vor fremden Containern und einfache Troubleshooting-Schritte.

### Inhalte

- Serverzugang
- Projektordner
- Standardcontainer
- Standardimage
- Browser-URL
- GPU-Prüfung
- Start/Stop
- Logs
- Modellordner
- Verhalten auf gemeinsamem Server
- Wer bei Problemen gefragt werden soll

### Merksatz

Eine Team-Anleitung muss nicht alles erklären, aber sie muss verhindern, dass jemand etwas kaputtmacht.

---

## 25. Wie baue ich aus Fehlermeldungen neue Dokumentation?

### Frage

Wie kann ich aus einem gelösten Fehler einen neuen Guide machen?

### Kurze Antwort

Jeder gelöste Fehler sollte als kurzer Troubleshooting-Artikel dokumentiert werden: Fehlermeldung, Ursache, Lösung, Befehle und Merksatz.

### Vorlage

```markdown
# Fehler: ...

## Fehlermeldung

```text
...
```

## Ursache

...

## Lösung

```bash
...
```

## Prüfung

```bash
...
```

## Merksatz

...
```

### Merksatz

Jeder gelöste Fehler ist ein zukünftiger Guide.

---

# Zusätzliche Seitenideen für die Website

## Übersicht: Server-Regeln

Eine kurze Seite mit Regeln für den DGX-Server:

- keine fremden Container stoppen
- GPU-Auslastung prüfen
- große Downloads dokumentieren
- Tokens nicht teilen
- funktionierende Workflows dokumentieren
- keine riskanten Updates ohne Backup

---

## Übersicht: Modell-Testprotokoll

Eine Vorlage, in der jedes getestete Modell dokumentiert wird:

```markdown
# Modell-Test: NAME

## Quelle
## Dateien
## Zielordner
## Benötigte Nodes
## Workflow
## Testparameter
## Ergebnis
## Fehler
## Status
```

---

## Übersicht: Workflow-Testprotokoll

Eine Vorlage für neue Workflows:

```markdown
# Workflow-Test: NAME

## Zweck
## Quelle
## Benötigte Modelle
## Benötigte Nodes
## GPU
## Parameter
## Fehler
## Lösung
## Ergebnis
```

---

## Übersicht: Persönliches Befehls-Cheat-Sheet

Eine kompakte Seite mit nur den häufigsten Befehlen:

```bash
ssh m4z-d1t@hal9000.skim.th-owl.de
cd /data/pool/m4z-d1t/comfyui-project
sudo docker start comfyui_data
sudo docker stop comfyui_data
sudo docker logs --tail 100 comfyui_data
nvidia-smi
watch -n 1 nvidia-smi
```

---

# Priorisierung für Claude Code

Wenn Claude Code diese Datei verarbeitet, soll es zuerst diese Seiten erstellen:

1. Sicheres Arbeiten auf dem DGX-Server
2. GPU-Prozesse und Besitzer erkennen
3. Container neu starten vs. neu erstellen
4. Workflow sauber dokumentieren
5. Modellvarianten verstehen
6. Speicherplatz verwalten
7. Unvollständige Downloads erkennen
8. YouTube-Workflows richtig nachbauen
9. Custom Nodes sicher aktualisieren
10. Size-Mismatch-Fehler verstehen

Danach können die weiteren Seiten ergänzt werden.
