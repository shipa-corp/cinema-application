FROM node:14.15.3-alpine3.12

ENV HOME=/home

COPY package.json npm-shrinkwrap.json $HOME/app/

COPY src/ $HOME/app/src

WORKDIR $HOME/app

RUN npm cache clean --force && \
    npm install --silent --progress=false --production

EXPOSE 3000

CMD ["npm", "start"]