package com.example.StudentManage_Spring;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class GradeBatchRequest {
    private String semester;
    private int year;
    private int course_id;
    private List<GradeRequest> grades;

    // Getters and setters
}

