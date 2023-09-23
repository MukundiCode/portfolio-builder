package com.mukundi.portfolioBuilder.controller;

import com.mukundi.portfolioBuilder.auth.User;
import com.mukundi.portfolioBuilder.controller.dto.GetUserPortfolioDto;
import com.mukundi.portfolioBuilder.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/person")
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true", methods = {RequestMethod.POST, RequestMethod.GET})
@RequiredArgsConstructor
public class PersonController {

  @Autowired
  private PersonService personService;

  @GetMapping("/{username}")
  public ResponseEntity<GetUserPortfolioDto> getPerson(@PathVariable String username){
    User user = personService.getByUsername(username);
    return ResponseEntity.ok(
            new GetUserPortfolioDto(user.getPortfolio())
    );
  }

  @GetMapping("/isUsernameTaken")
  public ResponseEntity<Boolean> isUsernameTaken(@RequestParam String username){
    return ResponseEntity.ok(
            personService.isUsernameTaken(username)
    );
  }

}
