import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateQuizDto {
	@IsString()
	title: string;

	@IsArray()
	questions: CreateQuestionDto[];
}

export class CreateQuestionDto {
	@IsString()
	text: string;

	@IsIn(['BOOLEAN', 'INPUT', 'CHECKBOX'])
	type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	options?: string[];
}
