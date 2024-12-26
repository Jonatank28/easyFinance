# Fase de construção (builder)
FROM node:20-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos essenciais para cache eficiente
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install --frozen-lockfile

# Copiar o restante do código
COPY . .

# ------------------------- #
# Fase de execução (runner)
FROM node:20-alpine AS runner

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos necessários da fase de build
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

# Definir variável de ambiente
ENV NODE_ENV production

# Expor porta do contêiner
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"]
