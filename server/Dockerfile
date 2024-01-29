FROM node:20.11.0-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
# RUN npm install -g nodemon

ADD index.js ./
EXPOSE 5500
CMD ["node", "index.js", "2>&1"]
