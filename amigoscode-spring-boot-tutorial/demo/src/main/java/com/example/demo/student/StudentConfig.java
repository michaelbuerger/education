package com.example.demo.student;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StudentConfig {
    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return args -> { // return lambda function
            Student michael = new Student("Michael", "michaelbuergerart@gmail.com",
                    LocalDate.of(2003, Month.SEPTEMBER, 25));

            Student alex = new Student("Alex", "alex@gmail.com",
                    LocalDate.of(2002, Month.FEBRUARY, 12));

            repository.saveAll(List.of(michael, alex));
        };
    }
}
