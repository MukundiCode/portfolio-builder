package com.mukundi.portfolioBuilder.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Portfolio {

  private UUID uuid;

  private String name;

  private String shortIntro;

  private String aboutMe;

  private List<Experience> experienceList;

  private List<Project> projectList;

  public static Portfolio getDemoPortfolio(){
    return new Portfolio(UUID.randomUUID(),
            "Mukundi Chitamba",
            "A short intro",
            "about me here",
            Experience.getDemoList(),
            Project.getDemoList());
  }

}
