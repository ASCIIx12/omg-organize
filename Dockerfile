FROM node

WORKDIR app/

COPY package*.json /app/

RUN yarn install

COPY . /app/

RUN yarn build

EXPOSE 3030
ENV NITRO_PRESET=node-server
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
CMD ["node", ".output/server/index.mjs"]