package com.example.StudentManage_Spring;


public class CourseOfferingMapper {

    public static CourseOfferingDTO toDTO(CourseOffering courseOffering) {
        CourseOfferingDTO dto = new CourseOfferingDTO();
        dto.setOfferingId(courseOffering.getOfferingId());
        dto.setYear(courseOffering.getYear());
        dto.setSemester(courseOffering.getSemester());
        dto.setDayOfWeek(courseOffering.getDayOfWeek());
        dto.setStartClassTime(courseOffering.getStartClassTime());
        if (courseOffering.getSubject() != null) {
            SubjectDTO subjectDTO = new SubjectDTO();
            subjectDTO.setSubjectId(courseOffering.getSubject().getSubjectId());
            subjectDTO.setSubjectName(courseOffering.getSubject().getSubjectName());
            dto.setSubject(subjectDTO);
        }
        return dto;
    }
}
