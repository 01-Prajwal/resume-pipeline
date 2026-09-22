import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import type { Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service.js';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

@Injectable()
export class ResumesService {
    constructor(
        private readonly prisma: PrismaService,
        @InjectQueue('resume-processing') private readonly queue: Queue,
    ) {}

    async create(file: Express.Multer.File) {
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

        // Hand off to the worker. Only a pointer travels through Redis.
        await this.queue.add(
            'process-resume',
            { resumeId: resume.id },
            { jobId: resume.id },
        );

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

    async findOne(id: string) {
        const resume = await this.prisma.resume.findUnique({
            where: { id },
        });
        if (!resume) {
            throw new NotFoundException(`Resume ${id} not found`);
        }
        return resume;
    }
}