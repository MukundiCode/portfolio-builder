package com.mukundi.portfolioBuilder.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mukundi.portfolioBuilder.domain.validator.ExperienceDateRangeConstraint;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@ExperienceDateRangeConstraint
public class Experience {

  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false)
  @NotBlank
  private String position;

  @Column(nullable = false)
  @NotBlank
  private String company;

  @Lob
  @Column(nullable = false)
  @NotBlank
  private String description;

  @Column(nullable = false)
  @NotNull
  private LocalDate since;

  @Column(nullable = false)
  @NotNull
  private LocalDate until;

  @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
  @CollectionTable(name = "experience_skills", joinColumns = @JoinColumn(name = "experience_id"))
  @Column(nullable = false)
  private Set<String> skills = new HashSet<>();

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "portfolio_id", nullable = false)
  private Portfolio portfolio;

  public Experience(String position, String company, String description, LocalDate since, LocalDate until, Set<String> skills) {
    this.position = position;
    this.company = company;
    this.description = description;
    this.since = since;
    this.until = until;
    this.skills = skills;
  }
}
