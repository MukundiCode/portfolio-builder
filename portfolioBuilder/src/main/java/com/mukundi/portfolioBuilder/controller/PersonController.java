package com.mukundi.portfolioBuilder.controller;

import com.mukundi.portfolioBuilder.domain.Person;
import com.mukundi.portfolioBuilder.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
@CrossOrigin("*")
public class PersonController {

  @Autowired
  private PersonService personService;

  @GetMapping("/{username}")
  public Person getPerson(@PathVariable String username){
    return personService.getByUsername(username);
  }

}
