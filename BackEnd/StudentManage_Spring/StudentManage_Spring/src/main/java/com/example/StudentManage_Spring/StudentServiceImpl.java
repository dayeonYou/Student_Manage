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

    @Override
    public void saveStudent(Student student) {
        studentRepository.save(student);
    }
    @Override
    public Student updateStudentField(int id, String fieldName, String newValue) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        switch (fieldName) {
            case "name":
                existingStudent.setName(newValue);
                break;
            case "gender":
                existingStudent.setGender(newValue);
                break;
            case "address":
                existingStudent.setAddress(newValue);
                break;
            case "phoneNumber":
                existingStudent.setPhoneNumber(newValue);
                break;
            case "password":
                existingStudent.setPassword(newValue);
                break;
            default:
                throw new IllegalArgumentException("Invalid field name: " + fieldName);
        }

        return studentRepository.save(existingStudent);
    }
    // 특정 강의를 듣는 학생들의 리스트를 반환하는 메서드
    public List<Student> getStudentsByCourseOffering(Long offeringId) {
        return studentRepository.findByCourseOfferings_OfferingId(offeringId);
    }
    public Student findStudentById(int id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

}
