---
title: "Was mache ich bei Permission denied in custom_nodes?"
description: "Warum git clone in custom_nodes fehlschlagt – und wie du die Rechte sicher korrigierst."
difficulty: "fortgeschritten"
topic: "comfyui"
tags: ["custom-nodes", "permission", "git", "rechte", "comfyui"]
publishedAt: 2025-04-05
featured: false
readingTimeMinutes: 5
---

## Frage

Wie behebe ich Permission-denied-Fehler beim Klonen in custom_nodes?

## Kurze Antwort

Der Ordner gehort eventuell `root`. Prufen mit:

```bash
ls -ld /data/pool/m4z-d1t/comfyui-project/custom_nodes
```

Wenn der Ordner **leer** ist, kannst du ihn gefahrlos neu anlegen:

```bash
cd /data/pool/m4z-d1t/comfyui-project
rmdir custom_nodes
mkdir custom_nodes
```

Dann erneut klonen.

## Erklarung

Das Problem hat dieselbe Ursache wie beim `workflows/`-Ordner: Wenn ComfyUI den `custom_nodes/`-Ordner im Container erstellt, gehort er haufig `root`. Da du per SSH als `m4z-d1t` arbeitest, hast du keine Schreibrechte.

### Wann ist Neuanlegen sicher?

- Der Ordner ist **leer** (prufen mit `ls -la custom_nodes/`)
- Es sind **keine Custom Nodes** installiert

Wenn bereits Custom Nodes im Ordner sind, **nicht loschen** – du wurdest Installationen verlieren. In diesem Fall besser:

```bash
sudo chown m4z-d1t /data/pool/m4z-d1t/comfyui-project/custom_nodes
```

## Schritt-fur-Schritt: Rechte reparieren

1. Prufen, ob der Ordner leer ist:
   ```bash
   ls -la /data/pool/m4z-d1t/comfyui-project/custom_nodes/
   ```
   Wenn die Ausgabe nur `.` und `..` zeigt, ist der Ordner leer.

2. Prufen, wem der Ordner gehort:
   ```bash
   ls -ld /data/pool/m4z-d1t/comfyui-project/custom_nodes
   ```
   Ausgabe z. B.: `drwxr-xr-x 2 root root ...`

3. Falls leer: Neu anlegen als dein Benutzer:
   ```bash
   rmdir /data/pool/m4z-d1t/comfyui-project/custom_nodes
   mkdir /data/pool/m4z-d1t/comfyui-project/custom_nodes
   ```

4. Falls nicht leer: Besitzer andern:
   ```bash
   sudo chown -R m4z-d1t /data/pool/m4z-d1t/comfyui-project/custom_nodes
   ```

5. Jetzt kannst du clonen:
   ```bash
   cd /data/pool/m4z-d1t/comfyui-project/custom_nodes
   git clone REPO_URL
   ```

## Wichtige Befehle

```bash
# Rechte prufen
ls -ld custom_nodes

# Leeren Ordner neu anlegen
rmdir custom_nodes && mkdir custom_nodes

# Rechte rekursiv andern (mit Vorsicht)
sudo chown -R m4z-d1t custom_nodes
```

## Merksatz

Nur einen **leeren** `custom_nodes`-Ordner mit `rmdir` loschen. Sind schon Nodes drin, nimm `sudo chown` oder frage einen Admin.
