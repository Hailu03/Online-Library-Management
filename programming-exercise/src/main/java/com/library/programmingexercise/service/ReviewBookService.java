package com.library.programmingexercise.service;

import com.library.programmingexercise.dto.ReviewBookDto;

import java.time.LocalDate;

public interface ReviewBookService {
    ReviewBookDto reviewBook(LocalDate date, int rating, String review, int bookID, int readerID);
}
