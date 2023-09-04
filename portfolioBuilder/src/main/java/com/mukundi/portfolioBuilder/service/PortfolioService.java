package com.mukundi.portfolioBuilder.service;

import com.mukundi.portfolioBuilder.domain.Experience;
import com.mukundi.portfolioBuilder.domain.Portfolio;
import com.mukundi.portfolioBuilder.domain.Project;
import com.mukundi.portfolioBuilder.domain.Person;
import com.mukundi.portfolioBuilder.repository.ExperienceRepository;
import com.mukundi.portfolioBuilder.repository.PortfolioRepository;
import com.mukundi.portfolioBuilder.repository.ProjectRepository;
import com.mukundi.portfolioBuilder.repository.PersonRepository;
import com.mukundi.portfolioBuilder.service.exception.PortfolioNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@EnableTransactionManagement
@RequiredArgsConstructor
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
    return portfolioRepository
            .findById(id)
            .orElseThrow(() -> new PortfolioNotFoundException("Portfolio with id: " + id + " not found"));
  }

  @Transactional
  public Experience addExperience(Long id, Experience experience) {
    experience.setPortfolio(getById(id));
    return experienceRepository.save(experience);
  }

  @Transactional
  public Project addProject(Long id, Project project) {
    project.setPortfolio(getById(id));
    return projectRepository.save(project);
  }

  @Transactional
  public Portfolio editAboutMe(Long id, String aboutMe) {
    Portfolio portfolio = getById(id);
    portfolio.setAboutMe(aboutMe);
    return portfolioRepository.save(portfolio);
  }

  @Transactional
  public Portfolio editName(Long id, String name) {
    Portfolio portfolio = getById(id);
    portfolio.setName(name);
    return portfolioRepository.save(portfolio);
  }

  @Transactional
  public List<Experience> getAllExperiencesById(Long id) {
    return new ArrayList<>(getById(id).getExperienceList());
  }

  @Transactional
  public List<Project> getAllProjectsById(Long id) {
    return new ArrayList<>(getById(id).getProjectList());
  }

  @Transactional
  public void deleteExperience(Long experienceId) {
    experienceRepository.deleteById(experienceId);
  }

  @Transactional
  public void deleteProject(Long projectId) {
    projectRepository.deleteById(projectId);
  }

}
