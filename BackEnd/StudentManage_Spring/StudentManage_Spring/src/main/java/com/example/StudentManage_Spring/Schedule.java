package com.example.StudentManage_Spring;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "schedule")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer scheduleId;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    @Column(name = "subject_id", nullable = false)
    private Integer subjectId;

    @Column(name = "subject_name", nullable = false)
    private String subjectName;

    @Column(name = "day_of_week")
    private String dayOfWeek;

    @Column(name = "subject_time")
    private String subjectTime;

    @Column(name = "classroom")
    private String classroom;

    @Column(name = "semester")
    private String semester;

    @Column(name = "year")
    private Integer year;
}