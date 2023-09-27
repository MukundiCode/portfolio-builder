package com.mukundi.portfolioBuilder.service;

import com.mukundi.portfolioBuilder.auth.User;
import com.mukundi.portfolioBuilder.auth.UserRepository;
import com.mukundi.portfolioBuilder.exception.PersonNotFoundException;
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
  private UserRepository userRepository;

  /**
   * TODO Should make this return portfolio not user
   */
  @Transactional
  public User getByUsername(String username){
    return userRepository.findByUsername(username)
            .orElseThrow(() -> new PersonNotFoundException("Person with username: " + username + " not found"));
  }

  public Boolean isUsernameTaken(String username) {
    return userRepository.existsByUsername(username);
  }
}
