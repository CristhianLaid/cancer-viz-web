# Etapa 1: Construcción de la aplicación
FROM node:18 AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar solo las dependencias de producción
RUN npm install --only=production

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación (Next.js)
RUN npm run build

# Etapa 2: Imagen final para producción
FROM node:18-slim

# Establecer directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=build /app ./

# Instalar solo las dependencias necesarias para producción
RUN npm install --only=production

# Exponer el puerto para la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD [ "npm", "run", "start" ]
