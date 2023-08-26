package com.mukundi.portfolioBuilder.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

  public static List<Portfolio> portfolios = new ArrayList<>();

  static {
    Portfolio portfolio = new Portfolio(UUID.randomUUID(),
            "Mukundi Chitamba",
            "A short intro",
            "about me here",
            Experience.getDemoList(),
            Project.getDemoList());
    portfolios.add(portfolio);
  }

  public static Optional<Portfolio> addExperience(UUID portfolioId, Experience experience){

    for (Portfolio portfolio : portfolios ){
      if (portfolio.uuid.equals(portfolioId)){
        portfolio.experienceList.add(experience);
        return Optional.of(portfolio);
      }
    }
    return Optional.empty();
  }

}
