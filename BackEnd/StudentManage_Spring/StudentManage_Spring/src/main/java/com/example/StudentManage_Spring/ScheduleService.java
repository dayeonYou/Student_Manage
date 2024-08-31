package com.example.StudentManage_Spring;

import java.util.List;

public interface ScheduleService {
    List<Schedule> getSchedules(Integer year, String semester);
}
