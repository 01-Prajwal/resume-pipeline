export declare class PdfParserService {
    parse(filePath: string): Promise<{
        text: string;
        pages: number;
    }>;
}
