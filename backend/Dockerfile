FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install --silent
RUN npm run build
COPY .env /app/dist
COPY /tmp /app/dist

CMD ["node", "dist/server.js"]
