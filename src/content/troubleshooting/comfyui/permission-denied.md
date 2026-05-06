---
title: "Permission denied bei Custom Nodes oder Workflows"
problem: "Dateien in custom_nodes/ oder workflows/ konnen nicht gelesen oder geschrieben werden. Fehler: Permission denied."
category: "comfyui"
symptoms:
  - "Fehlermeldung: 'Permission denied' beim Zugriff auf custom_nodes/"
  - "Workflows konnen nicht gespeichert werden"
  - "Custom Nodes werden trotz Installation nicht geladen"
  - "ls -la zeigt root als Besitzer"
cause: "Dateien wurden mit root-Rechten erstellt (z.B. durch docker cp oder git clone ohne angepassten Benutzer). Der Docker-Container lauft mit einer anderen UID und hat keine Schreibrechte."
solution: "1. Besitzer prufen: `ls -la /data/pool/m4z-d1t/comfyui-project/custom_nodes/`\n2. Besitzer andern: `sudo chown -R m4z-d1t:m4z-d1t /data/pool/m4z-d1t/comfyui-project/custom_nodes/`\n3. Berechtigungen korrigieren: `chmod -R 755 /data/pool/m4z-d1t/comfyui-project/custom_nodes/`\n4. Container neu starten: `docker restart comfyui_data`\n\nGleiches Vorgehen fur den workflows/-Ordner."
difficulty: "anfanger"
errorMessages:
  - "Permission denied"
  - "EACCES: permission denied"
tags: ["permission", "rechte", "root", "custom_nodes", "workflows", "chown"]
publishedAt: 2025-02-15
draft: false
---
