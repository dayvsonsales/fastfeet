FROM node:13.12.0-alpine as build
WORKDIR /app
COPY . /app
RUN npm install --silent
RUN npm run build

FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]