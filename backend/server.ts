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

const promptTemplates: Record<string, (body: GenerateBody) => string> = {
  youtube: ({ description, referenceContent }) =>
    `Create a JSON object with a YouTube video title and two caption variants.\nDescription: ${description}\nReference: ${referenceContent || 'none'}\nRespond using JSON matching this schema: {"title":"string","captions":[{"style":"string","text":"string","hashtags":"string"}]}.`,
  tiktok: ({ description, referenceContent }) =>
    `Generate a catchy TikTok title and three short captions as JSON.\nDescription: ${description}\nReference: ${referenceContent || 'none'}\nReturn JSON: {"title":"string","captions":[{"style":"string","text":"string","hashtags":"string"}]}.`,
  instagram: ({ description, referenceContent }) =>
    `You are an Instagram influencer assistant. Create a post title and three caption options in JSON.\nDescription: ${description}\nReference: ${referenceContent || 'none'}\nFormat as {"title":"string","captions":[{"style":"string","text":"string","hashtags":"string"}]}.`,
  linkedin: ({ description, referenceContent }) =>
    `Produce a professional LinkedIn post title and two caption styles as JSON.\nDescription: ${description}\nReference: ${referenceContent || 'none'}\nJSON format: {"title":"string","captions":[{"style":"string","text":"string","hashtags":"string"}]}.`
};

app.post('/generate', async (req, res) => {
  const { platform, description, referenceContent } = req.body as GenerateBody;

  if (!platform || !description) {
    return res.status(400).json({ error: 'platform and description are required' });
  }

  const template = promptTemplates[platform];
  if (!template) {
    return res.status(400).json({ error: 'Unsupported platform' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY not set' });
  }

  const prompt = template({ platform, description, referenceContent });

  try {
    const OpenAI = (await import('openai')).default;
    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You generate engaging social media titles and captions.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    });

    const content = completion.choices[0]?.message?.content;
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
