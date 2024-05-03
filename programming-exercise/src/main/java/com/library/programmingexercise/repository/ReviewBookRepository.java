package com.library.programmingexercise.repository;

import com.library.programmingexercise.entity.Book;
import com.library.programmingexercise.entity.ReadersInfo;
import com.library.programmingexercise.entity.Reviewbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewBookRepository extends JpaRepository<Reviewbook, Long> {
    Optional<Reviewbook> findByBookIDAndReaderID(Book book, ReadersInfo reader);
}
