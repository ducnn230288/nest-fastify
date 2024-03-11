FROM bitnami/node:18 as build-frontend
WORKDIR /app
COPY --chown=root:root ../frontend .
RUN npm install -f && \
npm run build:prod

FROM bitnami/node:18 as build-backend

WORKDIR /app
COPY --chown=root:root ../config ./config
COPY --chown=root:root ../database ./database
COPY --chown=root:root ../other ./other
COPY --chown=root:root ../src ./src
COPY --chown=root:root ../.eslintrc.js ./
COPY --chown=root:root ../.prettierrc ./
COPY --chown=root:root ../nest-cli.json ./
COPY --chown=root:root ../package.json ./
COPY --chown=root:root ../tailwind.config.cjs ./
COPY --chown=root:root ../tsconfig.build.json ./
COPY --chown=root:root ../tsconfig.json ./
COPY --from=build-frontend /app/build/index.html ./other/views/administrator.hbs
COPY --from=build-frontend /app/build/. ./other/public/.

COPY --chown=root:root ../test ./test
COPY --chown=root:root ../frontend/test ./robot
ARG ENV=
COPY --chown=root:root ../.env$ENV ./.env
ENV NODE_OPTIONS=--max_old_space_size=4048
RUN npm install --force && \
npm run build && \
npm cache clean --force

ARG PROD=false
RUN  if [ "$PROD" = "false" ] ; then install_packages python3; fi
RUN  if [ "$PROD" = "false" ] ; then ln -sf python3 /usr/bin/python && \
pip3 install --no-cache -r robot/requirements.txt && \
npx playwright install-deps; fi
RUN  if [ "$PROD" = "false" ] ; then rfbrowser init; fi

USER root

