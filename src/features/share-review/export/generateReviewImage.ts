import fs from 'fs';
import path from 'path';
import satori from 'satori';
import { reviewExportTemplates } from './templates';
import type { ReviewExportTemplateProps } from './types';

const dynamicRequire = eval('require');
const { Resvg } = dynamicRequire('@resvg/resvg-js');

const EXPORT_WIDTH = 1200;
const EXPORT_HEIGHT = 630;
const EXPORT_FONT_FAMILY = 'Prooforio Export Sans';

const EXPORT_FONT_REGULAR = fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', 'NotoSans-Regular.ttf'));
const EXPORT_FONT_BOLD = fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', 'NotoSans-Bold.ttf'));

export async function generateReviewImage(review: ReviewExportTemplateProps, templateId: string) {
  const selectedTemplate = reviewExportTemplates.find((template) => template.id === templateId) ?? reviewExportTemplates[0];
  const element = selectedTemplate.Component(review);

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
