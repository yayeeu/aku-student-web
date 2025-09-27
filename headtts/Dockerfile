# Use Debian-based Node (better compat for onnxruntime-node than Alpine)
FROM node:20-bookworm-slim

# Install minimal deps (git for cloning; libgomp1 often required by onnxruntime)
RUN apt-get update && apt-get install -y --no-install-recommends \
    git ca-certificates libgomp1 && \
    rm -rf /var/lib/apt/lists/*

# App dir
WORKDIR /app

# Clone a fixed tag for reproducibility (override with --build-arg GIT_REF=vX.Y.Z)
ARG GIT_REF=v1.1.1
RUN git clone --depth=1 --branch ${GIT_REF} https://github.com/met4citizen/HeadTTS ./

# Install deps (production)
ENV NODE_ENV=production
RUN npm ci --omit=dev

# Copy our config (you can also mount it with a volume instead)
# If you prefer mounting, comment the next line and use a bind volume in compose.
COPY headtts-config.json /app/headtts-node.json

# Expose REST/WS port
EXPOSE 8882

# Default command: start server with our config
CMD ["node", "./modules/headtts-node.mjs", "--config", "/app/headtts-node.json"]
