package com.mukundi.portfolioBuilder.controller;

import com.mukundi.portfolioBuilder.domain.Experience;
import com.mukundi.portfolioBuilder.domain.Portfolio;
import com.mukundi.portfolioBuilder.domain.Project;
import com.mukundi.portfolioBuilder.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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
  public Portfolio addExperience(@PathVariable Long id, @RequestBody Experience experience){
    return portfolioService.addExperience(id, experience);
  }

  @PostMapping(path = "{id}/project/add", consumes = MediaType.APPLICATION_JSON_VALUE)
  public Portfolio addProject(@PathVariable Long id, @RequestBody Project project){
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
