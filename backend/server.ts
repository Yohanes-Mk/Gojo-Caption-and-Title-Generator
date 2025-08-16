import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

interface GenerateBody {
  platform: string;
  description: string;
  referenceContent?: string;
}

interface PlatformConfig {
  prompt: (body: GenerateBody) => string;
  captionCount: number;
}

const platforms: Record<string, PlatformConfig> = {
  youtube: {
    captionCount: 2,
    prompt: ({ description, referenceContent }) =>
      `Create a YouTube video title and two engaging caption options with hashtags.\nDescription: ${description}\nReference: ${referenceContent || 'none'}`
  },
  tiktok: {
    captionCount: 3,
    prompt: ({ description, referenceContent }) =>
      `Generate a catchy TikTok title and three short caption options with hashtags.\nDescription: ${description}\nReference: ${referenceContent || 'none'}`
  },
  instagram: {
    captionCount: 3,
    prompt: ({ description, referenceContent }) =>
      `You are an Instagram influencer assistant. Craft a post title and three caption styles with hashtags.\nDescription: ${description}\nReference: ${referenceContent || 'none'}`
  },
  linkedin: {
    captionCount: 2,
    prompt: ({ description, referenceContent }) =>
      `Produce a professional LinkedIn post title and two caption variants with hashtags.\nDescription: ${description}\nReference: ${referenceContent || 'none'}`
  }
};

app.post('/generate', async (req, res) => {
  const { platform, description, referenceContent } = req.body as GenerateBody;

  if (!platform || !description) {
    return res.status(400).json({ error: 'platform and description are required' });
  }

  const config = platforms[platform];
  if (!config) {
    return res.status(400).json({ error: 'Unsupported platform' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY not set' });
  }

  const prompt = config.prompt({ platform, description, referenceContent });

  try {
    const OpenAI = (await import('openai')).default;
    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      instructions: 'You generate engaging social media titles and captions.',
      input: prompt,
      text: {
        format: {
          type: 'json_schema',
          name: 'generated_content',
          schema: buildSchema(config.captionCount),
          strict: true
        }
      }
    });

    const content = response.output_text;
    if (!content) {
      return res.status(500).json({ error: 'No content returned from AI' });
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error('Parsing error:', e, content);
      return res.status(500).json({ error: 'Invalid AI response format' });
    }

    return res.json(parsed);
  } catch (err) {
    console.error('Request failed:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

function buildSchema(count: number) {
  return {
    type: 'object',
    properties: {
      title: { type: 'string' },
      captions: {
        type: 'array',
        minItems: count,
        maxItems: count,
        items: {
          type: 'object',
          properties: {
            style: { type: 'string' },
            text: { type: 'string' },
            hashtags: { type: 'string' }
          },
          required: ['style', 'text', 'hashtags'],
          additionalProperties: false
        }
      }
    },
    required: ['title', 'captions'],
    additionalProperties: false
  };
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
