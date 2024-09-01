package com.example.StudentManage_Spring;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseDTO {

    private String subjectName;
    private Integer subjectId;
    private String teacherName;
    private String dayOfWeek;
    private Integer startClassTime;

    public CourseDTO(String subjectName, Integer subjectId, String teacherName, String dayOfWeek, Integer startClassTime) {
        this.subjectName = subjectName;
        this.subjectId = subjectId;
        this.teacherName = teacherName;
        this.dayOfWeek = dayOfWeek;
        this.startClassTime = startClassTime;
    }
}
