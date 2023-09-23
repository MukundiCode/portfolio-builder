package com.mukundi.portfolioBuilder.repository;

import com.mukundi.portfolioBuilder.domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {

  Optional<Person> findByUsername(String username);

}
