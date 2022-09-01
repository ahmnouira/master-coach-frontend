type SVGIcon = 'pdf-file' | 'podcast-file' | 'video-file';

type SidebarSVGIcon = 'clothing-store' | '' | '';

export function getSVGIcon(name: SVGIcon) {
  return `../../assets/icon/${name}.svg`;
}

export function getSidebarIcon(name: SidebarSVGIcon) {
  return `../../assets/img/common/${name}.svg`;
}

export const PDF_ICON = getSVGIcon('pdf-file');
export const VIDEO_ICON = getSVGIcon('video-file');
export const PODCAST_ICON = getSVGIcon('podcast-file');

export const SIDEBAR_ICON = getSidebarIcon('clothing-store');
