package com.example.demo.student;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import org.springframework.stereotype.Service;

@Service // make this a Spring bean
public class StudentService {
    public List<Student> getStudents() {
        return List.of(
                new Student(1L, "Michael", "michaelbuergerart@gmail.com",
                        LocalDate.of(2003, Month.SEPTEMBER, 25), 18));
    }

}
