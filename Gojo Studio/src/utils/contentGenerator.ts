import { GeneratedContent, GenerationRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const normaliseContent = (data: GeneratedContent): GeneratedContent => {
  return {
    ...data,
    captions: data.captions.map(caption => ({
      ...caption,
      hashtags: Array.isArray((caption as any).hashtags)
        ? (caption as any).hashtags.join(' ')
        : caption.hashtags,
    })),
  };
};

const buildErrorMessage = async (response: Response) => {
  try {
    const data = await response.json();
    if (data?.error) {
      const errorMessage = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
      if (data?.details) {
        const details = typeof data.details === 'string' ? data.details : JSON.stringify(data.details);
        return `${errorMessage}: ${details}`;
      }
      return errorMessage;
    }
  } catch (error) {
    // ignore JSON parse error and fall back to status text
  }

  return response.statusText || 'Request failed';
};

export const generateContent = async (request: GenerationRequest): Promise<GeneratedContent> => {
  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const message = await buildErrorMessage(response);
    throw new Error(message);
  }

  const data = await response.json();
  return normaliseContent(data as GeneratedContent);
};
