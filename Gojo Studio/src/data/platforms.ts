import { Platform } from '../types';

export const platforms: Platform[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    color: 'from-red-500 to-red-600',
    maxTitleLength: 100,
    maxCaptionLength: 5000,
    characteristics: [
      'SEO-optimized titles',
      'Detailed descriptions',
      'Educational tone',
      'Timestamps and chapters'
    ]
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    color: 'from-pink-500 to-purple-600',
    maxTitleLength: 150,
    maxCaptionLength: 2200,
    characteristics: [
      'Viral hooks',
      'Trending hashtags',
      'Casual tone',
      'Call-to-action'
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: 'from-purple-500 to-pink-500',
    maxTitleLength: 125,
    maxCaptionLength: 2200,
    characteristics: [
      'Visual storytelling',
      'Aesthetic captions',
      'Lifestyle focus',
      'Community engagement'
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: 'from-blue-600 to-blue-700',
    maxTitleLength: 120,
    maxCaptionLength: 3000,
    characteristics: [
      'Professional tone',
      'Industry insights',
      'Thought leadership',
      'Business value'
    ]
  }
];