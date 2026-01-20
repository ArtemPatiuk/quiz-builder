import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizzesService {
	constructor(private readonly prismaService: PrismaService) { }


	async findOne(id: string) {
		return await this.prismaService.quiz.findUnique({
			where: { id },
			include: { questions: true },
		});
	}

	async create(dto: CreateQuizDto) {
		if (!dto.questions || dto.questions.length === 0) {
			throw new BadRequestException('Quiz must contain at least one question');
		}
		for (const question of dto.questions) {
			if (question.type === 'CHECKBOX' && (!question.options || question.options.length < 2)) {
				throw new BadRequestException('Checkbox question must have at least 2 options',);
			}
		}
		return this.prismaService.quiz.create({
			data: {
				title: dto.title,
				questions: {
					create: dto.questions.map((q) => ({
						text: q.text,
						type: q.type,
						options: q.options ? JSON.stringify(q.options) : null,
					})),
				},
			},
			include: { questions: true },
		});
	}

	async getAll() {
		return this.prismaService.quiz.findMany({
			orderBy: { createdAt: 'desc' },
			select: {
				id: true,
				title: true,
				_count: {
					select: { questions: true }
				}
			}
		});
	}

	async delete(id: string) {
		return this.prismaService.quiz.delete({
			where: { id },
			select: { id: true, title: true },
		});
	}

}
