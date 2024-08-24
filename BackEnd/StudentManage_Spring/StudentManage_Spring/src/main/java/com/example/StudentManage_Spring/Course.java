// Course.java
package com.example.StudentManage_Spring;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "course_offering")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long offeringId;

    @Column(name = "subject_id",nullable = false)
    private Integer subjectId;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private String semester;

    private String dayOfWeek;

    private Integer startClassTime;

}
