package com.mukundi.portfolioBuilder.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project {

  private String title;

  private String description;

  private List<String> skills;

  public static List<Project> getDemoList() {
    return List.of(
            new Project(
                    "Some title",
                    "Some description",
                    List.of("Java", "Spring Boot", "Typescript", "kotlin")),
            new Project(
                    "Some title",
                    "Some description",
                    List.of("Java", "Spring Boot", "Typescript", "kotlin")),
            new Project(
                    "Some title",
                    "Some description",
                    List.of("Java", "Spring Boot", "Typescript", "kotlin"))
    );
  }
}
