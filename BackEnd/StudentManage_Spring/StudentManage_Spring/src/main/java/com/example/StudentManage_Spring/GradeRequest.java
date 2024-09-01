package com.example.StudentManage_Spring;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class GradeRequest {
    private int studentId;
    private BigDecimal score;
}
