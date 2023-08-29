package com.mukundi.portfolioBuilder.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class Experience {

  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false)
  private String position;

  @Column(nullable = false)
  private String company;

  @Column(nullable = false)
  private String description;

  @Column(nullable = false)
  private LocalDate since;

  @Column(nullable = false)
  private LocalDate until;

  @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
  @CollectionTable(name = "experience_skills", joinColumns = @JoinColumn(name = "experience_id"))
  @Column(nullable = false)
  private Set<String> skills;

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "portfolio_id")
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
