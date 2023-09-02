package com.mukundi.portfolioBuilder.service;

import com.mukundi.portfolioBuilder.domain.Experience;
import com.mukundi.portfolioBuilder.domain.Portfolio;
import com.mukundi.portfolioBuilder.domain.Project;
import com.mukundi.portfolioBuilder.domain.Person;
import com.mukundi.portfolioBuilder.repository.ExperienceRepository;
import com.mukundi.portfolioBuilder.repository.PortfolioRepository;
import com.mukundi.portfolioBuilder.repository.ProjectRepository;
import com.mukundi.portfolioBuilder.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@EnableTransactionManagement
public class PortfolioService {

  @Autowired
  private PortfolioRepository portfolioRepository;

  @Autowired
  private ExperienceRepository experienceRepository;

  @Autowired
  private ProjectRepository projectRepository;

  @Autowired
  private PersonRepository personRepository;

  @Transactional
  public Portfolio getById(Long id){
    Portfolio portfolio = portfolioRepository.findById(id).get();
    return portfolio;
  }

  @Transactional
  public Experience addExperience(Long id, Experience experience) {
    Portfolio portfolio = portfolioRepository.findById(id).get();
    experience.setPortfolio(portfolio);
    return experienceRepository.save(experience);
  }

  @Transactional
  public Project addProject(Long id, Project project) {
    Portfolio portfolio = portfolioRepository.findById(id).get();
    project.setPortfolio(portfolio);
    return projectRepository.save(project);
  }

//  @Transactional
//  public Portfolio create() {
//    Portfolio portfolio = new Portfolio(null,
//            "Mukundi Chitamba",
//            "Some intro",
//            "Some about me ",
//            new HashSet<>(),
//            new HashSet<>());
//    return portfolioRepository.save(portfolio);
//  }

  @Transactional
  public Portfolio editAboutMe(Long id, String aboutMe) {
    Portfolio portfolio = portfolioRepository.findById(id).get();
    portfolio.setAboutMe(aboutMe);
    portfolioRepository.save(portfolio);
    return portfolio;
  }

  @Transactional
  public Portfolio editName(Long id, String name) {
    Portfolio portfolio = portfolioRepository.findById(id).get();
    portfolio.setName(name);
    portfolioRepository.save(portfolio);
    return portfolio;

  }

  @Transactional
  public List<Experience> getAllExperiencesById(Long id) {
    return new ArrayList<>(portfolioRepository.findById(id).get().getExperienceList());
  }

  @Transactional
  public List<Project> getAllProjectsById(Long id) {
    return new ArrayList<>(portfolioRepository.findById(id).get().getProjectList());
  }

  /**
   * TODO Some validation here
   */
  @Transactional
  public void deleteExperience(Long portfolioId, Long experienceId) {
    experienceRepository.deleteById(experienceId);
  }

  @Transactional
  public void deleteProject(Long portfolioId, Long projectId) {
    projectRepository.deleteById(projectId);
  }

  public Person createUser(String username) {
    Person user = new Person(username);
    Portfolio portfolio = new Portfolio();
    user.setPortfolio(portfolio);
    return personRepository.save(user);
  }

}
