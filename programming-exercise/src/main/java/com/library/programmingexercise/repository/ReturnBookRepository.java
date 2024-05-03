package com.library.programmingexercise.repository;

import com.library.programmingexercise.entity.ReturnBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReturnBookRepository extends JpaRepository<ReturnBook, Long> {

}