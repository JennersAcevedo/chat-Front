# Servicios de API

Este directorio contiene los servicios para la comunicación con el backend.

## ChatApiService

Servicio principal para manejar las llamadas a la API del chat.

### Uso básico

```typescript
import { chatApiService } from '../services';

// Enviar un mensaje
try {
  const response = await chatApiService.sendMessage('Hola, ¿cómo estás?');
  console.log(response.reply);
} catch (error) {
  console.error('Error:', error.message);
}
```

### Métodos disponibles

- `sendMessage(message: string)`: Envía un mensaje al chat

### Configuración

El servicio utiliza la variable de entorno `NEXT_PUBLIC_API_BASE` para determinar la URL base del backend. Por defecto usa `http://localhost:3001`.

#### Configurar la URL de la API

1. **Crear archivo `.env.local`** en la raíz del proyecto:
```bash
NEXT_PUBLIC_API_BASE=http://localhost:3001
```
