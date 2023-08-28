package com.mukundi.portfolioBuilder.repository;

import com.mukundi.portfolioBuilder.domain.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

}
