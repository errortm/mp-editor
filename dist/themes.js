// 默认主题
const defaultTheme = {
    name: 'default',
    styles: {
        normal: {
            fontSize: 16,
            fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
            color: '#333333',
            lineHeight: 1.75,
            margin: { top: 10, bottom: 10 }
        },
        title: {
            fontSize: 24,
            fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
            color: '#000000',
            textAlign: 'center',
            lineHeight: 1.5,
            margin: { top: 20, bottom: 20 }
        },
        subtitle: {
            fontSize: 20,
            fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
            color: '#000000',
            lineHeight: 1.5,
            margin: { top: 15, bottom: 15 }
        },
        quote: {
            fontSize: 16,
            fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
            color: '#666666',
            backgroundColor: '#f5f5f5',
            padding: { left: 15, right: 15, top: 10, bottom: 10 },
            margin: { top: 10, bottom: 10 }
        },
        code: {
            fontSize: 14,
            fontFamily: 'Consolas, Monaco, monospace',
            color: '#333333',
            backgroundColor: '#f5f5f5',
            padding: { left: 15, right: 15, top: 10, bottom: 10 },
            margin: { top: 10, bottom: 10 }
        },
        list: {
            fontSize: 16,
            fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
            color: '#333333',
            lineHeight: 1.75,
            margin: { top: 5, bottom: 5 }
        },
        image: {
            margin: { top: 10, bottom: 10 },
            maxWidth: '100%',
            borderRadius: 4
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            margin: { top: 10, bottom: 10 }
        },
        tableHeader: {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
            padding: { top: 8, right: 12, bottom: 8, left: 12 },
            border: '1px solid #ddd'
        },
        tableRow: {
            padding: { top: 8, right: 12, bottom: 8, left: 12 },
            border: '1px solid #ddd'
        }
    }
};
// 暗色主题
const darkTheme = {
    name: 'dark',
    styles: {
        normal: {
            fontSize: 16,
            fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
            color: '#e0e0e0',
            lineHeight: 1.75,
            margin: { top: 10, bottom: 10 }
        },
        title: {
            fontSize: 24,
            fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.5,
            margin: { top: 20, bottom: 20 }
        },
        subtitle: {
            fontSize: 20,
            fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
            color: '#ffffff',
            lineHeight: 1.5,
            margin: { top: 15, bottom: 15 }
        },
        quote: {
            fontSize: 16,
            fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
            color: '#b0b0b0',
            backgroundColor: '#2a2a2a',
            padding: { left: 15, right: 15, top: 10, bottom: 10 },
            margin: { top: 10, bottom: 10 }
        },
        code: {
            fontSize: 14,
            fontFamily: 'Consolas, Monaco, monospace',
            color: '#e0e0e0',
            backgroundColor: '#2a2a2a',
            padding: { left: 15, right: 15, top: 10, bottom: 10 },
            margin: { top: 10, bottom: 10 }
        },
        list: {
            fontSize: 16,
            fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
            color: '#e0e0e0',
            lineHeight: 1.75,
            margin: { top: 5, bottom: 5 }
        },
        image: {
            margin: { top: 10, bottom: 10 },
            maxWidth: '100%',
            borderRadius: 4
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            margin: { top: 10, bottom: 10 }
        },
        tableHeader: {
            backgroundColor: '#2a2a2a',
            fontWeight: 'bold',
            padding: { top: 8, right: 12, bottom: 8, left: 12 },
            border: '1px solid #444'
        },
        tableRow: {
            padding: { top: 8, right: 12, bottom: 8, left: 12 },
            border: '1px solid #444'
        }
    }
};
// 主题配置
export const themeConfig = {
    currentTheme: 'default',
    themes: {
        default: defaultTheme,
        dark: darkTheme
    }
};
//# sourceMappingURL=themes.js.map