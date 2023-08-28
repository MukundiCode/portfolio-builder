package com.mukundi.portfolioBuilder.controller;

import com.mukundi.portfolioBuilder.domain.Experience;
import com.mukundi.portfolioBuilder.domain.Portfolio;
import com.mukundi.portfolioBuilder.domain.Project;
import com.mukundi.portfolioBuilder.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
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

  @PostMapping("{id}/experience/add")
  public Portfolio addExperience(@PathVariable Long id, @RequestBody Experience experience){
    return portfolioService.addExperience(id, experience);
  }

  @PostMapping("{id}/project/add")
  public Portfolio addProject(@PathVariable Long id, @RequestBody Project project){
    return portfolioService.addProject(id, project);
  }

  @GetMapping("add")
  public Portfolio addPortfolio(){
    return portfolioService.create();
  }

}
