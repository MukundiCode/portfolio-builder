package com.mukundi.portfolioBuilder.service.exception;

public class PortfolioNotFoundException extends EntityNotFoundException{
  public PortfolioNotFoundException(String message) {
    super(message);
  }
}
