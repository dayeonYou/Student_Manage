package com.example.StudentManage_Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grades")
public class GradeController {
    @Autowired
    private GradeService gradeService;

    @PostMapping
    public ResponseEntity<Grade> addGrade(@RequestBody Grade grade) {
        return new ResponseEntity<>(gradeService.addGrade(grade), HttpStatus.CREATED);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Grade>> getGradesByStudent(@PathVariable int studentId) {
        return new ResponseEntity<>(gradeService.getGradesByStudent(studentId), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Grade> updateGrade(@PathVariable int id, @RequestBody Grade grade) {
        return new ResponseEntity<>(gradeService.updateGrade(id, grade), HttpStatus.OK);
    }
    @GetMapping("/student/{studentId}/semester/{semester}/year/{year}")
    public ResponseEntity<List<Grade>> getGrades(
            @PathVariable int studentId,
            @PathVariable String semester,
            @PathVariable int year) {

        List<Grade> grades = gradeService.getGradesByStudentSemesterYear(studentId, semester, year);
        return ResponseEntity.ok(grades);
    }
}
