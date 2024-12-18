FROM node:22 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV VITE_BASE_URL=http://backend:5000/api/employees

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
