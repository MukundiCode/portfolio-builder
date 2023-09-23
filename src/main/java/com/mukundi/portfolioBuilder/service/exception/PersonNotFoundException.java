package com.mukundi.portfolioBuilder.service.exception;

public class PersonNotFoundException extends EntityNotFoundException{
  public PersonNotFoundException(String message) {
    super(message);
  }
}
