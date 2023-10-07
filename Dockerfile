FROM node:18

WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN chmod 777 /app
RUN npm install -g npm@10.2.0
ARG PROD=false
RUN  if [ "$PROD" = "true" ] ; then npm run build; fi
USER node
