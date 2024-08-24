package com.example.StudentManage_Spring;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    // 필요한 경우 추가적인 쿼리 메서드를 정의할 수 있습니다.
}
