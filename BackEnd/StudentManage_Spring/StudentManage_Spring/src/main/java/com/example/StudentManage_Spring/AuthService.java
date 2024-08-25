package com.example.StudentManage_Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private StudentRepository studentRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void createTeacherWithPassword(int teacherId, String rawPassword) {
        String encodedPassword = passwordEncoder.encode(rawPassword);
        Teacher teacher = teacherRepository.findById(teacherId).orElse(null);
        if (teacher != null) {
            teacher.setPassword(encodedPassword);
            teacherRepository.save(teacher);
        }
    }

    public Teacher authenticate(int teacherId, String password) {
        Teacher teacher = teacherRepository.findById(teacherId).orElse(null);
        if (teacher != null && passwordEncoder.matches(password, teacher.getPassword())) {
            return teacher;
        }
        return null;
    }

    public Student authenticate2(int studentId, String password) {
        Student student = studentRepository.findById(studentId).orElse(null);
        if (student != null && passwordEncoder.matches(password, student.getPassword())) {
            return student;
        }
        return null;
    }
}
