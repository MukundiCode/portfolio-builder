package com.mukundi.portfolioBuilder.domain.validator;

import com.mukundi.portfolioBuilder.domain.Experience;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ExperienceDateRangeValidator implements ConstraintValidator<ExperienceDateRangeConstraint, Experience> {

  @Override
  public void initialize(ExperienceDateRangeConstraint constraintAnnotation) {
    ConstraintValidator.super.initialize(constraintAnnotation);
  }

  @Override
  public boolean isValid(Experience experience, ConstraintValidatorContext constraintValidatorContext) {
    return experience.getIsCurrentPosition() || experience.getSince().isBefore(experience.getUntil());
  }

}
