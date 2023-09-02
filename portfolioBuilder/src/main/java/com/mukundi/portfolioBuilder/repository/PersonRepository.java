package com.mukundi.portfolioBuilder.repository;

import com.mukundi.portfolioBuilder.domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {

  Person getByUsername(String username);

}
