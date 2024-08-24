package com.example.StudentManage_Spring;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Integer> {
    // 학생 ID로 Grade 목록을 조회하는 메서드
    List<Grade> findByStudentStudentId(int studentId);

    // 학생 ID, 학기 및 연도로 Grade 목록을 조회하는 메서드
    List<Grade> findByStudentStudentIdAndSemesterAndYear(int studentId, String semester, int year);
}
