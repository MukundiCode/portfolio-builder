package com.mukundi.portfolioBuilder.service;

import com.mukundi.portfolioBuilder.domain.Experience;
import com.mukundi.portfolioBuilder.domain.Portfolio;
import com.mukundi.portfolioBuilder.domain.Project;
import com.mukundi.portfolioBuilder.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class PortfolioService {

  @Autowired
  private PortfolioRepository portfolioRepository;

  public Portfolio getById(Long id){
    Portfolio portfolio = portfolioRepository.findById(id).get();
    System.out.println("portfolio = " + portfolio);
    return portfolio;
  }

  public Portfolio addExperience(Long id, Experience experience) {
    Portfolio portfolio = portfolioRepository.findById(id).get();
    portfolio.addExperience(experience);
    portfolioRepository.save(portfolio);
    return portfolio;
  }

  public Portfolio addProject(Long id, Project project) {
    Portfolio portfolio = portfolioRepository.findById(id).get();
    portfolio.addProject(project);
    portfolioRepository.save(portfolio);
    return portfolio;
  }

  public Portfolio create() {
    Portfolio portfolio = new Portfolio(null,
            "Mukundi Chitamba",
            "Some intro",
            "Some about me ",
            new HashSet<Experience>(),
            new HashSet<Project>());
    return portfolioRepository.save(portfolio);
  }
}
