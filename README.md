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
