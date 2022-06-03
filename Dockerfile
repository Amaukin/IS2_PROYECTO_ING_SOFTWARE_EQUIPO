FROM node:16

# Directorio de trabajo de la app
WORKDIR /usr/src/app

# Instalar dependencias del package.json
COPY package*.json ./
RUN npm install

# Fuente de la app
COPY . .

# Puerto de la app
EXPOSE 8080

# Correr app
CMD [ "npm", "start" ]