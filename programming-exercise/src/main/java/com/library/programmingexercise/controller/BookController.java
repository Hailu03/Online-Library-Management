package com.library.programmingexercise.controller;

import com.library.programmingexercise.dto.BookDto;
import com.library.programmingexercise.entity.Book;
import com.library.programmingexercise.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/books")
public class BookController {
    private BookService bookService;

    @PostMapping
    public ResponseEntity<?> addBook(@RequestBody Book book) {
        try {
            Book savedBook = bookService.addBook(book);
            return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            // Return a response indicating the book already exists
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable int id) {
        try {
            bookService.deleteBook(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            // Handle the case where the book with the specified ID does not exist
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooksByTitle(@RequestParam String title) {
        List<Book> books = bookService.searchBooksByTitle(title);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> getAllBooks() {
        List<BookDto> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Integer id, @RequestBody Book bookDetail){
        Book updateBook = bookService.updateBook(id, bookDetail);
        return ResponseEntity.ok(updateBook);
    }
}
