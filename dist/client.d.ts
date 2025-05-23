import { FormatResult } from './types';
interface ClientConfig {
    serverUrl: string;
    theme?: string;
}
export declare class MPEditorClient {
    private config;
    constructor(config: ClientConfig);
    formatContent(content: string): Promise<FormatResult>;
    previewContent(content: string): Promise<FormatResult>;
    setTheme(theme: string): void;
}
export {};
