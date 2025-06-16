# ClimaxTFG – Aplicación Meteorológica Personalizada

Aplicación web desarrollada para consultar el clima en tiempo real, con autenticación de usuarios, panel de preferencias, radar meteorológico y más.

---

## Requisitos mínimos para ejecutar el proyecto

### Backend (Spring Boot):
- Java JDK 21 o superior
- Maven 3.8+
- PostgreSQL 14 o superior
- IDE recomendado: IntelliJ IDEA o Eclipse

### Frontend (React):
- Node.js v16 o superior
- npm v8 o superior
- Navegador actualizado (Chrome, Firefox, Edge)
- IDE recomendado: Visual Studio Code

---

## Estructura del Proyecto

```
climax-tfg/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
└── database/
    └── init.sql
```

---

## Instrucciones de instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/climax-tfg.git
cd climax-tfg
```

---

### 2. Configura la base de datos

1. Crea una base de datos PostgreSQL llamada `climaxdb`.
2. Importa el archivo `init.sql` desde la carpeta `/database`:

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    role VARCHAR(20) DEFAULT 'CLIENTE',
    fecha_nacimiento DATE
);
```

---

### 3. Backend (Spring Boot)

1. Entra al directorio:

```bash
cd backend
```

2. Instala dependencias y ejecuta:

```bash
./mvnw spring-boot:run
```

El backend estará disponible en `http://localhost:8080`.

---

### 4. Frontend (React)

1. En otro terminal:

```bash
cd frontend
```

2. Instala dependencias y arranca el servidor:

```bash
npm install
npm run dev
```

La app estará corriendo en `http://localhost:5173`.

---

## Usuarios de prueba

| Usuario      | Email                | Contraseña  |
|--------------|----------------------|-------------|
| Usuario demo | demo@climaxtfg.com   | demo123     |

---

## Tecnologías Utilizadas

- **Frontend:** React, TypeScript, Recharts, Bootstrap
- **Backend:** Spring Boot, Spring Security, JWT
- **Base de Datos:** PostgreSQL
- **API Externa:** WeatherAPI, WindyAPI
