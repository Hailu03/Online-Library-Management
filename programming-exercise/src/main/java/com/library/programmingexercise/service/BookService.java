package com.library.programmingexercise.service;

import com.library.programmingexercise.dto.BookDto;
import com.library.programmingexercise.entity.Book;

import java.util.List;

public interface BookService {
    Book addBook(Book book);

    void deleteBook(int bookId);

    List<Book> searchBooksByTitle(String title);

    public List<BookDto> getAllBooks();

    Book updateBook(Integer id, Book bookDetail);
}
