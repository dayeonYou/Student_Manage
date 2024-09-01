package com.example.StudentManage_Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestParam int teacherId, @RequestParam String password, HttpSession session) {
        Teacher teacher = authService.authenticate(teacherId, password);

        if (teacher!= null) {
            session.setAttribute("teacher_id", teacher.getTeacherId());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("teacherId", teacher.getTeacherId());
            response.put("name", teacher.getName());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "Invalid credentials"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/loginSt")
    public ResponseEntity<Map<String, Object>> loginSt(@RequestParam int studentId, @RequestParam String password, HttpSession session) {
        Student student = authService.authenticate2(studentId, password);

        if (student != null) {
            session.setAttribute("student_id", student.getStudentId());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("studentId", student.getStudentId());
            response.put("name", student.getName());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "Invalid credentials"));
        }
    }


    @PostMapping("/teacher")
    public ResponseEntity<?> createTeacher(@RequestBody Teacher teacher) {
        if (teacher.getName() == null) {
            return ResponseEntity.badRequest().body("Teacher name cannot be null");
        }

        if (teacher.getPassword() != null) {
            String hashedPassword = passwordEncoder.encode(teacher.getPassword());
            teacher.setPassword(hashedPassword);
        }

        teacherService.saveTeacher(teacher);
        return ResponseEntity.ok("Teacher created successfully");
    }

    @PostMapping("/student")
    public ResponseEntity<?> createStudent(@RequestBody Student student) {
        if (student.getName() == null) {
            return ResponseEntity.badRequest().body("Student name cannot be null");
        }

        if (student.getPassword() != null) {
            String hashedPassword = passwordEncoder.encode(student.getPassword());
            student.setPassword(hashedPassword);
        }

        studentService.saveStudent(student);
        return ResponseEntity.ok("student created successfully");
    }
    @PostMapping("/changePassword")
    public ResponseEntity<Map<String, Object>> changePassword(
            @RequestParam int studentId,
            @RequestParam String currentPassword,
            @RequestParam String newPassword) {

        boolean isPasswordChanged = authService.changePassword(studentId, currentPassword, newPassword);

        if (isPasswordChanged) {
            return ResponseEntity.ok(Collections.singletonMap("message", "Password changed successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "Invalid current password"));
        }
    }

}
