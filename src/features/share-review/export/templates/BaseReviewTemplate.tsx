import { getReviewExportFormatPreset } from '../formatPresets';
import { getReviewExportLayoutPreset } from '../layoutPresets';
import { getReviewExportFontPack } from '../fontPacks';
import { AquaFrameTemplate } from './aqua-frame';
import { CreamPlumTemplate } from './cream-plum';
import { NoiseGreigeTemplate } from './noise-greige';
import {
  TemplateCanvas,
  TemplateFooter,
  TemplateHeader,
  TemplateQuote,
  TemplateRatingPill,
} from '../primitives';
import { getReviewExportStyleTokens } from '../styleTokens';
import type { ReviewExportPresetRenderContext } from '../types';

export function BaseReviewTemplate(context: ReviewExportPresetRenderContext) {
  const { content, preset, dimensions } = context;

  if (preset.meta.styleId === 'aqua-frame') {
    return <AquaFrameTemplate {...context} />;
  }

  const formatPreset = getReviewExportFormatPreset(preset.meta.format);
  const tokens = getReviewExportStyleTokens(preset.meta.styleId);
  const fontPack = getReviewExportFontPack(preset.meta.fontPackId);
  const layout = getReviewExportLayoutPreset(preset.meta.layoutId);
  const footerSecondary = layout.footerSecondaryField === 'date' ? content.footer.date : content.footer.meta;

  if (preset.meta.layoutId === 'avatar-spotlight') {
    if (preset.meta.styleId === 'noise-greige') {
      return <NoiseGreigeTemplate {...context} />;
    }

    return <CreamPlumTemplate {...context} />;
  }

  return (
    <TemplateCanvas tokens={tokens} dimensions={dimensions} formatPreset={formatPreset} fontPack={fontPack}>
      <TemplateHeader
        brandLabel={content.brand.label}
        title={content.header.title}
        badge={content.header.badge}
        tokens={tokens}
        formatPreset={formatPreset}
        fontPack={fontPack}
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
        avatarSrc={content.footer.avatarSrc}
        tokens={tokens}
        formatPreset={formatPreset}
        secondaryColor={layout.footerSecondaryColor}
      />
    </TemplateCanvas>
  );
}
