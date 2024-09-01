package com.example.StudentManage_Spring;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    List<Student> findByCourseOfferings_OfferingId(Long offeringId);

}
