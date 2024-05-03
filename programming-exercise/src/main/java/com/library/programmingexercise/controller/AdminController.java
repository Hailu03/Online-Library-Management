package com.library.programmingexercise.controller;

import com.library.programmingexercise.dto.AdminDto;
import com.library.programmingexercise.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

import javax.naming.AuthenticationException;
import java.io.IOException;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/admins")
public class AdminController {
    private AdminService adminService;

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<String> handleAllExceptions(Exception ex, WebRequest request) {
        // Log the exception details (consider using a proper logging framework)
        System.out.println(ex);

        // Return a more generic error response
        return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping
    public ResponseEntity<AdminDto> createAdmin(@RequestBody AdminDto adminDto) {
        AdminDto savedAdmin = adminService.createAdmin(adminDto);
        return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
    }

    @GetMapping("/{email}")
    public ResponseEntity<AdminDto> getAdminByEmail(@PathVariable("email") String email) {
        AdminDto adminDto = adminService.findByEmail(email);
        return new ResponseEntity<>(adminDto, HttpStatus.OK);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("adminID") int adminID, @RequestPart("file") MultipartFile file) {
        try {
            byte[] imageData = file.getBytes();
            AdminDto admindto = adminService.saveImage(adminID, imageData); // Assuming bookService is autowired
            return ResponseEntity.ok(admindto.getImage());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading image: " + e.getMessage());
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(@RequestBody AdminDto loginRequest) {
        try {
            // Perform authentication logic
            String email = loginRequest.getEmail();
            String password = loginRequest.getPassword();
            AdminDto authenticatedAdmin = adminService.authenticate(email, password);

            // If authentication succeeds, return the authenticated admin DTO
            return ResponseEntity.ok(authenticatedAdmin);
        } catch (AuthenticationException p) {
            // If authentication fails, return an error response
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        } catch (Exception e) {
            // Handle other exceptions and return a generic error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during authentication");
        }
    }
}
