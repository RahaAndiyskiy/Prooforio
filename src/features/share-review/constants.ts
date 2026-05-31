import type { ReviewExportTemplateFormat } from './export/types';

// Landscape остается текущим production-форматом экспорта по умолчанию.
export const EXPORT_WIDTH = 1200;
export const EXPORT_HEIGHT = 630;

export const TEMPLATE_FORMAT_DIMENSIONS: Record<ReviewExportTemplateFormat, { width: number; height: number }> = {
	landscape: {
		width: 1200,
		height: 630,
	},
	square: {
		width: 1080,
		height: 1080,
	},
	story: {
		width: 1080,
		height: 1920,
	},
};
