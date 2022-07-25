package com.example.demo.student;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @PostMapping // restful endpoint annotation (POST)
    public void registerNewStudent(@RequestBody Student student) { // map request JSON into Student instance
        studentService.addNewStudent(student);
    }

    @DeleteMapping(path = "{studentId}") // restful endpoint annotation (DELETE)
    public void deleteStudent(@PathVariable("studentId") Long studentId) {
        studentService.removeStudent(studentId);
    }

    @PutMapping(path = "{studentId}") // restful endpoint annotation (PUT)
    public void updateStudent(@PathVariable("studentId") Long studentId, @RequestParam(required = false) String name,
            @RequestParam(required = false) String email) {
        studentService.updateStudent(studentId, name, email);
    }
}
