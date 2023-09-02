package com.mukundi.portfolioBuilder.service;

import com.mukundi.portfolioBuilder.domain.Person;
import com.mukundi.portfolioBuilder.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

@Service
@EnableTransactionManagement
public class PersonService {

  @Autowired
  private PersonRepository personRepository;

  @Transactional
  public Person getByUsername(String username){
    return personRepository.getByUsername(username);
  }

}
