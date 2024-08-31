package com.example.StudentManage_Spring;

import java.util.List;

public interface StudentService {
    Student addStudent(Student student);
    Student updateStudent(int id, Student student);
    Student getStudent(int id);
    List<Student> getAllStudents();
    void deleteStudent(int id);
    void saveStudent(Student student);
    Student updateStudentField(int id, String fieldName, String newValue);

}
