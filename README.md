# Sistema de Gestión de Inventario de Medicamentos (Prueba Técnica Full Stack)

Solución integral para el control de inventario de medicamentos, desarrollada siguiendo estrictamente los **requisitos técnicos** solicitados, implementando una arquitectura Cliente-Servidor contenerizada.

## Cumplimiento de Requisitos

Este proyecto ha sido diseñado para cumplir punto por punto con las especificaciones técnicas:

### Frontend (Cliente)
- **JavaScript (ES6+):** Lógica del lado del cliente y manipulación del DOM.
- **jQuery:** Manejo eficiente de eventos, selectores y peticiones AJAX.
- **CSS (Bootstrap 5):** Diseño responsivo, grillas y componentes visuales (Modales, Alertas, Badges).
- **Consumo de API's:** Comunicación asíncrona con el Backend mediante `$.ajax` y `fetch`.
- **Uso de Objetos:** Estructuración de datos y manipulación de objetos JSON para el envío y recepción de información.

### Backend (Servidor)
- **Creación de API:** API RESTful construida con **Node.js** y **Express**.
- **Tecnología Libre:** Stack de código abierto sin licencias propietarias.

### Base de Datos
- **PostgreSQL 17:** Base de datos relacional robusta.

---

## Características del Sistema

1.  **CRUD Completo:** Registro, Lectura, Edición y Eliminación de medicamentos.
2.  **Búsqueda Avanzada:**
    * Filtrado por coincidencia de iniciales (e.g., "P" busca "Paracetamol").
    * Filtrado dinámico por categorías.
    * Filtrado por estado de vencimiento (Vigentes y Expirados).
3.  **UX/UI Dinámico:**
    * **DataTables:** Integración para paginación y ordenamiento automático.
    * **Alertas Visuales:** Indicadores rojos automáticos para existencias de productos en cero.

---

## Instalación y Ejecución

El proyecto está **Dockerizado** para facilitar su revisión sin necesidad de instalar entornos locales de Node.js o PostgreSQL.

### Pre-requisitos
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo.

### Pasos para ejecutar

1.  **Clonar el repositorio:**
    ```bash
    git clone (https://github.com/DilanDaniel18/PruebaFullstack.git)
    cd PRUEBAFULLSTACK
    ```

2.  **Iniciar la aplicación:**
    Ejecuta el siguiente comando en la raíz del proyecto (donde está el archivo `docker-compose.yml`):
    ```bash
    docker-compose up --build
    ```

3.  **Sistema iniciado:**
    El sistema aprovisionará automáticamente la base de datos, insertará datos de prueba (`init.sql`) e iniciará los servicios.

---

## Accesos

Una vez que la terminal indique que los servicios están activos:

| Servicio | URL | Descripción |
| :--- | :--- | :--- |
| **Frontend Web** | [http://localhost:5173](http://localhost:5173) | Interfaz de usuario (Bootstrap + jQuery) |
| **API Backend** | [http://localhost:3000/api/medicamentos](http://localhost:3000/api/medicamentos) | Endpoints JSON |

---

## Estructura del Proyecto

```text
/
├── client/                 # Frontend
│   ├── index.html          # Estructura HTML5
│   ├── main.js             # Lógica (jQuery y AJAX)
│   └── style.css           # Estilos personalizados
│
├── server/                 # Backend
│   ├── src/
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── models/         # Consultas SQL
│   │   └── routes/         # Rutas de la API
│   └── index.js            # Punto de entrada
│
├── docker-compose.yml      # Orquestador de contenedores
└── init.sql                # Script de inicialización de BD
