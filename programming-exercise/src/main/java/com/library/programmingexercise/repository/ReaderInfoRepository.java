package com.library.programmingexercise.repository;

import com.library.programmingexercise.entity.Book;
import com.library.programmingexercise.entity.ReadersInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReaderInfoRepository extends JpaRepository<ReadersInfo, Integer> {
    Optional<ReadersInfo> findByEmail(String email);
    Optional<ReadersInfo> findReadersinfoByFirstNameAndLastName(String firstName, String lastName);
}
