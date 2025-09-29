# HardwareTech Catálogo Frontend

## Setup Local

### 1. Clone e instale dependências:
```bash
npm install
```

### 2. Configure variáveis de ambiente:
```bash
# Copie o template
cp .env.example .env
cp .env.example .env.production

# Edite os valores conforme necessário
nano .env
nano .env.production
```

## Configuração das Variáveis

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_API_URL_BASE` | URL base da API | `http://localhost:4000/api` |
| `VITE_APP_NAME` | Nome da aplicação | `App Name` |
| `VITE_DEBUG` | Modo debug | `true` / `false` |


### 3. Execute o projeto:
```bash
# Desenvolvimento
npm run dev

# Docker desenvolvimento
docker-compose up --build

# Docker produção
docker-compose -f docker-compose.prod.yml up --build
```

