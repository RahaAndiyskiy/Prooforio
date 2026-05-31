import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
import satori from 'satori';
import { buildReviewExportPresetRenderContext } from './buildReviewExportPresetRenderContext';
import { getReviewExportPresetById, reviewExportPresetRenderer } from './templates';
import type { ReviewExportTemplateProps } from './types';

const require = createRequire(import.meta.url);
const { Resvg } = require('@resvg/resvg-js');

const EXPORT_FONT_FAMILY = 'Prooforio Export Sans';

// Шрифты читаются один раз на уровне модуля, чтобы не делать I/O при каждом экспорте.
const EXPORT_FONT_REGULAR = fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', 'NotoSans-Regular.ttf'));
const EXPORT_FONT_BOLD = fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', 'NotoSans-Bold.ttf'));

export async function generateReviewImage(review: ReviewExportTemplateProps, presetId: string) {
  // Preview и export используют один и тот же реестр пресетов, чтобы композиция не расходилась между экраном и файлом.
  const selectedPreset = getReviewExportPresetById(presetId);
  const renderContext = buildReviewExportPresetRenderContext(review, selectedPreset);
  const element = reviewExportPresetRenderer(renderContext);

  // Сначала JSX шаблона рендерится в SVG через satori, затем SVG превращается в PNG через Resvg.
  const svg = await satori(element, {
    width: renderContext.dimensions.width,
    height: renderContext.dimensions.height,
    fonts: [
      { name: EXPORT_FONT_FAMILY, data: EXPORT_FONT_REGULAR, weight: 400, style: 'normal' },
      { name: EXPORT_FONT_FAMILY, data: EXPORT_FONT_BOLD, weight: 700, style: 'normal' },
    ],
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
