package com.example.StudentManage_Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Student updateStudent(int id, Student student) {
        Student existingStudent = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
        existingStudent.setName(student.getName());
        existingStudent.setBirthDate(student.getBirthDate());
        existingStudent.setGender(student.getGender());
        existingStudent.setAddress(student.getAddress());
        existingStudent.setPhoneNumber(student.getPhoneNumber());
        existingStudent.setStudentGrade(student.getStudentGrade());
        return studentRepository.save(existingStudent);
    }

    @Override
    public Student getStudent(int id) {
        return studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public void deleteStudent(int id) {
        studentRepository.deleteById(id);
    }
}
