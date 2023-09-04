package com.mukundi.portfolioBuilder.service;

import com.mukundi.portfolioBuilder.domain.Person;
import com.mukundi.portfolioBuilder.domain.Portfolio;
import com.mukundi.portfolioBuilder.repository.PersonRepository;
import com.mukundi.portfolioBuilder.service.exception.PersonNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

@Service
@EnableTransactionManagement
@RequiredArgsConstructor
public class PersonService {

  @Autowired
  private PersonRepository personRepository;

  @Transactional
  public Person getByUsername(String username){
    return personRepository.findByUsername(username)
            .orElseThrow(() -> new PersonNotFoundException("Person with username: " + username + " not found"));
  }

  @Transactional
  public Person createUser(String username) {
    Person user = new Person(username);
    Portfolio portfolio = new Portfolio();
    user.setPortfolio(portfolio);
    return personRepository.save(user);
  }

}
