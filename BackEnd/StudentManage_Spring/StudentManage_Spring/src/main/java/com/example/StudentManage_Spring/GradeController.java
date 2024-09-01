package com.example.StudentManage_Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/grades")
public class GradeController {

    @Autowired
    private GradeService gradeService;
    @Autowired
    private SubjectService subjectService;

    @Autowired
    private StudentService studentService;

    @PostMapping("/grades")
    public ResponseEntity<Map<String, Object>> addGrades(@RequestBody GradeBatchRequest gradeBatchRequest) {
        List<GradeRequest> gradeRequests = gradeBatchRequest.getGrades();
        Map<String, Object> response = new HashMap<>();

        if (gradeRequests == null || gradeRequests.isEmpty()) {
            response.put("message", "Grade list is empty.");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        for (GradeRequest gradeRequest : gradeRequests) {
            if (gradeRequest == null || gradeRequest.getStudentId() <= 0) {
                response.put("message", "Invalid grade or student data.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            // Retrieve student and subject details based on IDs
            Student student = studentService.findStudentById(gradeRequest.getStudentId());
            Subject subject = subjectService.findSubjectById(gradeBatchRequest.getCourse_id());

            if (student == null || subject == null) {
                response.put("message", "Invalid student or subject ID.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            // Create new Grade object
            Grade grade = new Grade();
            grade.setStudent(student);
            grade.setSubject(subject);
            grade.setScore(gradeRequest.getScore());
            grade.setSemester(gradeBatchRequest.getSemester());
            grade.setYear(gradeBatchRequest.getYear());

            // Save the grade
            gradeService.addGrade(grade);
        }

        response.put("message", "Grades successfully recorded!");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
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
