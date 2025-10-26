# MediBusqueda

Aplicación web desarrollada con React que permite a los usuarios buscar medicamentos según su nombre, precio y ubicación. El sistema integra fuentes oficiales como FONASA y servicios de mapas para mostrar farmacias cercanas con disponibilidad.

## Características principales

- Búsqueda de medicamentos por nombre o compuesto activo.  
- Visualización de farmacias cercanas mediante mapas interactivos (Leaflet).  
- Registro, inicio de sesión y edición de perfil de usuario.  
- Validación de formularios en tiempo real con React Hook Form.  
- Navegación fluida entre secciones mediante React Router DOM.  
- Diseño responsivo basado en Bootstrap 5.  

## Tecnologías utilizadas

- **Frontend:** React 19, Vite  
- **Librerías:**  
  - React Router DOM  
  - React Hook Form  
  - Leaflet  
  - Bootstrap 5  
- **Lenguaje:** JavaScript (ES6+)  
- **Pruebas:** @testing-library/react, Jest DOM  

## Estructura del proyecto

src/
│
├── Api/ # Módulos de conexión con APIs externas
├── components/ # Componentes reutilizables (NavBar, CardMedicamento, etc.)
├── assets/ # Imágenes y recursos estáticos
├── App.jsx # Componente principal
├── main.jsx # Punto de entrada
└── styles/ # Estilos globales (opcional)


## Requisitos previos

- Node.js 18 o superior  
- Navegador web moderno (Chrome, Firefox, Edge o Safari)

## Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/medibusqueda.git

2. Entrar al directorio del proyecto: 
    ```bash
    cd MediBusqueda

3. Instalacion de dependencias:
    ```bash
    npm install

4. Ejecutar el entorno de desarrollo:
    ```bash
    npm run dev

5. Abrir el navegador en la direccion indicada (por defecto: http://localhost:5173)

## Compilacion para produccion

    ```bash
    npm run build




