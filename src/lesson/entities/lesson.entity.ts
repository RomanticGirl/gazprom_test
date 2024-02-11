import { Student } from "src/student/entities/student.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "lessons" })
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    date: Date  // Дата занятия 
    @Column()
    title: string  // Тема занятия 
    @Column({ default: false })
    status: boolean // Статус занятия 

    @ManyToMany(() => Student, (student) => student.lessons)
    @JoinTable({
        name: "lesson_students",
        joinColumn: {
            name: "lesson_id",
            referencedColumnName: "id",
            foreignKeyConstraintName: "lesson_students_lesson_id"
        },
        inverseJoinColumn: {
            name: "students_id",
            referencedColumnName: "id",
            foreignKeyConstraintName: "lesson_students_students_id"
        },
    })
    students: Student[]

    @ManyToMany(() => Teacher, (teacher) => teacher.lessons)
    @JoinTable({
        name: "lesson_teachers",
        joinColumn: {
            name: "lesson_id",
            referencedColumnName: "id",
            foreignKeyConstraintName: "lesson_teachers_lesson_id"
        },
        inverseJoinColumn: {
            name: "teacher_id",
            referencedColumnName: "id",
            foreignKeyConstraintName: "lesson_teachers_teacher_id"
        },
    })
    teachers: Teacher[]
}


