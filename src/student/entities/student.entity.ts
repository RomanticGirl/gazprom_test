import { Lesson } from "src/lesson/entities/lesson.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "students" })
export class Student {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string

    @ManyToMany(() => Lesson, (lesson) => lesson.id)
    lessons: Lesson[]
}