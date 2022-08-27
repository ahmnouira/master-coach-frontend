type SVGIcon = 'pdf-file' | 'podcast-file' | 'video-file';

export function getSVGIcon(name: SVGIcon) {
  return `../../assets/icon/${name}.svg`;
}

export const PDF_ICON = getSVGIcon('pdf-file');
export const VIDEO_ICON = getSVGIcon('video-file');
export const PODCAST_ICON = getSVGIcon('podcast-file');
