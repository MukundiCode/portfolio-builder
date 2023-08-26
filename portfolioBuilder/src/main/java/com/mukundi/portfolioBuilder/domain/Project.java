package com.mukundi.portfolioBuilder.domain;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Project {

  private String title;

  private String description;

  private List<String> skills;

  public static List<Project> getDemoList() {
    List<Project> projects = new ArrayList<>();
    projects.add(new Project(
            "Some title",
            "Some description",
            List.of("Java", "Spring Boot", "Typescript", "kotlin")));
    projects.add(new Project(
            "Some title",
            "Some description",
            List.of("Java", "Spring Boot", "Typescript", "kotlin")));
    projects.add(new Project(
            "Some title",
            "Some description",
            List.of("Java", "Spring Boot", "Typescript", "kotlin")));

    return projects;
  }
}
