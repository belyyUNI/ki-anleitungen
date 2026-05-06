---
title: "Was lauft lokal und was lauft auf dem Server?"
description: "Verstehen, was auf deinem Mac oder Windows-PC passiert und was auf dem DGX-Server – und wie beides zusammenspielt."
difficulty: "anfanger"
topic: "allgemein"
tags: ["server", "lokal", "architektur", "einsteiger", "ssh"]
publishedAt: 2025-01-12
featured: false
readingTimeMinutes: 6
---

## Frage

Was passiert auf meinem Mac oder Windows-PC, und was passiert auf dem DGX-Server?

## Kurze Antwort

Der lokale Rechner dient hauptsachlich als Zugang. Dort offnet man Terminal, PowerShell oder den Browser. Die eigentliche Arbeit passiert auf dem DGX-Server: Docker lauft dort, ComfyUI lauft dort, Modelle liegen dort, und die GPUs werden dort genutzt.

## Erklarung

Ein haufiges Missverstandnis bei der Arbeit mit entfernten Servern: Man sieht den Browser und das Terminal auf dem eigenen Rechner und denkt, die Arbeit passiere lokal. In Wirklichkeit ist der lokale Rechner nur das **Fenster** zum Server.

### Was lauft lokal?

- **Terminal / PowerShell**: Zeigt eine SSH-Sitzung auf dem Server an. Alle Befehle, die du eintippst, werden auf dem Server ausgefuhrt.
- **Browser**: Zeigt die ComfyUI-Oberflache an, die vom Server ausgeliefert wird. Die Generierung der Bilder passiert trotzdem auf dem Server.
- **Dateien**: Wenn du eine Datei herunterladst und spater im Browser hochladst, ist sie kurz lokal, bevor sie zum Server geht.

### Was lauft auf dem Server?

- **Docker**: Der Container `comfyui_data` lauft auf dem Server, nicht auf deinem Rechner.
- **ComfyUI**: Die Software selbst, inklusive Python, PyTorch und allen Nodes.
- **GPU**: Die NVIDIA-GPUs stecken physisch im DGX-Server. `nvidia-smi` zeigt die Server-GPUs.
- **Modelle**: Alle Checkpoints, LoRAs, VAEs liegen in `/data/pool/m4z-d1t/comfyui-project/models/` auf dem Server.
- **Outputs**: Generierte Bilder und Videos landen in `/data/pool/m4z-d1t/comfyui-project/output/` auf dem Server.

## Schritt-fur-Schritt: Wo bin ich gerade?

1. **Terminal prufen**: Tippe `whoami` und `pwd`. Wenn du `m4z-d1t` und einen Pfad auf dem Server siehst, bist du auf dem Server.
2. **Browser prufen**: Die URL `http://hal9000.skim.th-owl.de:8188` zeigt, dass der Browser mit dem Server verbunden ist.
3. **GPU prufen**: `nvidia-smi` zeigt die Server-GPUs. Dein lokaler Rechner hat keine dieser Karten.
4. **Docker prufen**: `sudo docker ps` zeigt Container auf dem Server. Lokales `docker ps` wurde etwas anderes zeigen.

## Typische Fehler

- **Fehler**: "Ich habe die Datei doch heruntergeladen, warum ist sie nicht da?"
  - **Ursache**: Die Datei wurde lokal heruntergeladen, aber der Server braucht sie.
  - **Losung**: Entweder auf dem Server mit `wget` herunterladen oder mit `scp` vom lokalen Rechner auf den Server kopieren.

- **Fehler**: "Mein `nvidia-smi` zeigt nichts an."
  - **Ursache**: Du bist nicht auf dem Server, sondern im lokalen Terminal.
  - **Losung**: Erst per SSH verbinden: `ssh m4z-d1t@hal9000.skim.th-owl.de`

## Merksatz

Dein Rechner ist das Cockpit, aber der Server ist der Motor. Alles, was Rechenleistung braucht, passiert auf dem Server.
