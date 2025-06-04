declare module 'react-pageflip' {
  import React from 'react';

  export interface PageFlip {
    getPageCount(): number;
    getCurrentPageIndex(): number;
    turnToPage(pageNum: number): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;
    flip(pageNum: number, corner?: 'top' | 'bottom'): void;
    flipNext(corner?: 'top' | 'bottom'): void;
    flipPrev(corner?: 'top' | 'bottom'): void;
    loadFromImages(images: string[]): void;
    loadFromHtml(items: NodeListOf<Element> | HTMLElement[]): void;
    updateFromHtml(items: NodeListOf<Element> | HTMLElement[]): void;
    updateFromImages(images: string[]): void;
    destroy(): void;
  }

  export interface HTMLFlipBookProps {
    width: number;
    height: number;
    size?: 'fixed' | 'stretch';
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    style?: React.CSSProperties;
    startPage?: number;
    className?: string;
    children?: React.ReactNode;
    onFlip?: (e: { data: number; object: PageFlip }) => void;
    onChangeOrientation?: (e: { data: 'portrait' | 'landscape'; object: PageFlip }) => void;
    onChangeState?: (e: { data: 'user_fold' | 'fold_corner' | 'flipping' | 'read'; object: PageFlip }) => void;
    [key: string]: any; // Para permitir props adicionales
  }

  const HTMLFlipBook: React.ForwardRefExoticComponent<HTMLFlipBookProps & React.RefAttributes<any>>;
  export default HTMLFlipBook;
}
