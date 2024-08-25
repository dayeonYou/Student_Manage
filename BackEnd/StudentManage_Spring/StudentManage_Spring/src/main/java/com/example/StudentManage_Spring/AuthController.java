package com.example.StudentManage_Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

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
    public ResponseEntity<String> login(@RequestParam int teacherId, @RequestParam String password, HttpSession session) {
        Teacher teacher = authService.authenticate(teacherId, password);

        if (teacher != null) {
            session.setAttribute("teacher_id", teacher.getTeacherId());
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
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
}
