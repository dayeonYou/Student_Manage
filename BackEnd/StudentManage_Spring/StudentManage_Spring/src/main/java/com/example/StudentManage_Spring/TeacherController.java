package com.example.StudentManage_Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/teachers")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @PostMapping
    public ResponseEntity<Teacher> addTeacher(@RequestBody Teacher teacher) {
        return new ResponseEntity<>(teacherService.addTeacher(teacher), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Teacher> updateStudent(@PathVariable int id, @RequestBody Teacher teacher) {
        return new ResponseEntity<>(teacherService.updateTeacher(id, teacher), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teacher> getStudent(@PathVariable int id) {
        return new ResponseEntity<>(teacherService.getTeacher(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Teacher>> getAllStudents() {
        return new ResponseEntity<>(teacherService.getAllTeachers(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable int id) {
        teacherService.deleteTeacher(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}/course-offerings")
    public ResponseEntity<List<CourseOfferingDTO>> getCourseOfferings(
            @PathVariable int id,
            @RequestParam int year,
            @RequestParam String semester) {
        List<CourseOffering> courseOfferings = teacherService.getCourseOfferingsByTeacherAndYearAndSemester(id, year, semester);
        List<CourseOfferingDTO> dtos = courseOfferings.stream()
                .map(CourseOfferingMapper::toDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}
