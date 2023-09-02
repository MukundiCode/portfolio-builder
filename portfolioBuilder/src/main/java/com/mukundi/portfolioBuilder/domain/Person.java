package com.mukundi.portfolioBuilder.domain;

import lombok.*;

import javax.persistence.*;

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
  private String username;

  private String email;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "portfolio_id", referencedColumnName = "id")
  private Portfolio portfolio;

  public Person(String username){
    this.username = username;
  }
}
