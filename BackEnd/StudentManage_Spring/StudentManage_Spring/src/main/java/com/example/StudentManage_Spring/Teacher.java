package com.example.StudentManage_Spring;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "Teacher")  // 테이블 이름 명시
public class Teacher {

    // Getters and Setters
    @Id
    private int teacherId;

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
    private String department;

    @Column
    private String email;

    @Column(nullable = false)
    private String password;

    // 기본 생성자
    public Teacher() {}

    // 매개변수 있는 생성자
    public Teacher(int teacherId, String name, Date birthDate, String gender, String address, String phoneNumber, String department, String email) {
        this.teacherId = teacherId;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.department = department;
        this.email = email;
    }

}
