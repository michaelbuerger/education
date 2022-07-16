package com.example.demo.student;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // make this class able to serve rest endpoints
@RequestMapping(path = "api/v1/student") // localhost/api/v1/student
public class StudentController { // student controller, resources for API

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        // this.studentService = new StudentService(); // avoid this
        // use dependency injection as much as possible
        this.studentService = studentService;
    }

    @GetMapping // restful endpoint annotation (GET)
    public List<Student> getStudents() {
        return studentService.getStudents();
    }
}
