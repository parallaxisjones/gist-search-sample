# Stage 1 - the build process
FROM node:14 as compile-server
WORKDIR /usr/src/app
COPY . .
RUN yarn && yarn build

CMD [ "yarn", "start" ]