package com.mukundi.portfolioBuilder.controller;

import com.mukundi.portfolioBuilder.domain.Experience;
import com.mukundi.portfolioBuilder.domain.Portfolio;
import com.mukundi.portfolioBuilder.domain.Project;
import com.mukundi.portfolioBuilder.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("portfolio")
@CrossOrigin("*")
public class PortfolioController {

  @Autowired
  private PortfolioService portfolioService;

  @GetMapping("/{id}")
  public Portfolio getPortfolioById(@PathVariable Long id){
    return portfolioService.getById(id);
  }

  @PostMapping(path = "{id}/experience/add" , consumes = MediaType.APPLICATION_JSON_VALUE)
  public Experience addExperience(@PathVariable Long id, @RequestBody Experience experience){
    return portfolioService.addExperience(id, experience);
  }

  @GetMapping(path = "{id}/experience/all")
  public List<Experience> getAllExperiences(@PathVariable Long id){
    return portfolioService.getAllExperiencesById(id);
  }

  @DeleteMapping("{portfolioId}/experience/{experienceId}/delete")
  public ResponseEntity deleteExperience(@PathVariable Long portfolioId, @PathVariable Long experienceId){
    portfolioService.deleteExperience(portfolioId, experienceId);
    return ResponseEntity.ok().build();
  }

  @GetMapping(path = "{id}/project/all")
  public List<Project> getAllProjects(@PathVariable Long id){
    return portfolioService.getAllProjectsById(id);
  }

  @PostMapping(path = "{id}/project/add", consumes = MediaType.APPLICATION_JSON_VALUE)
  public Project addProject(@PathVariable Long id, @RequestBody Project project){
    return portfolioService.addProject(id, project);
  }

  @PostMapping(path = "{id}/aboutMe/edit", consumes = MediaType.APPLICATION_JSON_VALUE)
  public Portfolio editAboutMe(@PathVariable Long id, @RequestBody String aboutMe){
    return portfolioService.editAboutMe(id, aboutMe);
  }

  @GetMapping("add")
  public Portfolio addPortfolio(){
    return portfolioService.create();
  }

}
