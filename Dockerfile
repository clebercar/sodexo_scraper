FROM alpine:edge

RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  freetype-dev \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  nodejs \
  yarn

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
  && mkdir -p /home/pptruser/Downloads /app \
  && chown -R pptruser:pptruser /home/pptruser \
  && chown -R pptruser:pptruser /app

ENV HOME=/home

COPY package.json yarn.lock $HOME/app/

WORKDIR $HOME/app/

RUN yarn && yarn cache clean

COPY . $HOME/app/

EXPOSE 3333 9229

CMD yarn dev:server
