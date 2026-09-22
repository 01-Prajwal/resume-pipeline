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
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { PrismaService } from '../prisma/prisma.service.js';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
let ResumesService = class ResumesService {
    prisma;
    queue;
    constructor(prisma, queue) {
        this.prisma = prisma;
        this.queue = queue;
    }
    async create(file) {
        if (file.buffer.subarray(0, 4).toString() !== '%PDF') {
            throw new BadRequestException('Send a PDF! ');
        }
        const uploadDir = path.resolve(process.cwd(), process.env.UPLOAD_DIR ?? '../uploads');
        await mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, `random-${randomUUID()}.pdf`);
        await writeFile(filePath, file.buffer);
        const resume = await this.prisma.resume.create({
            data: {
                originalName: file.originalname,
                filePath,
                sizeBytes: file.size,
            },
        });
        await this.queue.add('process-resume', { resumeId: resume.id }, { jobId: resume.id });
        return { id: resume.id, status: resume.status };
    }
    findAll() {
        return this.prisma.resume.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                originalName: true,
                status: true,
                attempts: true,
                error: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async findOne(id) {
        const resume = await this.prisma.resume.findUnique({
            where: { id },
        });
        if (!resume) {
            throw new NotFoundException(`Resume ${id} not found`);
        }
        return resume;
    }
};
ResumesService = __decorate([
    Injectable(),
    __param(1, InjectQueue('resume-processing')),
    __metadata("design:paramtypes", [PrismaService, Function])
], ResumesService);
export { ResumesService };
//# sourceMappingURL=resumes.service.js.map