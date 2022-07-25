package com.example.demo.student;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import com.example.demo.student.exception.BadRequestException;
import com.example.demo.student.exception.StudentNotFoundException;

@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll(); // does some magic sql (JpaRepository interface method)
    }

    public void addStudent(Student student) {
        if (studentRepository.userExistsFromEmail(student.getEmail()))
            throw new BadRequestException("Student with email '" + student.getEmail() + "' already exists");
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentID) {
        if (!studentRepository.existsById(studentID))
            throw new StudentNotFoundException(
                    "Cannot delete student with ID '" + studentID + "' as they do not exist");
        studentRepository.deleteById(studentID);
    }
}
