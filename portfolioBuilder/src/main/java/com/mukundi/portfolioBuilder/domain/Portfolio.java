package com.mukundi.portfolioBuilder.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.*;

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

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String shortIntro;

  @Column(nullable = false)
  private String aboutMe;

  @JsonManagedReference
  @OneToMany(
          cascade = CascadeType.ALL,
          mappedBy = "portfolio")
  private Set<Experience> experienceList;

  @JsonManagedReference
  @OneToMany(
          cascade = CascadeType.ALL,
          mappedBy = "portfolio")
  private Set<Project> projectList;

  public void addExperience(Experience experience){
    experienceList.add(experience);
  }

  public void addProject(Project project){
    projectList.add(project);
  }

}
