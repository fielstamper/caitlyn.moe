FROM node:alpine AS runner
WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=8000
EXPOSE 8000
ENTRYPOINT ["node", "./dist/server/entry.mjs"]
