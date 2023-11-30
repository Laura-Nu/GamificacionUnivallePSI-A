# PSI-GamificacionUnivalle
              Manual Técnico – Gamificación

------CONTRASEÑAS:-------
Admin: rsuarez contraseña: rsuarez
Master: rquiroga  contraseña: rquiroga
----------------------------------------
-------------YOUTUBE ----------------
https://www.youtube.com/watch?v=ILgTY5VocZM
---------------------------------------
1.	Introducción:

La aplicación de Ranking Estudiantil es un proyecto desarrollado para llevar un conteo de los logros y méritos académicos obtenidos por estudiantes universitarios. Mediante una interfaz web, permite la administración de los perfiles e insignias de cada alumno, así como la generación de reportes y el reconocimiento de los estudiantes más destacados. Este documento detalla los aspectos técnicos más relevantes del sistema, incluyendo decisiones de arquitectura, tecnologías utilizadas, requerimientos, despliegue e información técnica de soporte. Está dirigido a los desarrolladores y personal de TI involucrados en el mantenimiento, hospedaje y futuro desarrollo sobre esta plataforma web.

2.	Descripción del proyecto:

El proyecto consiste en una aplicación web con dos componentes principales: Frontend: Interfaz de usuario desarrollada en React con componentes funcionales. Ofrece vistas personalizadas para el rol de estudiante y de administrador.
Backend: Servicios de API REST desarrollados con .NET Core para acceder a la base de datos y authenticar usuarios. 
La aplicación permite administrar los perfiles de estudiantes y sus logros académicos, mediante una vista de "gamificación" e insignias que hacen amigable la plataforma. Los reportes descargables facilitan la toma de decisiones y reconocimientos internos.

3.	Roles / integrantes

El equipo esta desarrollado por:

•	Alejandro Lopez Torrez: Team Leader
•	Maria Laura Nuñez Jaillita: Full Stack – Git Master
•	Daniel Eduardo Miranda Canaviri: Full Stack – Arquitecto BD

4.	Arquitectura del software: 

La solución está compuesta por un frontend de interfaz de usuario y un backend API con acceso a base de datos SQL Server.

•	Frontend

React (v18.x) 
Componentes funcionales
React Router para navegación 
Custom Hooks para reutilizar lógica
Context API para estado global 
Bootstrap para estilos


•	Backend

SP.NET Core Web API 
Entity Framework Core para acceso a datos 
SQL Server como base de datos relacional 
Autenticación y autorización mediante JWT

El frontend se comunica con la API Backend a través de solicitudes HTTP y JSON.

•	Patrones

Separación de responsabilidades 
Single responsibility principle 
Contextos y custom hooks para compartir lógica 
Servicios RESTful


5.	Requisitos del sistema:
•	Cliente Web

Navegador web actualizado (Chrome, Firefox, Edge, Safari) 
Conexión estable a internet

•	Servidor (Backend API)

Sistema operativo Windows o Linux 
CPU 2 núcleos 
8GB RAM 10GB almacenamiento 
Runtime de .NET Core 
Acceso a base de datos SQL Server


6.	Instalación y configuración: 

•	Frontend

Clonar repositorio 
Ejecutar npm install para descargar dependencias 
Ejecutar npm install js-cookie para descargar dependencias
Ejecutar npm install universal-cookie para descargar dependencias
Ejecutar npm start para entorno de desarrollo 
Generar build para producción: npm run build

•	Backend

Clonar proyecto .NET Core 
Abrir en Visual Studio 2022+ 
Configurar cadena de conexión hacia SQL Server (Program.cs y appsettings.json)
Compilar proyecto Ejecutar Backend API

•	Base De Datos

Instalar SQL Server + SQL Management Studio 
Restaurar el archivo .bak de la base de Datos


7.	PROCEDIMIENTO DE HOSTEADO / HOSTING (configuración)
•	Base de Datos

Instalar SQL Server + SQL Server Management Studio 
Restaurar .bak en SQL Server
Configurar reglas de firewall para permitir acceso

•	Frontend

Compilar webapp de React para obtener archivos estáticos 
Copiar archivos generados a servidor web 
Configurar reglas de enrutamiento y CORS en backend API

•	      Backend

Crear usuario en la API mediante el endpoint créate-user preferentemente de Rol Master o Administrador o Studen, el rol Master va a tener acceso a todo o usar las credenciales de master de la base (User:master; Password:pass)



8.	GIT : 

El código fuente se encuentra alojado en GitHub bajo el respositorio organizacion/sistema-ranking. Ahí puede obtenerse la versión más reciente de ambos frontend y API backend. También puede descargarse el código compilado de la última versión en la sección de Releases.

9.	Personalización y configuración: 

•	Backend
Cadenas de conexión de base de datos 
JWT: llaves de encriptación y vigencia de tokens
Correo electrónico: credenciales SMTP

10.	Seguridad: 

Consideraciones de seguridad implementadas: 
Autenticación Stateful mediante JWT para evitar ataques CSRF y sesiones secuestradas 
Validación de datos de entrada para prevenir inyecciones SQL y JS (sanitización) Acceso basado en rol (RBAC) 
Encryptación de contraseñas con BCrypt.Net

11.	Depuración y solución de problemas: 

•	Frontend

Errores renderizando componentes: revisar console.log y network de desarrollador 
Peticiones fallidas al API: revisar mensajes de error devueltos por respuestas 4xx o 5xx 
Conflictos de estilos: debuggear specificity CSS, order y media queries

•	Backend

Errores lógicos: revisar trazas y logs de aplicación 
Excepciones de base de datos: revisar construcción de queries y SQL generado Conflictos de autenticación: verificar firma y vigencia de JWT

12.	Glosario de términos: 

JWT: JSON Web Token. Estándar para realizar autenticación entre aplicaciones de forma segura. 

CRUD: Create / Read / Update / Delete. Funciones principales para manipular registros y bases de datos. 

RBAC: Role Based Access Control para restringir acceso.

13.	Referencias y recursos adicionales: 

Documentación Oficial React: https://reactjs.org/docs 
Documentación ASP.NET Core: https://docs.microsoft.com/en-us/aspnet/core



14.	Herramientas de Implementación:

•	Frontend

React 18 
React Router 6 
React Bootstrap 
Axios

•	Backend

ASP.NET Core 6 
Entity Framework Core 6 
SQL Server Express 2017 +
Swagger UI

15.	Bibliografía

•	Ejemplo, M. (2020). Desarrollo de aplicaciones web progresivas. España. Editorial AC. Reynolds, M. (2019). ASP.NET Core 3 y ReacEjemplo, M. (2020). Desarrollo de aplicaciones web progresivas. España. Editorial AC. 
•	Reynolds, M. (2019). ASP.NET Core 3 y React. EEUU. O'Reilly Media.t. EEUU. O'Reilly Media.



