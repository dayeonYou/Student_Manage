package com.example.StudentManage_Spring;

import java.util.List;

public interface TeacherService {
    Teacher addTeacher(Teacher teacher);
    Teacher updateTeacher(int id, Teacher teacher);
    Teacher getTeacher(int id);
    List<Teacher> getAllTeachers();
    void deleteTeacher(int id);
    void saveTeacher(Teacher teacher);
    List<CourseOffering> getCourseOfferingsByTeacherAndYearAndSemester(int teacherId, int year, String semester);

}
