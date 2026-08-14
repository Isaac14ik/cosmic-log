# 🌌 CosmicLog — Plataforma de Exploración Espacial

**CosmicLog** es una aplicación web interactiva diseñada para entusiastas de la astronomía, la ciencia y la exploración espacial. Permite a los usuarios buscar noticias y artículos astronómicos en tiempo real, guardarlos en su bitácora personal y acceder a lecturas detalladas de fuentes oficiales.

---

## 🚀 Características Principales

- **Búsqueda en Tiempo Real:** Integración con la API de noticias espaciales (*Spaceflight News API*) para consultar artículos actualizados sobre Marte, la NASA, galaxias y más.
- **Gestión de Estados de UI:**
  - `Preloader` animado durante la carga de peticiones.
  - Mensaje descriptivo de `NotFound` cuando no se obtienen resultados.
  - Manejo de errores de conexión con el servidor.
- **Paginación Dinámica:** Muestra resultados en filas de 3 tarjetas con funcionalidad de *"Mostrar más"*.
- **Bitácora Personal (Guardado de Tarjetas):** Permite guardar artículos preferidos mediante una simulación de estado de sesión.
- **Persistencia de Datos:** Uso de `localStorage` para conservar las búsquedas recientes y la bitácora del usuario incluso tras recargar la página.
- **Diseño Responsivo y Temático:** Interfaz oscura (*Dark Mode*) con efectos de iluminación cósmica (*Glassmorphism* & *Glow Effects*) adaptada a móviles, tablets y escritorio.

---

## 🛠️ Tecnologías Utilizadas

- **Front-end:** React.js, JSX, CSS3 (BEM Metodología), HTML5.
- **Enrutamiento:** `react-router-dom` v6.
- **Empaquetador & Dev Server:** Vite.
- **Control de Versiones:** Git & GitHub.
- **API Externa:** Spaceflight News API (v4).

---

## 👨‍💻 Autor

**Jorge Isaac Nava Hernández**  
*Fullstack Developer*  
- Proyecto desarrollado como parte de la formación especializada en **TripleTen**.

---

## 📋 Resumen del Desarrollo (Etapa 1)

1. **Configuración Inicial:** Estructuración de componentes React modularizados (`Header`, `Main`, `Card`, `SavedCards`, `SearchForm`, `Preloader`, etc.).
2. **Control de Ramas Git:** Desarrollo aislado en la rama `stage-react-api` antes de su integración a `main`.
3. **Capa de Servicios API:** Creación de la clase `ThirdPartyApi.js` para gestionar solicitudes `GET` asíncronas con promesas.
4. **Flujo de Usuario:** Implementación de modales de inicio de sesión/registro, navegación entre rutas (`/` y `/saved-cards`) y avisos de interacción (*tooltips*).

---

## ⚙️ Instalación y Ejecución Local

Si deseas ejecutar este proyecto en tu máquina local:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Isaac14ik/cosmic-log.git

   ## ⚙️ Ejecución Local

cd cosmic-log
npm install

# Iniciar servidor
npm run dev