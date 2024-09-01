package com.example.StudentManage_Spring;
import java.util.List;

public interface GradeService {
    Grade addGrade(Grade grade);
    Grade updateGrade(int id, Grade grade);
    Grade getGrade(int id);
    List<Grade> getAllGrades();
    void deleteGrade(int id);
    List<Grade> getGradesByStudent(int studentId);
    List<Grade> getGradesByStudentSemesterYear(int studentId, String semester, int year);
}

