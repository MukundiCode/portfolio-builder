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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/portfolio")
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.DELETE})
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class PortfolioController {

  @Autowired
  private PortfolioService portfolioService;

  @PostMapping(path = "/experience/add", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Experience> addExperience(@AuthenticationPrincipal UserDetails userDetails, @RequestBody @Valid Experience experience) {
    Experience savedExperience = portfolioService.addExperience(userDetails.getUsername(), experience);
    return ResponseEntity.ok(savedExperience);
  }

  @GetMapping(path = "/experience/all")
  public ResponseEntity<List<Experience>> getAllExperiences(@AuthenticationPrincipal UserDetails userDetails) {
    List<Experience> experienceList = portfolioService.getAllExperiencesByUsername(userDetails.getUsername());
    return ResponseEntity.ok(experienceList);
  }

  @DeleteMapping("/experience/{experienceId}/delete")
  public ResponseEntity<Object> deleteExperience(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long experienceId) {
    portfolioService.deleteExperience(userDetails.getUsername(), experienceId);
    return ResponseEntity.ok().build();
  }

  @GetMapping(path = "/project/all")
  public ResponseEntity<List<Project>> getAllProjects(@AuthenticationPrincipal UserDetails userDetails) {
    List<Project> projectList = portfolioService.getAllProjectsById(userDetails.getUsername());
    return ResponseEntity.ok(projectList);
  }

  @PostMapping(path = "/project/add", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Project> addProject(@AuthenticationPrincipal UserDetails userDetails, @RequestBody @Valid Project project) {
    Project savedProject = portfolioService.addProject(userDetails.getUsername(), project);
    return ResponseEntity.ok(savedProject);
  }

  @DeleteMapping("/project/{projectId}/delete")
  public ResponseEntity<Object> deleteProject(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long projectId) {
    portfolioService.deleteProject(userDetails.getUsername(), projectId);
    return ResponseEntity.ok().build();
  }

  @PostMapping(path = "/aboutMe/edit", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Portfolio> editAboutMe(@AuthenticationPrincipal UserDetails userDetails, @RequestBody EditStringFieldDto dto) {
    Portfolio portfolio = portfolioService.editAboutMe(userDetails.getUsername(), dto.getLoad());
    return ResponseEntity.ok(portfolio);
  }

  @PostMapping(path = "/link/add", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Portfolio> addLink(@AuthenticationPrincipal UserDetails userDetails, @RequestBody EditStringFieldDto dto) {
    Portfolio portfolio = portfolioService.addLink(userDetails.getUsername(), dto.getLoad());
    return ResponseEntity.ok(portfolio);
  }

  @PostMapping(path = "/name/edit", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Portfolio> editName(@AuthenticationPrincipal UserDetails userDetails, @RequestBody EditStringFieldDto dto) {
    Portfolio portfolio = portfolioService.editName(userDetails.getUsername(), dto.getLoad());
    return ResponseEntity.ok(portfolio);
  }

}
