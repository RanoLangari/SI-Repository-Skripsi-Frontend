# # Tahap build
# FROM node:20 as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Tahap produksi
# FROM nginx:stable-alpine as production
# COPY --from=build /app/build /usr/share/nginx/html
# # Konfigurasi nginx untuk mendukung react-router-dom
# COPY --from=build /app/public/undana.png /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]
