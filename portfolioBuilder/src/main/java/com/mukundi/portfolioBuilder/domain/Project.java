package com.mukundi.portfolioBuilder.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Project {

  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String description;

  @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
  @CollectionTable(name = "project_skills", joinColumns = @JoinColumn(name = "project_id"))
  @Column(name = "project_skills", nullable = false)
  private List<String> skills;

  @ManyToOne
  @JoinColumn(name = "portfolio_id")
  private Portfolio portfolio;

}
