FROM node:18.16.1

WORKDIR /user/src/app

COPY . .

RUN yarn --frozen-lockfile && yarn run db:seed && chmod +rw db

CMD ["yarn", "run", "start"]