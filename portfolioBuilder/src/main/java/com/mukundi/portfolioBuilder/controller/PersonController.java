package com.mukundi.portfolioBuilder.controller;

import com.mukundi.portfolioBuilder.controller.dto.NewUserDto;
import com.mukundi.portfolioBuilder.domain.Person;
import com.mukundi.portfolioBuilder.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true", methods = {RequestMethod.POST, RequestMethod.GET})
@RequiredArgsConstructor
public class PersonController {

  @Autowired
  private PersonService personService;

  @GetMapping("/{username}")
  public ResponseEntity<Person> getPerson(@PathVariable String username){
    Person person = personService.getByUsername(username);
    return ResponseEntity.ok(person);
  }

  @PostMapping("api/new")
  @PreAuthorize("hasRole('ADMIN')")
  public Person createUser(@RequestBody NewUserDto dto) {
    return personService.createUser(dto.getUsername());
  }

}
