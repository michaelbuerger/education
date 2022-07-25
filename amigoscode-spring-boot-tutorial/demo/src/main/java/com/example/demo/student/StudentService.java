package com.example.demo.student;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // make this a Spring bean
public class StudentService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    public void addNewStudent(Student student) {
        if (studentRepository.findStudentByEmail(student.getEmail()).isPresent())
            throw new IllegalStateException("Email taken!");

        studentRepository.save(student);
    }

    public void removeStudent(Long studentId) {
        if (!studentRepository.existsById(studentId))
            throw new IllegalStateException("Attempted to delete non-existent student!");

        studentRepository.deleteById(studentId);
    }

    @Transactional // makes it so update of entity (Student student) links changes to database
    public void updateStudent(Long studentId, String name, String email) {
        // unwrap optional or throw exception
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalStateException("Attempted to update non-existent student!"));

        if (name != null && name.length() > 0 && !student.getName().equals(name)) {
            student.setName(name);
        }
        if (email != null && email.length() > 0 && !student.getEmail().equals(email)) {
            // make sure new email isn't taken
            if (studentRepository.findStudentByEmail(email).isPresent()) {
                throw new IllegalStateException("Email is taken!");
            } else {
                student.setEmail(email);
            }
        }
    }

}
