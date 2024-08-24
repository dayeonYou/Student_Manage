// CourseRepository.java
package com.example.StudentManage_Spring;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByYearAndSemester(Integer year, String semester);
}

