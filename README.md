# MediBusqueda

Aplicación web desarrollada en React orientada a la consulta de información pública sobre medicamentos, consumiendo APIs oficiales de FONASA.  
El proyecto busca facilitar el acceso a datos relevantes mediante una interfaz clara, simple y enfocada en la experiencia de usuario.

## Contexto y problema
El acceso a información sobre medicamentos desde fuentes públicas suele presentarse de forma poco intuitiva para usuarios finales.  
MediBusqueda aborda este problema construyendo una aplicación frontend que consume APIs públicas y presenta la información de manera estructurada y comprensible.

## Funcionalidades principales
- Consumo de APIs públicas de FONASA desde el frontend.
- Búsqueda y visualización de información de medicamentos.
- Gestión de perfiles de usuario para almacenar medicamentos consultados con mayor frecuencia.
- Interfaz responsiva y orientada a la usabilidad.

## Stack tecnológico
- React
- JavaScript (ES6+)
- HTML5
- CSS / Tailwind CSS
- Consumo de APIs REST

## Decisiones técnicas
- Uso de React para la construcción de una interfaz basada en componentes reutilizables.
- Separación entre lógica de negocio (consumo de APIs) y componentes de presentación.
- Manejo de estado para controlar búsquedas, resultados y preferencias del usuario.
- Enfoque en simplicidad y claridad del código para facilitar mantenimiento y escalabilidad.

## Qué aprendí con este proyecto
- Consumo y manejo de datos desde APIs públicas.
- Organización de una aplicación frontend en React.
- Manejo de estados derivados de datos remotos.
- Diseño de interfaces enfocadas en usuarios no técnicos.
- Buenas prácticas básicas de estructura y mantenibilidad en proyectos frontend.

## Posibles mejoras futuras
- Implementación de autenticación de usuarios.
- Persistencia de datos en un backend dedicado.
- Incorporación de tests de componentes.
- Mejora de rendimiento mediante optimización de renderizados.

## Instalación y uso
```bash
npm install
npm start
