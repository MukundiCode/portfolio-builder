package com.mukundi.portfolioBuilder.controller.dto;

import com.mukundi.portfolioBuilder.domain.Portfolio;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetUserPortfolioDto {

  private Portfolio portfolio;

}
