package com.mukundi.portfolioBuilder.controller;

import com.mukundi.portfolioBuilder.domain.Experience;
import com.mukundi.portfolioBuilder.domain.Portfolio;
import com.mukundi.portfolioBuilder.domain.Project;
import com.mukundi.portfolioBuilder.domain.Person;
import com.mukundi.portfolioBuilder.service.PortfolioService;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("portfolio")
@CrossOrigin("*")
public class PortfolioController {

  @Autowired
  private PortfolioService portfolioService;

  @GetMapping("/{id}")
  public Portfolio getPortfolioById(@PathVariable Long id) {
    return portfolioService.getById(id);
  }

  @PostMapping(path = "{id}/experience/add", consumes = MediaType.APPLICATION_JSON_VALUE)
  public Experience addExperience(@PathVariable Long id, @RequestBody Experience experience) {
    return portfolioService.addExperience(id, experience);
  }

  @GetMapping(path = "{id}/experience/all")
  public List<Experience> getAllExperiences(@PathVariable Long id) {
    return portfolioService.getAllExperiencesById(id);
  }

  @DeleteMapping("{portfolioId}/experience/{experienceId}/delete")
  public ResponseEntity deleteExperience(@PathVariable Long portfolioId, @PathVariable Long experienceId) {
    portfolioService.deleteExperience(portfolioId, experienceId);
    return ResponseEntity.ok().build();
  }

  @GetMapping(path = "{id}/project/all")
  public List<Project> getAllProjects(@PathVariable Long id) {
    return portfolioService.getAllProjectsById(id);
  }

  @PostMapping(path = "{id}/project/add", consumes = MediaType.APPLICATION_JSON_VALUE)
  public Project addProject(@PathVariable Long id, @RequestBody Project project) {
    return portfolioService.addProject(id, project);
  }

  @DeleteMapping("{portfolioId}/project/{projectId}/delete")
  public ResponseEntity deleteProject(@PathVariable Long portfolioId, @PathVariable Long projectId) {
    portfolioService.deleteProject(portfolioId, projectId);
    return ResponseEntity.ok().build();
  }

  @PostMapping(path = "{id}/aboutMe/edit", consumes = MediaType.APPLICATION_JSON_VALUE)
  public Portfolio editAboutMe(@PathVariable Long id, @RequestBody String aboutMe) {
    return portfolioService.editAboutMe(id, aboutMe);
  }

  @PostMapping(path = "{id}/name/edit", consumes = MediaType.APPLICATION_JSON_VALUE)
  public Portfolio editName(@PathVariable Long id, @RequestBody EditNameDto dto) {
    return portfolioService.editName(id, dto.name);
  }

  @PostMapping("add")
  public Person createUser(@RequestBody Dto dto) {
    return portfolioService.createUser(dto.username);
  }

  @Getter @Setter @ToString
  static class Dto{
    String username;
  }

  @Getter @Setter @ToString
  static class EditNameDto{
    String name;
  }
}
