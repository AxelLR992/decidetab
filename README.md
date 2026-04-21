### DecideTab Fase 1

Aplicación web de orientación vocacional para estudiantes de bachillerato en Tabasco, México.

### Qué incluye esta fase
- Flujo completo: **Landing/Perfil → Socioeconómico → Test Hereford (90 ítems en 9 páginas) → Resultados**.
- Cálculo de puntajes brutos por área Hereford y conversión a percentiles por sexo.
- Selección automática de 3 intereses dominantes.
- Recomendación de carreras filtradas por presupuesto mensual con advertencias visuales de costo.
- Sesión volátil en frontend (en memoria; se pierde al cerrar pestaña).

### Tecnologías
- **Backend:** Node.js, Express, TypeScript, PostgreSQL (pg)
- **Frontend:** React, Vite, TypeScript, TailwindCSS, React Router
- **Base de datos:** PostgreSQL 16
- **Contenedores:** Docker + Docker Compose

### Requisitos
- Docker
- Docker Compose (plugin `docker compose`)

### Instalación y ejecución
1. Ir a la carpeta del proyecto:
   ```bash
   cd /home/ubuntu/decidetab
   ```
2. Crear archivo `.env` a partir del ejemplo:
   ```bash
   cp .env.example .env
   ```
3. Levantar servicios:
   ```bash
   docker compose up --build
   ```
4. Acceder a la app:
   - Frontend: `http://localhost:8080`
   - Backend health: `http://localhost:4000/health`

> `seed.sql` se ejecuta automáticamente en el primer arranque de PostgreSQL.

### Modo Desarrollo (sin Docker para app)
Esta modalidad levanta **backend y frontend en local** con recarga en caliente. Puedes usar PostgreSQL instalado en tu máquina o correr **solo la base de datos en Docker**.

#### 1) Configurar PostgreSQL local (o Docker solo para DB)

##### Opción A: PostgreSQL instalado localmente
1. Crear base de datos y usuario (ajusta credenciales si lo necesitas):
   ```sql
   CREATE DATABASE decidetab;
   CREATE USER decidetab_user WITH PASSWORD 'decidetab_pass';
   GRANT ALL PRIVILEGES ON DATABASE decidetab TO decidetab_user;
   ```
2. Cargar datos iniciales:
   ```bash
   psql -h localhost -U decidetab_user -d decidetab -f db/seed.sql
   ```

##### Opción B: Docker solo para PostgreSQL
1. Copiar variables de entorno base:
   ```bash
   cp .env.example .env
   ```
2. Levantar únicamente la base de datos:
   ```bash
   docker compose up -d db
   ```
3. Verificar que PostgreSQL esté listo:
   ```bash
   docker compose ps
   ```

> Si ya existía el volumen `db_data`, el seed no se vuelve a ejecutar automáticamente. Para recargar datos desde cero:
> ```bash
> docker compose down -v
> docker compose up -d db
> ```

#### 2) Backend en modo desarrollo
1. Ir al directorio del backend e instalar dependencias:
   ```bash
   cd backend
   npm install
   ```
2. Crear archivo de entorno del backend (`backend/.env`):
   ```env
   PORT=4000
   DATABASE_URL=postgresql://decidetab_user:decidetab_pass@localhost:5432/decidetab
   CORS_ORIGIN=http://localhost:5173
   ```
3. Correr backend en modo desarrollo (watch):
   ```bash
   npm run dev
   ```

#### 3) Frontend en modo desarrollo
1. En otra terminal, ir al frontend e instalar dependencias:
   ```bash
   cd frontend
   npm install
   ```
2. Crear archivo de entorno del frontend (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:4000/api
   ```
3. Correr frontend en modo desarrollo:
   ```bash
   npm run dev
   ```

#### 4) Variables de entorno necesarias para desarrollo

##### Backend (`backend/.env`)
- `DATABASE_URL` (**obligatoria**): URL de conexión PostgreSQL.
- `PORT` (opcional, default `4000`): puerto del backend.
- `CORS_ORIGIN` (opcional, default `*`): origen permitido para frontend.

##### Frontend (`frontend/.env`)
- `VITE_API_URL` (recomendada): URL base del API (ej. `http://localhost:4000/api`).
  - Si no se define, el frontend usa `/api` por defecto.

#### 5) Puertos y URLs en desarrollo
- Frontend (Vite): `http://localhost:5173`
- Backend (API): `http://localhost:4000/api`
- Healthcheck backend: `http://localhost:4000/health`
- PostgreSQL: `localhost:5432`

### Estructura del proyecto
```text
decidetab/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── db/
│   └── seed.sql
├── docker-compose.yml
├── .env.example
└── README.md
```

### Endpoints API
- `GET /api/test-items` → devuelve 90 ítems Hereford
- `GET /api/socioeconomic-questions` → devuelve 8 preguntas socioeconómicas
- `POST /api/calculate-results` → calcula resultados

Payload esperado para cálculo:
```json
{
  "sex": "M",
  "testAnswers": { "1": 4, "2": 5 },
  "socioeconomicAnswers": { "1": "padre_madre", "3": "B" }
}
```

### Notas funcionales
- **Rango A (P3):** límite $1,500
- **Rango B (P3):** límite $4,000
- **Rango C (P3):** sin límite
- Carreras con costo superior al límite se muestran al final con etiqueta **⚠️ Advertencia de Costo**.
