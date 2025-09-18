// ---> Types for strict API typing
export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
}

// ---> Custom Error class for API errors
export class ApiError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// ---> API Configuration
// Change this URL to your external API
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

function joinUrl(base: string, path: string): string {
  const b = base.replace(/\/+$/, '');
  const p = path.replace(/^\/+/, '');
  return `${b}/${p}`;
}

// ---> API Service Class
export class ChatApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  /**
   * Sends a message to the chat and gets the response
   * @param message - The user's message
   * @returns Promise with the bot's response
   * @throws ApiError if there's an error in the request
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
        // Try to get the error message from the response body
        let errorMessage = this.getErrorMessage(response.status);
        
        try {
          const errorData = await response.json();
          // If the API returns a specific error message, use it
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          }
        } catch (parseError) {
          // If JSON cannot be parsed, use the default message
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
      
      // Connection or network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new ApiError('Could not connect to server. Please verify that the API is running.', 0);
      }
      
      throw new ApiError('Unexpected error. Please try again.', 0);
    }
  }

  /**
   * Gets the appropriate error message based on HTTP status code
   * @param status - HTTP status code
   * @returns Descriptive error message
   */
  private getErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Invalid request. Please verify that the message is not empty.';
      case 503:
        return 'Service unavailable. Please try again later.';
      case 504:
        return 'Request timeout. The server took too long to respond.';
      default:
        return `Server error (HTTP ${status}). Please try again later.`;
    }
  }
}

// ---> Singleton service instance
export const chatApiService = new ChatApiService();

export const sendChatMessage = (message: string): Promise<ChatResponse> => {
  return chatApiService.sendMessage(message);
};
