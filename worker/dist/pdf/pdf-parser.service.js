var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { extractText, getDocumentProxy } from 'unpdf';
let PdfParserService = class PdfParserService {
    async parse(filePath) {
        const buffer = await readFile(filePath);
        const pdf = await getDocumentProxy(new Uint8Array(buffer));
        const { text, totalPages } = await extractText(pdf, { mergePages: true });
        return { text: text.trim(), pages: totalPages };
    }
};
PdfParserService = __decorate([
    Injectable()
], PdfParserService);
export { PdfParserService };
//# sourceMappingURL=pdf-parser.service.js.map