import type { ReviewExportFontFamilyId, ReviewExportFontPackId } from './types';

type ReviewExportFontStyle = 'normal';

type ReviewExportFontAsset = {
  publicPath: string;
  weight: 400 | 700;
  style: ReviewExportFontStyle;
};

export type ReviewExportFontFamilyDefinition = {
  id: ReviewExportFontFamilyId;
  family: string;
  cssFaces: Array<{
    publicPath: string;
    weight: string;
    style: ReviewExportFontStyle;
  }>;
  exportFaces: ReviewExportFontAsset[];
};

type ReviewExportFontPackDefinition = {
  id: ReviewExportFontPackId;
  label: string;
  description: string;
  displayFamilyId: ReviewExportFontFamilyId;
  bodyFamilyId: ReviewExportFontFamilyId;
};

export type ReviewExportResolvedFontPack = ReviewExportFontPackDefinition & {
  displayFamily: ReviewExportFontFamilyDefinition;
  bodyFamily: ReviewExportFontFamilyDefinition;
};

const reviewExportFontFamilies: Record<ReviewExportFontFamilyId, ReviewExportFontFamilyDefinition> = {
  'noto-sans': {
    id: 'noto-sans',
    family: 'Prooforio Export Sans',
    cssFaces: [
      {
        publicPath: '/fonts/NotoSans-Regular.ttf',
        weight: '400',
        style: 'normal',
      },
      {
        publicPath: '/fonts/NotoSans-Bold.ttf',
        weight: '700',
        style: 'normal',
      },
    ],
    exportFaces: [
      {
        publicPath: '/fonts/NotoSans-Regular.ttf',
        weight: 400,
        style: 'normal',
      },
      {
        publicPath: '/fonts/NotoSans-Bold.ttf',
        weight: 700,
        style: 'normal',
      },
    ],
  },
  inter: {
    id: 'inter',
    family: 'Prooforio Inter',
    cssFaces: [
      {
        publicPath: '/fonts/inter/Inter-Regular.ttf',
        weight: '400',
        style: 'normal',
      },
      {
        publicPath: '/fonts/inter/Inter-Bold.ttf',
        weight: '700',
        style: 'normal',
      },
    ],
    exportFaces: [
      {
        publicPath: '/fonts/inter/Inter-Regular.ttf',
        weight: 400,
        style: 'normal',
      },
      {
        publicPath: '/fonts/inter/Inter-Bold.ttf',
        weight: 700,
        style: 'normal',
      },
    ],
  },
  'ibm-plex-sans': {
    id: 'ibm-plex-sans',
    family: 'Prooforio IBM Plex Sans',
    cssFaces: [
      {
        publicPath: '/fonts/ibm-plex-sans/IBMPlexSans-Variable.ttf',
        weight: '100 700',
        style: 'normal',
      },
    ],
    exportFaces: [
      {
        publicPath: '/fonts/ibm-plex-sans/IBMPlexSans-Variable.ttf',
        weight: 400,
        style: 'normal',
      },
      {
        publicPath: '/fonts/ibm-plex-sans/IBMPlexSans-Variable.ttf',
        weight: 700,
        style: 'normal',
      },
    ],
  },
  'pt-serif': {
    id: 'pt-serif',
    family: 'Prooforio PT Serif',
    cssFaces: [
      {
        publicPath: '/fonts/pt-serif/PTSerif-Regular.ttf',
        weight: '400',
        style: 'normal',
      },
      {
        publicPath: '/fonts/pt-serif/PTSerif-Bold.ttf',
        weight: '700',
        style: 'normal',
      },
    ],
    exportFaces: [
      {
        publicPath: '/fonts/pt-serif/PTSerif-Regular.ttf',
        weight: 400,
        style: 'normal',
      },
      {
        publicPath: '/fonts/pt-serif/PTSerif-Bold.ttf',
        weight: 700,
        style: 'normal',
      },
    ],
  },
  'playfair-display': {
    id: 'playfair-display',
    family: 'Prooforio Playfair Display',
    cssFaces: [
      {
        publicPath: '/fonts/playfair-display/PlayfairDisplay-Regular.ttf',
        weight: '400',
        style: 'normal',
      },
    ],
    exportFaces: [
      {
        publicPath: '/fonts/playfair-display/PlayfairDisplay-Regular.ttf',
        weight: 400,
        style: 'normal',
      },
    ],
  },
};

const reviewExportFontPacks: Record<ReviewExportFontPackId, ReviewExportFontPackDefinition> = {
  'neutral-sans': {
    id: 'neutral-sans',
    label: 'Neutral Sans',
    description: 'Нейтральный безопасный sans pack на базе Noto Sans.',
    displayFamilyId: 'noto-sans',
    bodyFamilyId: 'noto-sans',
  },
  'clean-sans': {
    id: 'clean-sans',
    label: 'Clean Sans',
    description: 'Чистый современный sans pack на базе Inter.',
    displayFamilyId: 'inter',
    bodyFamilyId: 'inter',
  },
  'tech-sans': {
    id: 'tech-sans',
    label: 'Tech Sans',
    description: 'Более структурный sans pack на базе IBM Plex Sans.',
    displayFamilyId: 'ibm-plex-sans',
    bodyFamilyId: 'ibm-plex-sans',
  },
  'editorial-serif': {
    id: 'editorial-serif',
    label: 'Editorial Serif',
    description: 'Контрастный editorial pack: PT Serif для титула и Inter для текста.',
    displayFamilyId: 'pt-serif',
    bodyFamilyId: 'inter',
  },
  'playfair-display': {
    id: 'playfair-display',
    label: 'Playfair Display',
    description: 'Классический serif pack на базе Playfair Display.',
    displayFamilyId: 'playfair-display',
    bodyFamilyId: 'playfair-display',
  },
};

export const reviewExportFontFamilyDefinitions = Object.values(reviewExportFontFamilies);
export const reviewExportFontPackDefinitions = Object.values(reviewExportFontPacks);

export function getReviewExportFontFamily(familyId: ReviewExportFontFamilyId) {
  return reviewExportFontFamilies[familyId];
}

export function getReviewExportFontPack(fontPackId: ReviewExportFontPackId): ReviewExportResolvedFontPack {
  const pack = reviewExportFontPacks[fontPackId];

  return {
    ...pack,
    displayFamily: getReviewExportFontFamily(pack.displayFamilyId),
    bodyFamily: getReviewExportFontFamily(pack.bodyFamilyId),
  };
}

export function getReviewExportFontFacesForPack(fontPackId: ReviewExportFontPackId) {
  const pack = getReviewExportFontPack(fontPackId);
  const uniqueFaces = new Map<string, ReviewExportFontAsset & { family: string }>();

  for (const family of [pack.displayFamily, pack.bodyFamily]) {
    for (const face of family.exportFaces) {
      const key = `${family.family}:${face.publicPath}:${face.weight}:${face.style}`;

      if (!uniqueFaces.has(key)) {
        uniqueFaces.set(key, {
          ...face,
          family: family.family,
        });
      }
    }
  }

  return [...uniqueFaces.values()];
}
