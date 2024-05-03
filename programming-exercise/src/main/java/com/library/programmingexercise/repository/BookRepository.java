package com.library.programmingexercise.repository;


import com.library.programmingexercise.entity.Book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByTitleContaining(String title);
    Optional<Book> findByIsbn(String isbn);
    Optional<Book> findByTitle(String title);
}

