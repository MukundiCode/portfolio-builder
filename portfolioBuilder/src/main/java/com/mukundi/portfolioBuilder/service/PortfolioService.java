package com.mukundi.portfolioBuilder.service;

import com.mukundi.portfolioBuilder.domain.Experience;
import com.mukundi.portfolioBuilder.domain.Portfolio;
import com.mukundi.portfolioBuilder.domain.Project;
import com.mukundi.portfolioBuilder.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;

@Service
@EnableTransactionManagement
public class PortfolioService {

  @Autowired
  private PortfolioRepository portfolioRepository;

  @Transactional
  public Portfolio getById(Long id){
    Portfolio portfolio = portfolioRepository.findById(id).get();
    System.out.println("portfolio = " + portfolio);
    return portfolio;
  }

  @Transactional
  public Portfolio addExperience(Long id, Experience experience) {
    Portfolio portfolio = portfolioRepository.findById(id).get();
    experience.setPortfolio(portfolio);
    portfolio.addExperience(experience);
    portfolioRepository.save(portfolio);
    return portfolio;
  }

  @Transactional
  public Portfolio addProject(Long id, Project project) {
    Portfolio portfolio = portfolioRepository.findById(id).get();
    project.setPortfolio(portfolio);
    portfolio.addProject(project);
    portfolioRepository.save(portfolio);
    return portfolio;
  }

  @Transactional
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
