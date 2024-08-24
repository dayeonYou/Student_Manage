package com.example.StudentManage_Spring;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "Student")
public class Student {

    @Id
    private int studentId;

    @Column(nullable = false)
    private String name;

    @Column
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Column(length = 10)
    private String gender;

    @Column(length = 255)
    private String address;

    @Column(length = 20)
    private String phoneNumber;

    @Column
    private int studentGrade;

    @Column(length = 100)
    private String major;

    // 기본 생성자
    public Student() {}

    // 매개변수 있는 생성자
    public Student(int studentId, String name, Date birthDate, String gender, String address, String phoneNumber, int studentGrade, String major) {
        this.studentId = studentId;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.studentGrade = studentGrade;
        this.major = major;
    }
}
