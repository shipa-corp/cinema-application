FROM node:14.15.3-alpine3.12

ENV HOME=/home

COPY package.json $HOME/app/

COPY src/ $HOME/app/src
COPY public/ $HOME/app/public

WORKDIR $HOME/app

RUN npm cache clean --force && \
    npm install --silent --progress=false

EXPOSE 3000

CMD ["npm", "start"]