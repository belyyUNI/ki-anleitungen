---
title: "Wie aktualisiere ich Custom Nodes sicher?"
description: "Wann du Custom Nodes updaten solltest, wie du es machst und warum ein Update funktionierende Workflows kaputtmachen kann."
difficulty: "fortgeschritten"
topic: "comfyui"
tags: ["custom-nodes", "update", "git", "comfyui", "sicherheit", "backup"]
publishedAt: 2026-05-06
featured: false
readingTimeMinutes: 7
---

## Frage

Sollte ich Custom Nodes regelmassig aktualisieren?

## Kurze Antwort

Custom Nodes konnen Updates brauchen, aber Updates konnen auch funktionierende Workflows kaputtmachen. Deshalb sollte man vor Updates prufen, ob der Workflow aktuell stabil ist, und Anderungen dokumentieren.

## Erklarung

Custom Nodes sind Community-Projekte. Sie entwickeln sich standig weiter – neue Funktionen kommen hinzu, Bugs werden gefixt, aber manchmal andern sich auch Node-Namen, Parameter oder Verhalten. Ein Update kann einen gestern noch perfekt laufenden Workflow heute unbrauchbar machen.

### Wann ist ein Update sinnvoll?

| Situation | Update empfohlen? |
|-----------|-------------------|
| Workflow lauft stabil, keine Probleme | Nein |
| Ein neuer Workflow braucht eine neuere Node-Version | Ja, aber vorher Backup |
| Ein bekannter Bug wurde behoben | Ja |
| Der Node verursacht Fehler in den Logs | Ja |
| ComfyUI meldet Inkompatibilitat | Ja |
| "Einfach so, weil es ein Update gibt" | Nein |

### Die goldene Regel

Vor jedem Custom-Node-Update: **Notiere, was gerade funktioniert.** Wenn nach dem Update etwas kaputtgeht, weisst du, woran es liegt.

## Schritt-fur-Schritt: Sicheres Update

1. **Aktuellen Stand dokumentieren:**
   ```bash
   cd /data/pool/m4z-d1t/comfyui-project/custom_nodes/ComfyUI-KJNodes
   git log --oneline -1
   ```

2. **Stand vor dem Update prufen:**
   ```bash
   git status
   ```

3. **Container-Backup erstellen (optional, aber empfohlen):**
   ```bash
   sudo docker commit comfyui_data comfyui-backup-vor-node-update
   ```

4. **Update durchfuhren:**
   ```bash
   git pull
   ```

5. **Abhangigkeiten aktualisieren:**
   ```bash
   sudo docker exec -it comfyui_data pip install -r /app/custom_nodes/ComfyUI-KJNodes/requirements.txt
   ```

6. **Container neu starten:**
   ```bash
   sudo docker stop comfyui_data
   sudo docker start comfyui_data
   ```

7. **Logs prufen:**
   ```bash
   sudo docker logs --tail 100 comfyui_data | grep -i -E "import failed|error|traceback"
   ```

8. **Workflow testen.** Erst einen einfachen Workflow mit den aktualisierten Nodes laufen lassen.

## Wichtige Befehle

```bash
# In das Custom-Node-Verzeichnis wechseln
cd /data/pool/m4z-d1t/comfyui-project/custom_nodes/NodeName

# Aktuellen Git-Status prufen
git status
git log --oneline -5

# Update durchfuhren
git pull

# Auf bestimmten Commit zurucksetzen (falls noetig)
git log --oneline
git reset --hard COMMIT_HASH

# Container nach Update neu starten
sudo docker stop comfyui_data
sudo docker start comfyui_data

# Logs nach Import-Fehlern durchsuchen
sudo docker logs --tail 300 comfyui_data | grep -i -E "import failed"
```

## Typische Fehler

- **Fehler**: Mehrere Custom Nodes gleichzeitig aktualisieren.
  - **Folge**: Wenn etwas kaputtgeht, weiss man nicht, welches Update schuld war.
  - **Losung**: Immer nur ein Node-Paket auf einmal aktualisieren und testen.

- **Fehler**: `git pull` schlagt fehl wegen lokaler Anderungen.
  - **Ursache**: Es wurden manuell Dateien im Node-Ordner verandert.
  - **Losung**: `git status` prufen, Anderungen verwerfen oder stashen: `git stash`.

- **Fehler**: Kein Backup vor einem grosseren Update.
  - **Folge**: Wenn der Workflow nicht mehr lauft, gibt es keinen einfachen Weg zuruck.
  - **Losung**: Vor grosseren Updates `docker commit` ausfuhren.

## Merksatz

Update nur mit Grund. Dokumentiere vorher, was funktioniert hat.
