// CourseService.java
package com.example.StudentManage_Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    public List<CourseDTO> getCoursesByYearAndSemester(Integer year, String semester) {
        List<Course> courses = courseRepository.findByYearAndSemester(year, semester);

        return courses.stream().map(course -> {
            Subject subject = subjectRepository.findById(course.getSubjectId()).orElse(null);
            String subjectName = (subject != null) ? subject.getSubjectName() : "N/A";
            String teacherName = (subject != null && subject.getTeacher() != null) ? subject.getTeacher().getName() : "N/A";

            return new CourseDTO(subjectName, course.getSubjectId(), teacherName, course.getDayOfWeek(), course.getStartClassTime());
        }).collect(Collectors.toList());
    }
}
