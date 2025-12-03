# Aplicación de Gestión de Tareas (To-Do List)

Aplicación full-stack para gestión de tareas desarrollada con NestJS (backend) y React + TypeScript + Tailwind (frontend).

## Tecnologías

### Backend
- **Node.js** - Runtime de JavaScript
- **NestJS** - Framework de Node.js 
- **Prisma** - ORM para base de datos
- **MySQL** - Base de datos relacional

### Frontend
- **React** - Biblioteca de UI
- **TypeScript** - Superset tipado de JavaScript
- **Tailwind CSS** - Framework de CSS utility-first
- **Vite** - Build tool y dev server
- **Axios** - Cliente HTTP

## Arquitectura del Proyecto

La aplicación sigue una arquitectura de separación de responsabilidades con un backend API REST y un frontend SPA (Single Page Application). El backend está estructurado en módulos siguiendo los principios de NestJS, mientras que el frontend utiliza una arquitectura basada en componentes con gestión de estado mediante Context API.

La comunicación entre frontend y backend se realiza mediante peticiones HTTP RESTful, utilizando JWT para la autenticación y autorización de usuarios. La base de datos relacional almacena tanto la información de usuarios como las tareas, manteniendo relaciones entre ellas.

## Decisiones Técnicas

### Backend
- **NestJS**: Se eligió por su arquitectura modular y escalable, facilitando la organización del código y el mantenimiento a largo plazo.
- **Prisma**: Como ORM, proporciona type-safety y una capa de abstracción robusta sobre la base de datos, simplificando las operaciones y migraciones.
- **JWT**: Implementado para autenticación stateless, permitiendo escalabilidad horizontal sin necesidad de sesiones en servidor.
- **MySQL**: Base de datos relacional que garantiza la integridad de los datos y soporta relaciones complejas entre entidades.

### Frontend
- **React con TypeScript**: Combinación que ofrece tipado estático y mejor experiencia de desarrollo, reduciendo errores en tiempo de ejecución.
- **Context API**: Para gestión de estado global de autenticación y tareas, evitando dependencias adicionales y manteniendo la aplicación ligera.
- **Tailwind CSS**: Framework utility-first que permite desarrollo rápido de interfaces sin necesidad de escribir CSS personalizado extenso.
- **Vite**: Herramienta de build moderna que ofrece tiempos de desarrollo significativamente más rápidos comparado con otras alternativas.

## Requisitos Previos

- Node.js (v18 o superior)
- MySQL (v8 o superior) - Se instalará automáticamente si usas el script de setup
- npm o yarn
- Homebrew (para macOS) - Para instalar MySQL localmente

## Instalación y Configuración

### 1. Instalar MySQL Local (si no lo tienes)

Si no tienes MySQL instalado, puedes instalarlo con Homebrew:

```bash
brew install mysql
brew services start mysql
```

### 2. Configurar Base de Datos MySQL

1. Inicia MySQL (si no está corriendo):
```bash
brew services start mysql
```

2. Crea la base de datos:
```bash
mysql -u root -e "CREATE DATABASE todo_db;"
```

3. Crea el archivo `.env` en la carpeta `backend`:
```env
DATABASE_URL="mysql://root@localhost:3306/todo_db?schema=public"
PORT=3000
JWT_SECRET=
```

### 3. Configurar Backend

```bash
cd backend
npm install
```

Genera el cliente de Prisma y ejecuta las migraciones:

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 3. Configurar Frontend

```bash
cd frontend
npm install
```

## Ejecutar la Aplicación

### Backend

```bash
cd backend
npm run start:dev
```

El backend estará disponible en `http://localhost:3000`

### Frontend

En una nueva terminal:

```bash
cd frontend
npm run dev
```

El frontend estará disponible en `http://localhost:5173`


