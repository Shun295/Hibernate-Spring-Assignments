package com.bms.config;

import com.bms.exception.*;
import com.bms.utility.ResponseUtility;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
@AllArgsConstructor
@Slf4j
public class GlobalExceptionHandler {

    private ResponseUtility responseUtility;

    private final Logger logger= LoggerFactory.getLogger(GlobalExceptionHandler.class);
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseUtility> handleGlobalException(
            ResourceNotFoundException e
    ) {
        logger.error("Resource not found: {}", e.getMessage());
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>>
    handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e
    ) {

        logger.warn("Validation failed");
        BindingResult result = e.getBindingResult();

        List<FieldError> errors = result.getFieldErrors();
        Map<String, String> map = new HashMap<>();

        for (FieldError error : errors) {
            map.put(error.getField(),
                    error.getDefaultMessage());

            logger.error("Field {} - Message {}", error.getField(), error.getDefaultMessage());
        }

        return ResponseEntity
                .badRequest()
                .body(map);
    }

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<ResponseUtility> handleFileNotFoundException(FileNotFoundException e
    ) {

        logger.error("File not found: {}", e.getMessage());

        responseUtility.setMessage(e.getMessage());

        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<ResponseUtility>
    handleIOException(
            IOException e
    ) {

        logger.error("IO Exception: {}", e.getMessage());

        responseUtility.setMessage(e.getMessage());

        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    @ExceptionHandler(FileInvalidExtensionException.class)
    public ResponseEntity<ResponseUtility> handleFileInvalidExtensionException(FileInvalidExtensionException e
    ) {

        logger.warn("Invalid file extension: {}", e.getMessage());
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    @ExceptionHandler(InvalidAmountException.class)
    public ResponseEntity<ResponseUtility> handleInvalidAmountException(InvalidAmountException e) {

        logger.warn("Invalid amount: {}", e.getMessage());
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    @ExceptionHandler(NotActiveException.class)
    public ResponseEntity<ResponseUtility> handleNotActiveException(NotActiveException e) {

        logger.warn("Account not active: {}", e.getMessage());
        responseUtility.setMessage(e.getMessage());

        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    @ExceptionHandler(UserAlreadyPresentException.class)
    public ResponseEntity<ResponseUtility> handleUserAlreadyPresentException(
            UserAlreadyPresentException e
    ) {

        logger.warn("User already exists: {}", e.getMessage());

        responseUtility.setMessage(e.getMessage());

        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ResponseUtility> handleAccessDeniedException(AccessDeniedException e) {

        logger.error("Access denied: {}", e.getMessage());

        responseUtility.setMessage(e.getMessage());

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(responseUtility);
    }

    @ExceptionHandler(DuplicateRequestException.class)
    public ResponseEntity<ResponseUtility> handleDuplicateRequestException(DuplicateRequestException e) {

        logger.warn("Duplicate request: {}", e.getMessage());
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }
}