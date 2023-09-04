package com.mukundi.portfolioBuilder.domain;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
@Getter @Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Person {

  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false)
  @NotBlank
  private String username;

  @Email
  private String email;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "portfolio_id", referencedColumnName = "id")
  private Portfolio portfolio;

  public Person(String username){
    this.username = username;
  }
}
