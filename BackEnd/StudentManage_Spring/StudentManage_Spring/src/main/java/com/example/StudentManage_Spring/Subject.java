package com.example.StudentManage_Spring;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "subject")
public class Subject {

    @Id
    @Column(name = "subject_id")
    private int subjectId;

    @Column(name = "subject_name")
    private String subjectName;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @OneToMany(mappedBy = "subject")
    @JsonIgnore
    private List<CourseOffering> courseOfferings;
}
