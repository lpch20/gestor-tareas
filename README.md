# Aplicación de Gestión de Tareas (To-Do List)

Aplicación full-stack para gestión de tareas desarrollada con NestJS (backend) y React + TypeScript + Tailwind (frontend).

## 🛠️ Tecnologías

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

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- MySQL (v8 o superior) - Se instalará automáticamente si usas el script de setup
- npm o yarn
- Homebrew (para macOS) - Para instalar MySQL localmente

## 🚀 Instalación y Configuración

### 1. Instalar MySQL Local (si no lo tienes)

Si no tienes MySQL instalado, puedes instalarlo con Homebrew:

```bash
brew install mysql
brew services start mysql
```

### 2. Configurar Base de Datos MySQL

**Opción A: Usar el script de configuración automática (Recomendado)**

```bash
cd backend
./setup-db.sh
```

Este script:
- Verifica que MySQL esté corriendo
- Crea la base de datos `todo_db`
- Crea el archivo `.env` con la configuración local

**Opción B: Configuración manual**

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

## 🏃 Ejecutar la Aplicación

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


