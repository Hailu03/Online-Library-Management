package com.library.programmingexercise.service.impl;

import com.library.programmingexercise.dto.BookDto;
import com.library.programmingexercise.entity.Book;
import com.library.programmingexercise.mapper.BookMapper;
import com.library.programmingexercise.repository.BookRepository;
import com.library.programmingexercise.service.BookService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookRepository bookRepository;
    private static final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);

    public Book addBook(Book book) {
        // Check if a book with the same ISBN already exists
        Optional<Book> existingBook = bookRepository.findByIsbn(book.getIsbn());
        if (existingBook.isPresent()) {
            // Handle the case of duplication
            throw new IllegalStateException("A book with the same ISBN already exists.");
        }
        // If no duplicate exists, save and return the new book
        return bookRepository.save(book);
    }

    public void deleteBook(int bookId) {
        bookRepository.deleteById(bookId);
    }

    public List<Book> searchBooksByTitle(String title) {
        return bookRepository.findByTitleContaining(title);
    }

    @Override
    public List<BookDto> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        if (logger.isDebugEnabled()) {
            books.forEach(book -> logger.debug("Book: {}", book));
        }
        return books.stream() // Creates a Stream of elements from the students List
                .map((book) -> BookMapper.maptoBookDto(book))  // Transforms each Student object to a StudentDto object using StudentMapper
                .collect(Collectors.toList()); // Collects the transformed StudentDto objects into a List
    }

    public Book updateBook(Integer id, Book bookDetail) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book is not found with id: " + id));

        book.setAuthorName(bookDetail.getAuthorName());
        book.setAvailable(bookDetail.getAvailable());
        book.setEdition(bookDetail.getEdition());
        book.setGenre(bookDetail.getGenre());
        book.setIsbn(bookDetail.getIsbn());
        book.setPublisher(bookDetail.getPublisher());
        book.setQuantity(bookDetail.getQuantity());
        book.setTitle(bookDetail.getTitle());
        book.setYearOfPublication(bookDetail.getYearOfPublication());
        book.setImage(bookDetail.getImage());

        return bookRepository.save(book);
    }
}
