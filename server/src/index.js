import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import { z } from 'zod';

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map(origin => origin.trim()).filter(Boolean)
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

const requestSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  description: z.string().min(10, 'Description should be at least 10 characters long'),
  referenceContent: z.string().optional(),
});

let openaiClient;
if (process.env.OPENAI_API_KEY) {
  openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
} else {
  console.warn('OPENAI_API_KEY is not set. The /api/generate endpoint will return an error.');
}

const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/generate', async (req, res) => {
  const parsed = requestSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid request payload',
      details: parsed.error.flatten(),
    });
  }

  if (!openaiClient) {
    return res.status(500).json({
      error: 'OpenAI API key is not configured on the server',
    });
  }

  const { platform, description, referenceContent } = parsed.data;

  try {
    const response = await openaiClient.responses.create({
      model,
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'text',
              text: 'You are a marketing strategist who writes high-performing titles and captions for social media platforms. '
                + 'Produce clear, engaging copy tailored to the specified platform. Use the provided reference content only if it is supplied.'
            }
          ]
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Platform: ${platform}\n` +
                `Content description: ${description}\n` +
                `Reference material: ${referenceContent ?? 'None provided'}`
            }
          ]
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'generated_content',
          schema: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'captions'],
            properties: {
              title: {
                type: 'string',
                description: 'A single attention-grabbing title tailored to the requested platform.'
              },
              captions: {
                type: 'array',
                minItems: 2,
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['style', 'text'],
                  properties: {
                    style: {
                      type: 'string',
                      description: 'Short label describing the tone or approach of the caption.'
                    },
                    text: {
                      type: 'string',
                      description: 'The body of the caption optimised for the target platform.'
                    },
                    hashtags: {
                      type: 'string',
                      description: 'Optional line of relevant hashtags separated by spaces.'
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    const outputText = response.output_text;
    const payload = JSON.parse(outputText);

    return res.json(payload);
  } catch (error) {
    console.error('Failed to generate content with OpenAI', error);

    const status = error?.status ?? 500;
    const message = error?.error?.message || error?.message || 'Unknown error';

    return res.status(status).json({
      error: 'Failed to generate content',
      details: message,
    });
  }
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled server error', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
