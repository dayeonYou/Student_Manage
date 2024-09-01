package com.example.StudentManage_Spring;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.stream.Collectors;
@Getter
@Setter
public class StudentDTO {
    private int studentId;
    private String name;
    private String major;
    // 필요한 필드만 추가
    private Set<CourseOfferingDTO> courseOfferings;

    // Constructor, Getters, and Setters
    public StudentDTO(Student student) {
        this.studentId = student.getStudentId();
        this.name = student.getName();
        this.major = student.getMajor();
        this.courseOfferings = student.getCourseOfferings().stream()
                .map(CourseOfferingMapper::toDTO)
                .collect(Collectors.toSet());
    }
}
