# cinny.moe

## dev

```sh
git clone https://github.com/fielstamper/caitlyn.moe.git
cd caitlyn.moe
cp .env.example .env
npm install
npm run dev
```

## selfhost

use [`docker-compose.yaml`](/docker-compose.yaml) and [`.env.example`](/.env.example)

for every new commit rebuild:

```sh
cd /opt/stacks/website
docker compose build --no-cache
docker compose up -d
```
