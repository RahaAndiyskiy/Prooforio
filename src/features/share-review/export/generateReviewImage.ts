import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
import satori from 'satori';
import { buildReviewExportTemplateContext } from './buildReviewExportTemplateContext';
import { reviewExportTemplates } from './templates';
import type { ReviewExportTemplateProps } from './types';

const require = createRequire(import.meta.url);
const { Resvg } = require('@resvg/resvg-js');

const EXPORT_WIDTH = 1200;
const EXPORT_HEIGHT = 630;
const EXPORT_FONT_FAMILY = 'Prooforio Export Sans';

// Шрифты читаются один раз на уровне модуля, чтобы не делать I/O при каждом экспорте.
const EXPORT_FONT_REGULAR = fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', 'NotoSans-Regular.ttf'));
const EXPORT_FONT_BOLD = fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', 'NotoSans-Bold.ttf'));

export async function generateReviewImage(review: ReviewExportTemplateProps, templateId: string) {
  // Preview и export используют один и тот же реестр шаблонов, чтобы композиция не расходилась между экраном и файлом.
  const selectedTemplate = reviewExportTemplates.find((template) => template.id === templateId) ?? reviewExportTemplates[0];
  const element = selectedTemplate.Component(buildReviewExportTemplateContext(review));

  // Сначала JSX шаблона рендерится в SVG через satori, затем SVG превращается в PNG через Resvg.
  const svg = await satori(element, {
    width: EXPORT_WIDTH,
    height: EXPORT_HEIGHT,
    fonts: [
      { name: EXPORT_FONT_FAMILY, data: EXPORT_FONT_REGULAR, weight: 400, style: 'normal' },
      { name: EXPORT_FONT_FAMILY, data: EXPORT_FONT_BOLD, weight: 700, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: EXPORT_WIDTH,
    },
    background: 'transparent',
  });

  const pngData = resvg.render();
  return pngData.asPng();
}
