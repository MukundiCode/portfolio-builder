package com.mukundi.portfolioBuilder.repository;

import com.mukundi.portfolioBuilder.domain.Project;
import org.hibernate.boot.JaccPermissionDefinition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
