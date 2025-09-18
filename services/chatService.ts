// ---> Tipos para tipado estricto de la API 
export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
}

// ---> Clase de Error personalizada para errores de API 
export class ApiError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// --->  Configuración de la API 
// Cambia esta URL por la de tu API externa
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

function joinUrl(base: string, path: string): string {
  const b = base.replace(/\/+$/, '');
  const p = path.replace(/^\/+/, '');
  return `${b}/${p}`;
}

// --->  Clase del Servicio de API 
export class ChatApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  /**
   * Envía un mensaje al chat y obtiene la respuesta
   * @param message - El mensaje del usuario
   * @returns Promise con la respuesta del bot
   * @throws ApiError si hay un error en la petición
   */
  async sendMessage(message: string): Promise<ChatResponse> {
    if (!message.trim()) {
      throw new ApiError('Message cannot be empty.', 400);
    }

    try {
      const payload: ChatRequest = { message: message.trim() };
      
      const response = await fetch(joinUrl(this.baseUrl, '/chat'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Intentar obtener el mensaje de error del cuerpo de la respuesta
        let errorMessage = this.getErrorMessage(response.status);
        
        try {
          const errorData = await response.json();
          // Si la API retorna un mensaje de error específico, usarlo
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          }
        } catch (parseError) {
          // Si no se puede parsear el JSON, usar el mensaje por defecto
          console.warn('Could not parse error response:', parseError);
        }
        
        throw new ApiError(errorMessage, response.status);
      }

      const data: ChatResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Error de conexión o red
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new ApiError('No se pudo conectar con el servidor. Verifica que la API esté funcionando.', 0);
      }
      
      throw new ApiError('Error inesperado. Por favor, intenta de nuevo.', 0);
    }
  }

  /**
   * Obtiene el mensaje de error apropiado según el código de estado HTTP
   * @param status - Código de estado HTTP
   * @returns Mensaje de error descriptivo
   */
  private getErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Solicitud inválida. Verifica que el mensaje no esté vacío.';
      case 503:
        return 'Servicio no disponible. Intenta de nuevo más tarde.';
      case 504:
        return 'Tiempo de espera agotado. El servidor tardó demasiado en responder.';
      default:
        return `Error del servidor (HTTP ${status}). Intenta de nuevo más tarde.`;
    }
  }
}

// --->  Instancia singleton del servicio 
export const chatApiService = new ChatApiService();

export const sendChatMessage = (message: string): Promise<ChatResponse> => {
  return chatApiService.sendMessage(message);
};
