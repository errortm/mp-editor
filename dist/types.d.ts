export interface Style {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
    textAlign?: 'left' | 'center' | 'right';
    lineHeight?: number;
    margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    padding?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    fontWeight?: string | number;
    fontStyle?: 'normal' | 'italic';
    textDecoration?: 'none' | 'underline' | 'line-through';
    width?: string | number;
    height?: string | number;
    maxWidth?: string | number;
    border?: string;
    borderRadius?: number;
    borderCollapse?: 'collapse' | 'separate';
}
export type ParagraphType = 'normal' | 'title' | 'subtitle' | 'quote' | 'code' | 'list' | 'image' | 'table' | 'tableHeader' | 'tableRow';
export interface Paragraph {
    type: ParagraphType;
    content: string;
    style?: Style;
    children?: Paragraph[];
    attributes?: {
        [key: string]: string;
    };
}
export interface FormatResult {
    html: string;
    styles: Record<string, Style>;
}
export interface Theme {
    name: string;
    styles: {
        [key in ParagraphType]: Style;
    };
}
export interface ThemeConfig {
    currentTheme: string;
    themes: {
        [key: string]: Theme;
    };
}
