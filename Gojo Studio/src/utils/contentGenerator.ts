import { GeneratedContent, GenerationRequest } from '../types';
import { platforms } from '../data/platforms';

export const generateContent = async (request: GenerationRequest): Promise<GeneratedContent> => {
  const platform = platforms.find(p => p.id === request.platform);
  
  if (!platform) {
    throw new Error('Platform not found');
  }

  // Simulate AI generation with platform-specific logic
  await new Promise(resolve => setTimeout(resolve, 2000));

  const baseTitle = generateTitle(request.description, platform);
  const captions = generateCaptions(request.description, platform, request.referenceContent);

  return {
    title: baseTitle,
    captions
  };
};

const generateTitle = (description: string, platform: any): string => {
  const keywords = extractKeywords(description);
  
  const titleTemplates = {
    youtube: [
      `How to ${keywords[0]} in 2025 (Step-by-Step Guide)`,
      `The Ultimate ${keywords[0]} Tutorial for Beginners`,
      `${keywords[0]}: Everything You Need to Know`,
      `Master ${keywords[0]} in Just 10 Minutes`
    ],
    tiktok: [
      `POV: You just discovered ${keywords[0]} ✨`,
      `This ${keywords[0]} hack will blow your mind`,
      `${keywords[0]} but make it ✨aesthetic✨`,
      `Why everyone's obsessed with ${keywords[0]}`
    ],
    instagram: [
      `The ${keywords[0]} glow up you needed 💫`,
      `${keywords[0]} vibes only ✨`,
      `Your daily dose of ${keywords[0]} inspiration`,
      `${keywords[0]} moments that matter`
    ],
    linkedin: [
      `Why ${keywords[0]} is revolutionizing business in 2025`,
      `The strategic approach to ${keywords[0]} every leader needs`,
      `${keywords[0]}: Insights from industry professionals`,
      `Leveraging ${keywords[0]} for competitive advantage`
    ]
  };

  const templates = titleTemplates[platform.id] || titleTemplates.youtube;
  return templates[Math.floor(Math.random() * templates.length)];
};

const generateCaptions = (description: string, platform: any, referenceContent?: string) => {
  const keywords = extractKeywords(description);
  const hashtags = generateHashtags(keywords, platform.id);

  const captionStyles = {
    youtube: [
      {
        style: 'Educational',
        text: `In this comprehensive guide, we dive deep into ${keywords[0]}. Whether you're a beginner or looking to advance your skills, this video covers everything you need to know.\n\n🎯 What you'll learn:\n• The fundamentals of ${keywords[0]}\n• Common mistakes to avoid\n• Pro tips and best practices\n\nDon't forget to subscribe for more tutorials!`,
        hashtags: hashtags.slice(0, 5).join(' ')
      },
      {
        style: 'Casual',
        text: `Hey everyone! Today we're talking about ${keywords[0]} and honestly, I'm so excited to share this with you. This has been a game-changer for me and I know it will be for you too.\n\nLet me know in the comments what you think and what you'd like to see next!`,
        hashtags: hashtags.slice(0, 5).join(' ')
      }
    ],
    tiktok: [
      {
        style: 'Viral Hook',
        text: `Nobody talks about this ${keywords[0]} secret... but it literally changed everything for me 👀\n\nLike if you want part 2!`,
        hashtags: hashtags.slice(0, 8).join(' ')
      },
      {
        style: 'Educational',
        text: `Here's what I wish someone told me about ${keywords[0]} when I started:\n\n✨ It's not as complicated as it seems\n✨ You can start with just 5 minutes a day\n✨ The results speak for themselves\n\nSave this for later! 📌`,
        hashtags: hashtags.slice(0, 8).join(' ')
      },
      {
        style: 'Story Time',
        text: `Story time: How ${keywords[0]} saved my entire year...\n\nI was struggling until I discovered this one thing. Now I can't imagine my life without it.\n\nComment "TELL ME" if you want the full story! 👇`,
        hashtags: hashtags.slice(0, 8).join(' ')
      }
    ],
    instagram: [
      {
        style: 'Aesthetic',
        text: `Currently obsessing over ${keywords[0]} and the way it's transformed my daily routine ✨\n\nThere's something magical about finding what works for you and watching everything else fall into place.\n\nWhat's been your latest discovery? 💭`,
        hashtags: hashtags.slice(0, 10).join(' ')
      },
      {
        style: 'Educational',
        text: `Let's talk ${keywords[0]} 💫\n\nSwipe for everything you need to know about getting started, common mistakes, and my top recommendations.\n\nSave this post if you're ready to level up! 📌`,
        hashtags: hashtags.slice(0, 10).join(' ')
      },
      {
        style: 'Personal',
        text: `Real talk: ${keywords[0]} wasn't always easy for me.\n\nBut once I shifted my mindset and found the right approach, everything changed. Sharing my journey because I know someone needs to hear this today.\n\nYou've got this! 💪`,
        hashtags: hashtags.slice(0, 10).join(' ')
      }
    ],
    linkedin: [
      {
        style: 'Professional',
        text: `The landscape of ${keywords[0]} is evolving rapidly, and professionals who adapt early will have a significant competitive advantage.\n\nKey insights from my recent experience:\n• Strategic implementation drives measurable results\n• Cross-functional collaboration enhances outcomes\n• Data-driven approaches ensure sustained success\n\nWhat's your perspective on the future of ${keywords[0]}?`,
        hashtags: hashtags.slice(0, 5).join(' ')
      },
      {
        style: 'Thought Leadership',
        text: `After 5+ years in the industry, here's what I've learned about ${keywords[0]}:\n\nIt's not just about the technical execution—it's about understanding the strategic implications and building sustainable processes that scale.\n\nThe organizations that get this right are the ones that will thrive in 2025 and beyond.\n\nAgree or disagree? Share your thoughts below. 👇`,
        hashtags: hashtags.slice(0, 5).join(' ')
      }
    ]
  };

  return captionStyles[platform.id] || captionStyles.youtube;
};

const extractKeywords = (description: string): string[] => {
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were'];
  const words = description.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => word.length > 3 && !commonWords.includes(word));
  
  return words.slice(0, 3);
};

const generateHashtags = (keywords: string[], platformId: string): string[] => {
  const baseHashtags = keywords.map(keyword => `#${keyword.replace(/\s+/g, '')}`);
  
  const platformHashtags = {
    youtube: ['#YouTube', '#Tutorial', '#HowTo', '#Learn', '#Tips'],
    tiktok: ['#TikTok', '#Viral', '#FYP', '#Trending', '#MustWatch', '#ViralVideo', '#ContentCreator'],
    instagram: ['#Instagram', '#Aesthetic', '#Inspiration', '#Daily', '#Lifestyle', '#Mood', '#Vibes'],
    linkedin: ['#LinkedIn', '#Professional', '#Business', '#Industry', '#Leadership', '#Growth']
  };
  
  return [...baseHashtags, ...platformHashtags[platformId] || []];
};