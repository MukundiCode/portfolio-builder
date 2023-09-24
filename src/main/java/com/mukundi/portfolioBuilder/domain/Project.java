package com.mukundi.portfolioBuilder.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.*;

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
  @NotBlank
  private String title;

  @Column(nullable = false)
  @NotBlank
  @Lob
  private String description;

  @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
  @CollectionTable(name = "project_skills", joinColumns = @JoinColumn(name = "project_id"))
  @Column(name = "project_skills", nullable = false)
  private Set<String> skills = new HashSet<>();

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "portfolio_id")
  private Portfolio portfolio;

}
