# AeroPaq - Sistema de Logística y Cotización Web 🚀

AeroPaq es una plataforma web moderna diseñada para la gestión de servicios de mensajería y paquetería. Este proyecto fue desarrollado como parte del curso de **Programación Web**, enfocándose en la eficiencia de cálculos logísticos y la integración de servicios de terceros.

---

## 🛠️ a. Tecnologías y Versiones

El proyecto utiliza un stack basado en JavaScript moderno para garantizar escalabilidad y una experiencia de usuario fluida.

| Tecnología              | Versión (Aprox) | Descripción |
|:------------------------|:----------------| :--- |
| **React**               | 18.x            | Librería principal para la interfaz de usuario. |
| **Node.js**             | 18.x / 20.x     | Entorno de ejecución para el desarrollo. |
| **Vite**                | 5.x             | Herramienta de construcción y servidor de desarrollo. |
| **Google Apps Script**  | V8 Engine       | Backend serverless para la gestión del formulario de contacto. |
| **CSS puro y Tailwind** | -               | Estilización y diseño responsivo. |

---

## 🚀 b. Cómo Ejecutar el Proyecto

Existen dos procedimientos para interactuar con el proyecto, dependiendo si deseas correr el entorno de desarrollo local o realizar el proceso de construcción para producción.

### Opción 1: Entorno de Desarrollo Local
Este procedimiento es el convencional para levantar el proyecto en tu máquina y realizar pruebas.

1. Clonar el repositorio desde la rama `main`.
2. Ingresar a la carpeta principal del código fuente:
   ```bash
   cd docs
   ```
3. Instalar las dependencias necesarias:
   ```bash
   npm install
   ```
4. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abrir el `localhost` generado (usualmente `http://localhost:5173`) en el navegador web de tu preferencia.

### Opción 2: Generación de Build y Despliegue
Este procedimiento se utiliza para compilar el proyecto y prepararlo para el entorno de producción.

1. Clonar el repositorio desde la rama `main`.
2. Ingresar a la carpeta principal del código fuente:
   ```bash
   cd docs
   ```
3. Instalar las dependencias (si no se han instalado previamente) y compilar el proyecto:
   ```bash
   npm install
   npm run build
   ```
4. El comando anterior generará una carpeta llamada `dist` dentro del directorio `docs`. Debe hacer push **exclusivamente de los archivos generados en esta carpeta** hacia la rama `Despliegue` del repositorio.
5. Finalmente, entrar al link público de "https://diegoazurdia1998.github.io/Proyecto-PW-2026/" proporcionado por el servicio de hosting.

---

## 🧠 c. Decisiones Técnicas Relevantes

### 1. Estructura de Directorios Modular
Para mantener el proyecto organizado y separar el código fuente de la documentación, se implementó la siguiente estructura en la raíz (`Proyecto-PW-2026`):
* **`docs/`**: Contiene todo el código fuente de la aplicación React/Vite, las dependencias (`node_modules`) y los archivos de configuración.
* **`Entregables/`**: Directorio aislado para almacenar la documentación académica, rúbricas y manuales en formato PDF o Markdown.

### 2. Sistema de Correos con EmailJS
Para el módulo de "Contáctanos", se integró el servicio de **EmailJS**. Esta decisión permite enviar correos electrónicos de manera directa desde el cliente (React) sin necesidad de configurar un servidor backend propio. Esto agiliza la comunicación entre los usuarios y el equipo de AeroPaq de manera segura.

### 3. Implementación de Google Analytics (Métricas)
Se integró el sistema de métricas de Google para monitorear el tráfico y el comportamiento de los usuarios dentro de la plataforma. Esto permite recopilar datos valiosos sobre las interacciones con la página y optimizar la experiencia de usuario basándose en estadísticas reales de uso.

### 4. Arquitectura Frontend y Herramientas
Se optó por utilizar **Vite** como entorno de desarrollo debido a su rapidez en la compilación y actualización en caliente (HMR). El proyecto se desarrolló bajo una arquitectura de componentes funcionales para facilitar la separación entre la interfaz visual (Landing Page) y la lógica matemática del cotizador.

### 5. Enfoque "Serverless" (Sin backend propio)

Para no complicar la infraestructura con un servidor en Node.js o Python, optaron por servicios de terceros. Integraron EmailJS en el ContactForm.jsx para el envío de correos directos desde el cliente, y Google Analytics para las métricas.

### 6. Estrategia de Estilos: Combinación de Tailwind y CSS Puro
Para el diseño visual y la responsividad de la interfaz, se adoptó un enfoque híbrido utilizando **Tailwind CSS** complementado con hojas de estilo en **CSS puro**. Esta decisión técnica se fundamenta en los siguientes beneficios:
* **Desarrollo Ágil y Consistencia:** Tailwind permitió un prototipado rápido y la construcción de la estructura principal (layouts, flexbox/grid, espaciados y tipografía) mediante clases utilitarias directamente en los componentes de React, asegurando un diseño consistente en toda la plataforma.
* **Control Granular y Abstracción:** Se reservó el uso de CSS puro para aquellos componentes con requerimientos visuales altamente específicos, animaciones complejas (keyframes) o casos donde el uso excesivo de clases utilitarias saturaría la lectura del código (HTML clutter). Esto garantiza un balance entre rapidez de desarrollo y un código fuente limpio y mantenible.

* ### 7. Lógica y Arquitectura del Cotizador de Envíos
Para garantizar el funcionamiento preciso y eficiente del sistema de cotización, se tomaron las siguientes decisiones arquitectónicas y de validación:

* **Desacoplamiento de la Lógica (Separation of Concerns):** Se extrajo todo el algoritmo matemático de tarifas a un módulo independiente (`shippingMath.js`). Esto aísla las reglas de negocio de la interfaz gráfica construida en React, permitiendo actualizar las fórmulas de cobro sin riesgo de afectar el renderizado de los componentes visuales.
* **Procesamiento en el Cliente (Client-Side Processing):** Los cálculos de las tarifas, basados en las variables de peso, volumen y destino, se ejecutan directamente en el navegador del usuario. Esta decisión técnica elimina la latencia que supondría hacer peticiones a un servidor externo para cada nueva cotización, ofreciendo resultados instantáneos.
* **Validación Robusta y Soporte Internacional:** Se implementaron validaciones de entrada de datos directamente en los formularios antes de pasar los valores al algoritmo. Esto incluye soporte mediante expresiones regulares para formatos de códigos postales alfanuméricos internacionales, asegurando la integridad de los datos y previniendo errores matemáticos o fallos en la aplicación.
