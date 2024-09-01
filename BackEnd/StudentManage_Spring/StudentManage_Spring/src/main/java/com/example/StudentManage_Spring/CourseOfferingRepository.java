package com.example.StudentManage_Spring;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseOfferingRepository extends JpaRepository<CourseOffering, Long> {

    @Query("SELECT co FROM CourseOffering co WHERE co.subject.teacher.teacherId = :teacherId AND co.year = :year AND co.semester = :semester")
    List<CourseOffering> findCourseOfferingsByTeacherAndYearAndSemester(
            @Param("teacherId") int teacherId,
            @Param("year") int year,
            @Param("semester") String semester
    );
    List<CourseOffering> findByYearAndSemester(Integer year, String semester);
}
