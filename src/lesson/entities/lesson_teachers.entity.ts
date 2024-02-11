import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "lesson_teachers" })
export class LessonTeachers {
    @PrimaryGeneratedColumn()
    id: number
}