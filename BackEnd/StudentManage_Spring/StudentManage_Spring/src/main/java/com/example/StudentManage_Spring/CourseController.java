// CourseController.java
package com.example.StudentManage_Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<CourseDTO> getCourses(
            @RequestParam Integer year,
            @RequestParam String semester) {
        return courseService.getCoursesByYearAndSemester(year, semester);
    }
}
