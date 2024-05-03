package com.library.programmingexercise.controller;
import com.library.programmingexercise.dto.BorrowedBookDto;
import com.library.programmingexercise.dto.LendDto;
import com.library.programmingexercise.dto.UserBorrowedBookDto;
import com.library.programmingexercise.service.RentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/rent")
public class RentController {
    @Autowired
    private RentService rentService;

    @GetMapping("/borrowed-books")
    public ResponseEntity<List<BorrowedBookDto>> getBorrowedBooksDetails(){
        List<BorrowedBookDto> details = rentService.getBorrowedBooksDetails();
        return ResponseEntity.ok(details);
    }
    @PostMapping("/lend-book")
    public ResponseEntity<LendDto> lendBook(@RequestParam String firstName,
                                            @RequestParam String lastName,
                                            @RequestParam String bookTitle,
                                            @RequestParam LocalDate reserveDate,
                                            @RequestParam LocalDate dueDate) {
        // check if the reader already borrowed the book


        LendDto lendDto = rentService.lendBook(firstName, lastName, bookTitle, reserveDate, dueDate);
        return ResponseEntity.ok(lendDto);
    }

    @GetMapping("/user-borrowed-books/{userId}")
    public ResponseEntity<List<UserBorrowedBookDto>> getOneUserAllBorrowedBooks(@PathVariable("userId") int userId) {
        List<UserBorrowedBookDto> details = rentService.getOneUserAllBorrowedBooks(userId);
        return ResponseEntity.ok(details);
    }

}