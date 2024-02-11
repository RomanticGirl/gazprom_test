import { Lesson } from "src/lesson/entities/lesson.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "teachers"})
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string

    @ManyToMany(() => Lesson, (lesson) => lesson.teachers)
    lessons: Lesson[]
}