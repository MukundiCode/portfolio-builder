package com.mukundi.portfolioBuilder.domain.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = ExperienceDateRangeValidator.class)
@Target( { ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface ExperienceDateRangeConstraint {
  String message() default "Invalid Experience, start date can not be after end date";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}
