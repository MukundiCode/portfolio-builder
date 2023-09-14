package com.mukundi.portfolioBuilder.controller;

import com.mukundi.portfolioBuilder.controller.dto.EditStringFieldDto;
import com.mukundi.portfolioBuilder.domain.Experience;
import com.mukundi.portfolioBuilder.domain.Portfolio;
import com.mukundi.portfolioBuilder.domain.Project;
import com.mukundi.portfolioBuilder.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("portfolio")
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true", methods = {RequestMethod.POST, RequestMethod.GET})
@RequiredArgsConstructor
public class PortfolioController {

  @Autowired
  private PortfolioService portfolioService;

  @GetMapping("/{id}")
  public ResponseEntity<Portfolio> getPortfolioById(@PathVariable Long id) {
    Portfolio portfolio = portfolioService.getById(id);
    return ResponseEntity.ok(portfolio);
  }

  @PostMapping(path = "{id}/experience/add", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Experience> addExperience(@PathVariable Long id, @RequestBody @Valid Experience experience) {
    Experience savedExperience = portfolioService.addExperience(id, experience);
    return ResponseEntity.ok(savedExperience);
  }

  @GetMapping(path = "{id}/experience/all")
  public ResponseEntity<List<Experience>> getAllExperiences(@PathVariable Long id) {
    List<Experience> experienceList = portfolioService.getAllExperiencesById(id);
    return ResponseEntity.ok(experienceList);
  }

  /**
   * TODO : Change these urls since portfolio id is not needed
   */
  @DeleteMapping("{portfolioId}/experience/{experienceId}/delete")
  public ResponseEntity<Object> deleteExperience(@PathVariable Long portfolioId, @PathVariable Long experienceId) {
    portfolioService.deleteExperience(experienceId);
    return ResponseEntity.ok().build();
  }

  @GetMapping(path = "/{id}/project/all")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<Project>> getAllProjects(@PathVariable Long id) {
    List<Project> projectList = portfolioService.getAllProjectsById(id);
    return ResponseEntity.ok(projectList);
  }

  @PostMapping(path = "{id}/project/add", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Project> addProject(@PathVariable Long id, @RequestBody @Valid Project project) {
    Project savedProject = portfolioService.addProject(id, project);
    return ResponseEntity.ok(savedProject);
  }

  @DeleteMapping("{portfolioId}/project/{projectId}/delete")
  public ResponseEntity<Object> deleteProject(@PathVariable Long portfolioId, @PathVariable Long projectId) {
    portfolioService.deleteProject(projectId);
    return ResponseEntity.ok().build();
  }

  @PostMapping(path = "{id}/aboutMe/edit", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Portfolio> editAboutMe(@PathVariable Long id, @RequestBody EditStringFieldDto dto) {
    Portfolio portfolio = portfolioService.editAboutMe(id, dto.getLoad());
    return ResponseEntity.ok(portfolio);
  }

  @PostMapping(path = "{id}/link/add", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Portfolio> addLink(@PathVariable Long id, @RequestBody EditStringFieldDto dto) {
    Portfolio portfolio = portfolioService.addLink(id, dto.getLoad());
    return ResponseEntity.ok(portfolio);
  }

  @PostMapping(path = "{id}/name/edit", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Portfolio> editName(@PathVariable Long id, @RequestBody EditStringFieldDto dto) {
    Portfolio portfolio = portfolioService.editName(id, dto.getLoad());
    return ResponseEntity.ok(portfolio);
  }

}
