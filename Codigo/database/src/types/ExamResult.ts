import { ValueTransformer } from 'typeorm';

export interface ExamResult {
	date: Date;
	value: string;
}

export class ExamResultArrayTransformer implements ValueTransformer {
  to(value: ExamResult[] | null): string {
    return value ? JSON.stringify(value) : null;
  }

  from(value: string): ExamResult[] {
    return value ? JSON.parse(value) : [];
  }
}