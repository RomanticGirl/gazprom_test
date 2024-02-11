export class CreateLessonDto {
    teacherIds: number[]; 
    title: string; 
    days: number[]; 
    firstDate: Date; 
    lessonsCount?: number; 
    lastDate?: Date; 
}
