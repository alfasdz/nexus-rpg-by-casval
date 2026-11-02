FROM node:22-alpine

WORKDIR /app

# Copy all files
COPY . .

# Environment
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.js"]
