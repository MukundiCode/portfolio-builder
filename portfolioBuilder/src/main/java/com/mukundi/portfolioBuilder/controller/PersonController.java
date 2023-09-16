package com.mukundi.portfolioBuilder.controller;

import com.mukundi.portfolioBuilder.auth.User;
import com.mukundi.portfolioBuilder.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true", methods = {RequestMethod.POST, RequestMethod.GET})
@RequiredArgsConstructor
public class PersonController {

  @Autowired
  private PersonService personService;

  @GetMapping("/{username}")
  public ResponseEntity<User> getPerson(@PathVariable String username){
    User user = personService.getByUsername(username);
    return ResponseEntity.ok(user);
  }

  @GetMapping("/isUsernameTaken")
  public ResponseEntity<Boolean> isUsernameTaken(@RequestParam String username){
    return ResponseEntity.ok(
            personService.isUsernameTaken(username)
    );
  }

}
