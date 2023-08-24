package com.mukundi.portfolioBuilder.controller;

import com.mukundi.portfolioBuilder.domain.Portfolio;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("portfolio")
@CrossOrigin("*")
public class PortfolioController {

  @GetMapping("")
  public Portfolio getPortfolio(){
    return Portfolio.getDemoPortfolio();
  }


}
