FROM node:18

WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN chmod 777 /app
RUN npm run build
RUN npm install -g npm@10.2.0
USER node
CMD [ "npm", "run", "start:prod" ]
