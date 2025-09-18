# API Services

This directory contains services for backend communication.

## ChatApiService

Main service to handle chat API calls.

### Basic usage

```typescript
import { chatApiService } from '../services';

// Send a message
try {
  const response = await chatApiService.sendMessage('Hello, how are you?');
  console.log(response.reply);
} catch (error) {
  console.error('Error:', error.message);
}
```

### Available methods

- `sendMessage(message: string)`: Sends a message to the chat

### Configuration

The service uses the `NEXT_PUBLIC_API_BASE` environment variable to determine the backend base URL. By default it uses `http://localhost:3001`.

#### Configure API URL

1. **Create `.env.local` file** in the project root:
```bash
NEXT_PUBLIC_API_BASE=http://localhost:3001
```
