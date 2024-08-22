# Clínica Abraham - Sistema de Gestión de Turnos

Bienvenido al Sistema de Gestión de Turnos de **Clínica Abraham**. Esta aplicación web permite a los usuarios solicitar turnos y a los administradores gestionarlos de manera eficiente.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para aplicaciones web.
- **ShadCN**: Componentes de UI para una interfaz moderna.
- **TailwindCSS**: Framework CSS para diseño responsivo.
- **Appwrite**: Backend open-source para autenticación y base de datos.
- **Nodemailer**: Envío de correos electrónicos.
- **Sentry**: Monitoreo de errores y rendimiento.

## Funcionalidades

- **Solicitud de Turnos**: Los usuarios pueden solicitar turnos.
- **Gestión de Turnos**: Los administradores pueden aceptar o cancelar turnos.
- **Notificaciones por Correo**: Los usuarios reciben notificaciones automáticas por email al ser aceptado o cancelado su turno.

## Configuración del Entorno

Configura las siguientes variables en un archivo `.env`:

```env
# Configuración de Appwrite
PROJECT_ID=tu_project_id
API_KEY=tu_api_key
DATABASE_ID=tu_database_id
APPOINTMENT_COLLECTION_ID=tu_appointment_collection_id

# Configuración pública
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Configuración de Nodemailer
EMAIL_HOST=smtp.tu-servidor-de-correo.com
EMAIL_PORT=tu_puerto_de_correo
EMAIL_USER=tu_correo_ejemplo@dominio.com
EMAIL_PASS=tu_contraseña_de_correo
```

## Instrucciones de Configuración

1. Clona el repositorio.
2. Crea un archivo `.env` con las variables de entorno proporcionadas.
3. Instala las dependencias y ejecuta el servidor:
   ```bash
   npm install
   npm run dev
   ```
4. Accede a la aplicación en `http://localhost:3000`.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.