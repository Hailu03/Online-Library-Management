package com.library.programmingexercise.service.impl;

import com.library.programmingexercise.dto.BorrowedBookDto;

import com.library.programmingexercise.dto.LendDto;
import com.library.programmingexercise.dto.UserBorrowedBookDto;
import com.library.programmingexercise.entity.Book;
import com.library.programmingexercise.entity.ReadersInfo;
import com.library.programmingexercise.entity.Rent;
import com.library.programmingexercise.entity.RentId;
import com.library.programmingexercise.exception.ResourceNotFoundException;
import com.library.programmingexercise.mapper.BorrowedBookMapper;
import com.library.programmingexercise.mapper.LendMapper;
import com.library.programmingexercise.mapper.UserBorrowedBookMapper;
import com.library.programmingexercise.repository.BookRepository;
import com.library.programmingexercise.repository.ReaderInfoRepository;
import com.library.programmingexercise.repository.RentRepository;
import com.library.programmingexercise.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public class RentServiceImpl implements RentService {
    @Autowired
    private RentRepository rentRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private ReaderInfoRepository readerInfoRepository;

    public List<BorrowedBookDto> getBorrowedBooksDetails() {
        List<Object[]> borrowedBooks = rentRepository.findReaderBorrowedBooksDetails()
                .orElseThrow(() -> new ResourceNotFoundException("There is no people borrowing book currently"));
        return BorrowedBookMapper.mapToBorrowedBookDtoList(borrowedBooks);
    }


    @Override
    public List<UserBorrowedBookDto> getOneUserAllBorrowedBooks(int userId) {
        List<Object[]> userBorrowedBooks = rentRepository.findUserBorrowedBooksDetails(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User has not borrowed any books"));

        return UserBorrowedBookMapper.mapToUserBorrowedBookDtoList(userBorrowedBooks);
    }

    @Override
    public LendDto lendBook(String firstName, String lastName, String bookTitle, LocalDate reserveDate, LocalDate dueDate) {
//        Date convertedReserveDate = java.sql.Date.valueOf(reserveDate);
//        Date convertedDueDate = java.sql.Date.valueOf(dueDate);
//        rentRepository.lendBook(firstName, lastName, bookTitle, convertedReserveDate, convertedReserveDate);

        ReadersInfo readerInfo = readerInfoRepository.findReadersinfoByFirstNameAndLastName(firstName, lastName)
                .orElseThrow(() -> new ExpressionException("Reader is not exist with given name: " + firstName + " " + lastName));

        Book book = bookRepository.findByTitle(bookTitle)
                .orElseThrow(() -> new ExpressionException("Book is not exist with given title: " + bookTitle));

        // Check if the reader has already borrowed the book
        if (isReaderLendThisBook(readerInfo, book)) {
            throw new RuntimeException("You have already borrowed this book.");
        }

        Rent savedRent = null;
        if (book.getAvailable() > 0) {
            Rent rent = new Rent();
            RentId rentId = new RentId();
            rentId.setBookID(book.getId());
            rentId.setReaderID(readerInfo.getId());
            rent.setId(rentId);
            rent.setBookID(book);
            rent.setReaderID(readerInfo);
            rent.setReserveDate(reserveDate);
            rent.setDueDate(dueDate);
            savedRent = rentRepository.save(rent);

            book.setAvailable(book.getAvailable() - 1);
            bookRepository.save(book);

            return LendMapper.mapToLendDto(new Object[]{
                    readerInfo.getId(),
                    book.getId(),
                    readerInfo.getFirstName(),
                    readerInfo.getLastName(),
                    book.getTitle(),
                    savedRent.getReserveDate(),
                    savedRent.getDueDate()
            });
        }
        // throw exception if book is not available
        throw new ResourceNotFoundException("Book is not available");
    }

    public boolean isReaderLendThisBook(ReadersInfo readerId, Book bookId) {
        List<Rent> rents = rentRepository.findAllByBookIDAndReaderID(bookId,readerId);
        return !rents.isEmpty();
    }
}