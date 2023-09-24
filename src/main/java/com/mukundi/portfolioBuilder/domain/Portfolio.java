package com.mukundi.portfolioBuilder.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mukundi.portfolioBuilder.auth.User;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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

//  @Lob
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

  @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
  @CollectionTable(name = "portfolio_links", joinColumns = @JoinColumn(name = "portfolio_id"))
  @Column(nullable = false)
  private Set<String> links = new HashSet<>();

  @JsonIgnore
  @OneToOne(mappedBy = "portfolio")
  @NotNull
  private User user;

  public Portfolio(User user){
    this.user = user;
  }

  public void addLink(String link){
    this.links.add(link);
  }
}
