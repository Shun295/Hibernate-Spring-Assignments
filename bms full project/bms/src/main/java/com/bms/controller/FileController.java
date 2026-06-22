package com.bms.controller;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/file")
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {

    //folder where updatd files are stored
    private static final String UPLOAD_LOC = "D:/hexaware/banking/FOLDERSS";

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFile(@PathVariable String fileName) throws IOException {

        //creating the full file path using the location and the name
        Path path = Paths.get(UPLOAD_LOC, fileName);
        //convert the file path into a Resource object so Spring can return it
        Resource resource =new UrlResource(path.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("File not found: " + fileName
            );
        }
        // Detect the file's MIME type (PDF, JPG, PNG, etc.)
        String contentType = Files.probeContentType(path);
        // If MIME type cannot be detected, use a default binary type
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                // Set the file's content type
                .contentType(MediaType.parseMediaType(contentType))
                // Open the file directly in the browser instead of downloading it
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" +
                                fileName + "\""
                )
                // Attach the file resource to the response body
                .body(resource);
    }
}