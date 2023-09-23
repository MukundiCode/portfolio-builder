package com.mukundi.portfolioBuilder.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SpaWebFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {
    String path = request.getRequestURI();
    Authentication user = SecurityContextHolder.getContext().getAuthentication();
    if (user != null && !path.startsWith("/api") && !path.contains(".") && path.matches("/(.*)")) {
      request.getRequestDispatcher("/").forward(request, response);
      return;
    }

    filterChain.doFilter(request, response);
  }
}
