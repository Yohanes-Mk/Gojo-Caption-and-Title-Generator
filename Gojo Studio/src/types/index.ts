export interface Platform {
  id: string;
  name: string;
  color: string;
  maxTitleLength: number;
  maxCaptionLength: number;
  characteristics: string[];
}

export interface GeneratedContent {
  title: string;
  captions: {
    style: string;
    text: string;
    hashtags?: string;
  }[];
}

export interface GenerationRequest {
  platform: string;
  description: string;
  referenceContent?: string;
}