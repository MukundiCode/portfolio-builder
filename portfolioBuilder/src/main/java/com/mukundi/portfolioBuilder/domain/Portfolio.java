package com.mukundi.portfolioBuilder.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Portfolio {

  @Id
  @GeneratedValue
  private Long id;

  private String name;

  private String shortIntro;

  private String aboutMe;

  @JsonManagedReference
  @OneToMany(
          cascade = CascadeType.ALL,
          mappedBy = "portfolio")
  private Set<Experience> experienceList = new HashSet<>();

  @JsonManagedReference
  @OneToMany(
          cascade = CascadeType.ALL,
          mappedBy = "portfolio")
  private Set<Project> projectList = new HashSet<>();

  @JsonIgnore
  @OneToOne(mappedBy = "portfolio")
  private Person person;

  public void addExperience(Experience experience){
    experienceList.add(experience);
  }

  public void deleteExperience(Long id){
    experienceList = experienceList
            .stream()
            .filter(exp -> exp.getId().equals(id))
            .collect(Collectors.toSet());
  }

  public void addProject(Project project){
    projectList.add(project);
  }

}
