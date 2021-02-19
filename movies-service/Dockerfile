FROM node:7.5.0-alpine

ENV HOME=/home

COPY package.json npm-shrinkwrap.json $HOME/app/

COPY src/ $HOME/app/src

WORKDIR $HOME/app

RUN npm cache clean && \
    npm install --silent --progress=false --production

EXPOSE 3000

CMD ["npm", "start"]
