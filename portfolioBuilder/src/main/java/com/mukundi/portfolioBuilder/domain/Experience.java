package com.mukundi.portfolioBuilder.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Experience {

  private String position;

  private String company;

  private String description;

  private LocalDate from;

  private LocalDate to;

  private List<String> skills;

  public static List<Experience> getDemoList() {
    return List.of(
            new Experience("Software Developer",
                    "Some Company",
                    "Some description",
                    LocalDate.now(),
                    LocalDate.now(),
                    List.of("Java", "Spring Boot", "Typescript", "kotlin")),
            new Experience("Software Developer",
                    "Some Company",
                    "Some description",
                    LocalDate.now(),
                    LocalDate.now(),
                    List.of("Java", "Spring Boot", "Typescript", "kotlin")),
            new Experience("Software Developer",
                    "Some Company",
                    "Some description",
                    LocalDate.now(),
                    LocalDate.now(),
                    List.of("Java", "Spring Boot", "Typescript", "kotlin"))
    );
  }
}
