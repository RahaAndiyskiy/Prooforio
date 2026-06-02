import type { ReactNode } from 'react';
import type { ReviewerGender } from '@/entities/review/avatar';

export type ReviewExportTemplateProps = {
  author: string;
  text: string;
  rating: number;
  createdAt: string;
  profileName: string;
  reviewerGender?: ReviewerGender;
  reviewerAvatarSrc?: string;
};

export type ReviewExportTemplateContent = {
  brand: {
    label: string;
  };
  header: {
    title: string;
    badge: string;
  };
  rating: {
    value: string;
    icon: string;
  };
  body: {
    quote: string;
  };
  footer: {
    author: string;
    meta: string;
    date: string;
    avatarSrc: string;
  };
};

export type ReviewExportTemplateFormat = 'landscape' | 'square' | 'story';

export type ReviewExportStyleId = 'clean' | 'bold' | 'cream-plum' | 'noise-greige' | 'aqua-frame';

export type ReviewExportLayoutId = 'hero-top' | 'split-header' | 'avatar-spotlight';

export type ReviewExportFontFamilyId = 'noto-sans' | 'inter' | 'ibm-plex-sans' | 'pt-serif' | 'playfair-display';

export type ReviewExportFontPackId = 'neutral-sans' | 'clean-sans' | 'tech-sans' | 'editorial-serif' | 'playfair-display';

export type ReviewExportPresetMeta = {
  format: ReviewExportTemplateFormat;
  styleId: ReviewExportStyleId;
  layoutId: ReviewExportLayoutId;
  fontPackId: ReviewExportFontPackId;
  tags: string[];
  featured: boolean;
  order: number;
};

export type ReviewExportPresetDefinition = {
  id: string;
  label: string;
  description: string;
  meta: ReviewExportPresetMeta;
};

export type ReviewExportCanvasDimensions = {
  width: number;
  height: number;
};

export type ReviewExportPresetRenderContext = {
  review: ReviewExportTemplateProps;
  content: ReviewExportTemplateContent;
  preset: ReviewExportPresetDefinition;
  dimensions: ReviewExportCanvasDimensions;
  resolvePublicAssetSrc?: (publicAssetPath: string) => string;
};

export type ReviewExportPresetRenderer = (context: ReviewExportPresetRenderContext) => ReactNode;

export type ReviewExportRequest = ReviewExportTemplateProps & {
  presetId?: string;
  templateId?: string;
  format?: 'png' | 'jpeg';
};
