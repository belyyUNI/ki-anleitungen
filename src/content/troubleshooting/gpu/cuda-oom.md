---
title: "CUDA Error: out of memory"
problem: "Der GPU-Speicher ist voll. Der Workflow bricht mit einer OutOfMemoryError-Meldung ab."
category: "gpu"
symptoms:
  - "Fehlermeldung enthalt 'torch.OutOfMemoryError' oder 'CUDA out of memory'"
  - "Workflow bricht bei groaen Bildern oder Batches ab"
  - "Kleinere Auflosungen funktionieren, groaere nicht"
cause: "Der Workflow benotigt mehr VRAM, als auf der gewahlten GPU frei ist. Das passiert besonders bei SDXL, Flux oder Video-Workflows mit vielen Frames."
solution: "1. **Auflosung reduzieren**: Statt 1024x1024 auf 768x768 oder 512x512 runter.\n2. **Batch-Size auf 1 setzen**: Im ComfyUI-Workflow `batch_size` auf 1.\n3. **Weniger Frames** bei Video-Workflows.\n4. **Andere GPU wahlen**: Mit `nvidia-smi` die GPU mit dem meisten freien VRAM finden.\n5. **Weniger LoRAs gleichzeitig laden**: Jeder LoRA braucht zusatzlichen Speicher.\n6. **Container mit anderer GPU neu starten**: `docker rm` + `docker run --gpus '\"device=1\"'`"
difficulty: "fortgeschritten"
errorMessages:
  - "torch.OutOfMemoryError"
  - "CUDA out of memory"
  - "Failed to allocate"
tags: ["cuda", "oom", "vram", "gpu", "speicher"]
publishedAt: 2025-02-10
draft: false
---
