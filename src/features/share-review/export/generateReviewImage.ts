import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
import satori from 'satori';
import { buildReviewExportPresetRenderContext } from './buildReviewExportPresetRenderContext';
import { getReviewExportFontFacesForPack } from './fontPacks';
import { getReviewExportPresetById, reviewExportPresetRenderer } from './templates';
import type { ReviewExportTemplateProps } from './types';

const require = createRequire(import.meta.url);
const { Resvg } = require('@resvg/resvg-js');

const exportFontBufferCache = new Map<string, Buffer>();
const publicAssetDataUriCache = new Map<string, string>();

function getExportFontBuffer(fontFilePath: string) {
  const cachedBuffer = exportFontBufferCache.get(fontFilePath);

  if (cachedBuffer) {
    return cachedBuffer;
  }

  const nextBuffer = fs.readFileSync(path.join(process.cwd(), fontFilePath));
  exportFontBufferCache.set(fontFilePath, nextBuffer);
  return nextBuffer;
}

function getMimeTypeByFilePath(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === '.svg') {
    return 'image/svg+xml';
  }

  if (extension === '.png') {
    return 'image/png';
  }

  if (extension === '.jpg' || extension === '.jpeg') {
    return 'image/jpeg';
  }

  if (extension === '.webp') {
    return 'image/webp';
  }

  return 'application/octet-stream';
}

function getPublicAssetDataUri(publicAssetPath: string) {
  if (publicAssetPath.startsWith('data:')) {
    return publicAssetPath;
  }

  const cachedDataUri = publicAssetDataUriCache.get(publicAssetPath);
  if (cachedDataUri) {
    return cachedDataUri;
  }

  const normalizedPublicPath = publicAssetPath.replace(/^\//, '');
  const absoluteFilePath = path.join(process.cwd(), 'public', normalizedPublicPath);
  const fileBuffer = fs.readFileSync(absoluteFilePath);
  const dataUri = `data:${getMimeTypeByFilePath(absoluteFilePath)};base64,${fileBuffer.toString('base64')}`;

  publicAssetDataUriCache.set(publicAssetPath, dataUri);
  return dataUri;
}

export async function generateReviewImage(review: ReviewExportTemplateProps, presetId: string) {
  // Preview и export используют один и тот же реестр пресетов, чтобы композиция не расходилась между экраном и файлом.
  const selectedPreset = getReviewExportPresetById(presetId);
  const renderContext = buildReviewExportPresetRenderContext(review, selectedPreset);
  renderContext.content.footer.avatarSrc = getPublicAssetDataUri(renderContext.content.footer.avatarSrc);
  renderContext.resolvePublicAssetSrc = getPublicAssetDataUri;
  const element = reviewExportPresetRenderer(renderContext);
  const exportFonts = getReviewExportFontFacesForPack(selectedPreset.meta.fontPackId);

  // Сначала JSX шаблона рендерится в SVG через satori, затем SVG превращается в PNG через Resvg.
  const svg = await satori(element, {
    width: renderContext.dimensions.width,
    height: renderContext.dimensions.height,
    fonts: exportFonts.map((fontFace) => ({
      name: fontFace.family,
      data: getExportFontBuffer(fontFace.filePath),
      weight: fontFace.weight,
      style: fontFace.style,
    })),
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: renderContext.dimensions.width,
    },
    background: 'transparent',
  });

  const pngData = resvg.render();
  return pngData.asPng();
}
