---
title: "Docker: container name already in use"
problem: "Beim Ausfuhren von docker run erscheint die Fehlermeldung, dass der Container-Name bereits vergeben ist."
category: "docker"
symptoms:
  - "Fehlermeldung: 'Conflict. The container name \"/comfyui_data\" is already in use'"
  - "docker run schlagt fehl, obwohl docker ps keinen laufenden Container zeigt"
cause: "Ein gestoppter Container mit demselben Namen existiert noch. docker ps zeigt nur laufende Container, docker ps -a zeigt alle."
solution: "1. Prufen: `docker ps -a | grep comfyui_data`\n2. Wenn der alte Container nicht mehr gebraucht wird: `docker rm comfyui_data`\n3. Dann neu: `docker run --name comfyui_data ...`\n\nOder einen anderen Namen vergeben: `docker run --name comfyui_data_v2 ...`"
difficulty: "anfanger"
errorMessages:
  - "container name already in use"
  - "Conflict. The container name"
tags: ["docker", "container", "name", "run"]
publishedAt: 2025-02-12
draft: false
---
