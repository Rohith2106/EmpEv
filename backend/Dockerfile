FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV DB_URL=mysql://root:RcUxnwVpwUTMdamTzYFmMHBjNEsqBjJK@junction.proxy.rlwy.net:22079/railway

EXPOSE 5000
CMD ["node", "app.js"]
