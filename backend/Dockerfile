FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

CMD ["npm", "run", "start"]
