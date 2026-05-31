import { getReviewExportFormatPreset } from '../formatPresets';
import { getReviewExportLayoutPreset } from '../layoutPresets';
import {
  TemplateCanvas,
  TemplateFooter,
  TemplateHeader,
  TemplateQuote,
  TemplateRatingPill,
} from '../primitives';
import { getReviewExportStyleTokens } from '../styleTokens';
import type { ReviewExportPresetRenderContext } from '../types';

export function BaseReviewTemplate({ content, preset, dimensions }: ReviewExportPresetRenderContext) {
  const formatPreset = getReviewExportFormatPreset(preset.meta.format);
  const tokens = getReviewExportStyleTokens(preset.meta.styleId);
  const layout = getReviewExportLayoutPreset(preset.meta.layoutId);
  const footerSecondary = layout.footerSecondaryField === 'date' ? content.footer.date : content.footer.meta;

  return (
    <TemplateCanvas tokens={tokens} dimensions={dimensions} formatPreset={formatPreset}>
      <TemplateHeader
        brandLabel={content.brand.label}
        title={content.header.title}
        badge={content.header.badge}
        tokens={tokens}
        formatPreset={formatPreset}
      />
      <TemplateRatingPill
        value={content.rating.value}
        icon={content.rating.icon}
        tokens={tokens}
        formatPreset={formatPreset}
        trailing={
          layout.ratingTrailing === 'date' ? (
            <span style={{ fontSize: formatPreset.trailingFontSize, color: layout.ratingTrailingColor ?? tokens.footerMetaColor }}>
              {content.footer.date}
            </span>
          ) : null
        }
      />
      <TemplateQuote quote={content.body.quote} tokens={tokens} formatPreset={formatPreset} />
      <TemplateFooter
        author={content.footer.author}
        secondary={footerSecondary}
        tokens={tokens}
        formatPreset={formatPreset}
        secondaryColor={layout.footerSecondaryColor}
      />
    </TemplateCanvas>
  );
}