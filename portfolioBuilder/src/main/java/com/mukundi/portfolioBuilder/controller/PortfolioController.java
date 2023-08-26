package com.mukundi.portfolioBuilder.controller;

import com.mukundi.portfolioBuilder.domain.Experience;
import com.mukundi.portfolioBuilder.domain.Portfolio;
import com.mukundi.portfolioBuilder.domain.Project;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("portfolio")
@CrossOrigin("*")
public class PortfolioController {

  @GetMapping("")
  public Portfolio getPortfolio(){
    return Portfolio.portfolios.get(0);
  }

  @PostMapping("{uuid}/experience/add")
  public Portfolio addExperience(@PathVariable UUID uuid, @RequestBody Experience experience){
    return Portfolio.addExperience(uuid, experience)
            .orElseThrow(() -> new IllegalArgumentException());
  }

  @PostMapping("{uuid}/project/add")
  public Portfolio addProject(@PathVariable UUID uuid, @RequestBody Project project){
    System.out.println("project = " + project);
    return Portfolio.addProject(uuid, project)
            .orElseThrow(() -> new IllegalArgumentException());
  }

}
