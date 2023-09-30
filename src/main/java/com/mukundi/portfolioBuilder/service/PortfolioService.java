package com.mukundi.portfolioBuilder.service;

import com.mukundi.portfolioBuilder.auth.UserRepository;
import com.mukundi.portfolioBuilder.domain.Experience;
import com.mukundi.portfolioBuilder.domain.Portfolio;
import com.mukundi.portfolioBuilder.domain.Project;
import com.mukundi.portfolioBuilder.repository.ExperienceRepository;
import com.mukundi.portfolioBuilder.repository.PortfolioRepository;
import com.mukundi.portfolioBuilder.repository.ProjectRepository;
import com.mukundi.portfolioBuilder.exception.PortfolioNotFoundException;
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
  private UserRepository userRepository;

  @Transactional
  public Portfolio getById(Long id) {
    return portfolioRepository
            .findById(id)
            .orElseThrow(() -> new PortfolioNotFoundException("Portfolio with id: " + id + " not found"));
  }

  @Transactional
  public Portfolio getPortfolioByUsername(String username) {
    return userRepository
            .findByUsername(username)
            .orElseThrow(() -> new PortfolioNotFoundException("Portfolio for user: " + username + " not found"))
            .getPortfolio();
  }

  @Transactional
  public Experience addExperience(String username, Experience experience) {
    if (experience.getIsCurrentPosition()) experience.setUntil(null);
    experience.setPortfolio(getPortfolioByUsername(username));
    return experienceRepository.save(experience);
  }

  @Transactional
  public Project addProject(String username, Project project) {
    project.setPortfolio(getPortfolioByUsername(username));
    return projectRepository.save(project);
  }

  @Transactional
  public Portfolio editAboutMe(String username, String aboutMe) {
    Portfolio portfolio = getPortfolioByUsername(username);
    portfolio.setAboutMe(aboutMe);
    return portfolioRepository.save(portfolio);
  }

  @Transactional
  public Portfolio editName(String username, String name) {
    Portfolio portfolio = getPortfolioByUsername(username);
    portfolio.setName(name);
    return portfolioRepository.save(portfolio);
  }

  @Transactional
  public List<Experience> getAllExperiencesByUsername(String username) {
    return new ArrayList<>(getPortfolioByUsername(username).getExperienceList());
  }

  @Transactional
  public List<Project> getAllProjectsById(String username) {
    return new ArrayList<>(getPortfolioByUsername(username).getProjectList());
  }

  @Transactional
  public void deleteExperience(String username, Long experienceId) {
    Experience experience = getPortfolioByUsername(username).getExperienceList().stream()
            .filter(e -> e.getId().equals(experienceId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Unauthorized to make this request"));
    experienceRepository.deleteById(experience.getId());
  }

  @Transactional
  public void deleteProject(String username, Long projectId) {
    Project project = getPortfolioByUsername(username).getProjectList().stream()
            .filter(p -> p.getId().equals(projectId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Unauthorized to make this request"));
    projectRepository.deleteById(project.getId());
  }

  public Portfolio addLink(String username, String link) {
    Portfolio portfolio = getPortfolioByUsername(username);
    portfolio.addLink(link);
    return portfolioRepository.save(portfolio);
  }
}
