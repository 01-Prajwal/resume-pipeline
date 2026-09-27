var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { BadRequestException, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, Sse, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { from, map, merge, filter } from 'rxjs';
import { ResumesService } from './resumes.service.js';
import { ResumeEventsService } from './resume-events.service.js';
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
let ResumesController = class ResumesController {
    resumesService;
    resumeEvents;
    constructor(resumesService, resumeEvents) {
        this.resumesService = resumesService;
        this.resumeEvents = resumeEvents;
    }
    upload(file) {
        if (!file) {
            throw new BadRequestException('Send a PDF in the "file" form field');
        }
        return this.resumesService.create(file);
    }
    findAll() {
        return this.resumesService.findAll();
    }
    events(id) {
        const current$ = from(this.resumesService.findOne(id)).pipe(map((resume) => ({
            resumeId: resume.id,
            status: resume.status,
            attempts: resume.attempts,
            error: resume.error,
        })));
        const updates$ = this.resumeEvents
            .stream()
            .pipe(filter((event) => event.resumeId === id));
        return merge(current$, updates$).pipe(map((data) => ({ data })));
    }
    findOne(id) {
        return this.resumesService.findOne(id);
    }
};
__decorate([
    Post(),
    HttpCode(202),
    UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage(),
        limits: { fileSize: MAX_UPLOAD_BYTES, files: 1 },
    })),
    __param(0, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResumesController.prototype, "upload", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResumesController.prototype, "findAll", null);
__decorate([
    Sse(':id/events'),
    __param(0, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Function)
], ResumesController.prototype, "events", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResumesController.prototype, "findOne", null);
ResumesController = __decorate([
    Controller('resumes'),
    __metadata("design:paramtypes", [ResumesService,
        ResumeEventsService])
], ResumesController);
export { ResumesController };
//# sourceMappingURL=resumes.controller.js.map