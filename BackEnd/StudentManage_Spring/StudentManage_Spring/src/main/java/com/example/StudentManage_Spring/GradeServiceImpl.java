package com.example.StudentManage_Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeServiceImpl implements GradeService {

    @Autowired
    private GradeRepository gradeRepository;
    @Override
    public Grade addGrade(Grade grade) {
        return gradeRepository.save(grade);
    }

    @Override
    public Grade updateGrade(int id, Grade grade) {
        // 기존 grade 객체를 찾기
        Grade existingGrade = gradeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grade not found"));

        // 기존 객체의 필드를 업데이트
        existingGrade.setStudent(grade.getStudent());
        existingGrade.setSubject(grade.getSubject());
        existingGrade.setScore(grade.getScore());
        existingGrade.setSemester(grade.getSemester());
        existingGrade.setYear(grade.getYear());
        existingGrade.setSection(grade.getSection());

        // 업데이트된 객체를 저장
        return gradeRepository.save(existingGrade);
    }

    @Override
    public Grade getGrade(int id) {
        return gradeRepository.findById(id).orElseThrow(() -> new RuntimeException("Grade not found"));
    }

    @Override
    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    @Override
    public void deleteGrade(int id) {
        gradeRepository.deleteById(id);
    }
    @Override
    public List<Grade> getGradesByStudent(int studentId) {
        return gradeRepository.findByStudentStudentId(studentId);
    }
    @Override
    public List<Grade> getGradesByStudentSemesterYear(int studentId, String semester, int year) {
        return gradeRepository.findByStudentStudentIdAndSemesterAndYear(studentId, semester, year);
    }
}
