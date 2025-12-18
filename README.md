# 🏦 Mockup Aplicación Bancaria (React + Tailwind)

Este proyecto es un prototipo funcional (Mockup) de una aplicación bancaria móvil desarrollada con **React**. Simula operaciones financieras, transferencias y un sistema de detección de fraudes integrado (contexto CLAIMS.AI).

## 🚀 Tecnologías Utilizadas

* **Core:** React 18 + Vite (Entorno de desarrollo rápido).
* **Estilos:** Tailwind CSS (Diseño responsive y utilitario).
* **Iconos:** Lucide React.
* **Lenguaje:** JavaScript (ES6+).

## 📋 Requisitos Previos

Para ejecutar este proyecto necesitas tener instalado en tu computadora:
* **Node.js** (Versión 16 o superior).
* **NPM** (Viene instalado con Node.js).

## 🛠️ Instalación y Configuración

Si clonas este repositorio por primera vez, sigue estos pasos para instalar todas las dependencias necesarias automáticamente:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/YaelVar/mockup.git](https://github.com/YaelVar/mockup.git)
    cd mockup
    ```

2.  **Instalar dependencias:**
    Ejecuta el siguiente comando en la terminal para descargar `react`, `tailwindcss`, `lucide-react` y las demás librerías listadas en el `package.json`:
    ```bash
    npm install
    ```

> **Nota:** No es necesario configurar Tailwind manualmente, ya que los archivos de configuración (`tailwind.config.js` y `postcss.config.js`) ya están incluidos en el repositorio.

## ▶️ Ejecutar el Proyecto

Para iniciar el servidor de desarrollo local:

1.  Abre la terminal en la carpeta del proyecto.
2.  Ejecuta:
    ```bash
    npm run dev
    ```
3.  Abre tu navegador en la dirección que aparece (usualmente `http://localhost:5173`).

## 📂 Estructura del Proyecto

* **`src/App.jsx`**: Contiene toda la lógica principal, navegación entre pantallas y simulación de estados (fraude, alertas).
* **`src/index.css`**: Configuración base de las directivas de Tailwind.
* **`tailwind.config.js`**: Configuración del sistema de diseño.

## 🛡️ Funcionalidades Simuladas

* **Navegación:** Flujo entre Inicio, Operaciones, Transferencias y Confirmación.
* **Simulación de Fraude:** Botones ocultos en la pantalla de confirmación para disparar alertas de seguridad (Dispositivo desconocido, ubicación inconsistente, etc.).
* **Interfaz Reactiva:** Diseño adaptado visualmente a dispositivos móviles.

---
Desarrollado como parte de propuesta técnica para validación de flujos de seguridad bancaria.
