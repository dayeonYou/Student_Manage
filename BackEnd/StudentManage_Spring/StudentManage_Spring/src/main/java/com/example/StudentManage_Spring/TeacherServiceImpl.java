package com.example.StudentManage_Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private CourseOfferingRepository courseOfferingRepository;


    @Override
    public Teacher addTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @Override
    public Teacher updateTeacher(int id, Teacher teacher) {
        Teacher existingTeacher = teacherRepository.findById(id).orElseThrow(() -> new RuntimeException("Teacher not found"));
        existingTeacher.setName(teacher.getName());
        existingTeacher.setBirthDate(teacher.getBirthDate());
        existingTeacher.setGender(teacher.getGender());
        existingTeacher.setAddress(teacher.getAddress());
        existingTeacher.setPhoneNumber(teacher.getPhoneNumber());
        existingTeacher.setDepartment(teacher.getDepartment());
        existingTeacher.setEmail(teacher.getEmail());
        return teacherRepository.save(existingTeacher);
    }

    @Override
    public Teacher getTeacher(int id) {
        return teacherRepository.findById(id).orElseThrow(() -> new RuntimeException("teacher not found"));
    }

    @Override
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    public void deleteTeacher(int id) {
        teacherRepository.deleteById(id);
    }

    @Override
    public void saveTeacher(Teacher teacher) {
        teacherRepository.save(teacher);
    }


    @Override
    public List<CourseOffering> getCourseOfferingsByTeacherAndYearAndSemester(int teacherId, int year, String semester) {
        return courseOfferingRepository.findCourseOfferingsByTeacherAndYearAndSemester(teacherId, year, semester);
    }
}
