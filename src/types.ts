// 样式定义
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

// 段落类型
export type ParagraphType = 
    | 'normal' 
    | 'title' 
    | 'subtitle' 
    | 'quote' 
    | 'code' 
    | 'list'
    | 'image'
    | 'table'
    | 'tableHeader'
    | 'tableRow';

// 段落定义
export interface Paragraph {
    type: ParagraphType;
    content: string;
    style?: Style;
    children?: Paragraph[];
    attributes?: {
        [key: string]: string;
    };
}

// 格式化结果
export interface FormatResult {
    html: string;
    styles: Record<string, Style>;
}

// 主题定义
export interface Theme {
    name: string;
    styles: {
        [key in ParagraphType]: Style;
    };
}

// 主题配置
export interface ThemeConfig {
    currentTheme: string;
    themes: {
        [key: string]: Theme;
    };
} 