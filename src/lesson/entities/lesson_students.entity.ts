import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "lesson_students" })
export class LessonStudents {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    visit: boolean // посетил ученик занятие, или нет
}