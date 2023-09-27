package com.mukundi.portfolioBuilder.controller;

import com.mukundi.portfolioBuilder.exception.EntityNotFoundException;
import com.mukundi.portfolioBuilder.exception.UserAuthenticationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
@Slf4j
public class ControllerAdvisor extends ResponseEntityExceptionHandler {

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception, HttpHeaders headers,
                                                                HttpStatus status, WebRequest request) {

    Map<String, Object> body = new LinkedHashMap<>();
    body.put("timestamp", Timestamp.valueOf(LocalDateTime.now()));
    body.put("status", status.value());

    Map<String, String> errors = exception.getBindingResult()
            .getFieldErrors()
            .stream()
            .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));

    exception.getBindingResult()
            .getGlobalErrors()
            .forEach((err) -> errors.put("Experience", err.getDefaultMessage()));

    body.put("errors", errors);
    return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(value = {EntityNotFoundException.class})
  public ResponseEntity<Object> handleEntityNotFoundException(EntityNotFoundException exception, WebRequest request){
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("timestamp", Timestamp.valueOf(LocalDateTime.now()));
    body.put("status", HttpStatus.NOT_FOUND);

    log.error("Error: " + exception.getLocalizedMessage());

    return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(value = {UserAuthenticationException.class})
  public ResponseEntity<Object> handleUserAuthenticationException(EntityNotFoundException exception, WebRequest request){
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("timestamp", Timestamp.valueOf(LocalDateTime.now()));
    body.put("status", HttpStatus.UNAUTHORIZED);

    log.error("Error: " + exception.getMessage());

    return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
  }

}
