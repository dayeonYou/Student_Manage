package com.example.StudentManage_Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseOfferingRepository courseOfferingRepository; // 수정된 이름

    @Autowired
    private SubjectRepository subjectRepository;

    public List<CourseDTO> getCoursesByYearAndSemester(Integer year, String semester) {
        List<CourseOffering> courseOfferings = courseOfferingRepository.findByYearAndSemester(year, semester);

        return courseOfferings.stream().map(courseOffering -> {
            Subject subject = courseOffering.getSubject();
            String subjectName = (subject != null) ? subject.getSubjectName() : "N/A";
            String teacherName = (subject != null && subject.getTeacher() != null) ? subject.getTeacher().getName() : "N/A";

            return new CourseDTO(subjectName, subject.getSubjectId(), teacherName, courseOffering.getDayOfWeek(), courseOffering.getStartClassTime());
        }).collect(Collectors.toList());
    }
}
