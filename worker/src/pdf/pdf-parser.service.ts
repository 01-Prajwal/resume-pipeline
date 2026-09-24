import { Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { extractText, getDocumentProxy } from 'unpdf';

@Injectable()
export class PdfParserService {
  async parse(filePath: string): Promise<{ text: string; pages: number }> {
   const buffer = await readFile(filePath);
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text, totalPages } = await extractText(pdf, { mergePages: true });
 return { text: text.trim(), pages: totalPages };
  }
}