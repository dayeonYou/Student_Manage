package com.example.StudentManage_Spring;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseOfferingDTO {

    private Long offeringId;
    private int year;
    private String semester;
    private String dayOfWeek;
    private int startClassTime;
    private SubjectDTO subject; // SubjectDTO를 사용하여 필드 제한

    // Constructor, Getters, and Setters
}
