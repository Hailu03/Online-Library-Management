package com.library.programmingexercise.repository;

import com.library.programmingexercise.entity.Book;
import com.library.programmingexercise.entity.ReadersInfo;
import com.library.programmingexercise.entity.Rent;
import com.library.programmingexercise.entity.RentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RentRepository extends JpaRepository<Rent, Integer> {

    @Query(value = "select r1.readerID, r1.first_name, r1.last_name, b.title, r2.reserve_date, r2.due_date " +
            "from readersinfo r1 " +
            "join rent r2 on r1.readerID = r2.readerID " +
            "join books b on r2.bookID = b.bookID", nativeQuery = true)
    Optional<List<Object[]>> findReaderBorrowedBooksDetails();


    @Query(value = "SELECT r.rentID, b.image, b.title, r.reserve_date, r.due_date " +
            "FROM readersinfo r1 " +
            "JOIN rent r ON r1.readerID = r.readerID " +
            "JOIN books b ON r.bookID = b.bookID " +
            "WHERE r1.readerID = :userId", nativeQuery = true)
    Optional<List<Object[]>> findUserBorrowedBooksDetails(@Param("userId") int userId);


    List<Rent>  findAllByBookIDAndReaderID(Book bookID, ReadersInfo readerID);

    Optional<Rent> findById(RentId rentId);

    void deleteById(RentId id);
//    @Modifying
//    @Query(value = "UPDATE rent r1 " +
//            "JOIN readersinfo r2 ON r1.readerID = r2.readerID " +
//            "JOIN books b ON r1.bookID = b.bookID " +
//            "SET r1.reserve_date = :reserveDate, " +
//            "    r1.due_date = :dueDate " +
//            "WHERE r2.first_name = :firstName AND r2.last_name = :lastName " +
//            "AND b.title = :bookTitle", nativeQuery = true)
//    int lendBook(@Param("firstName") String firstName,
//                 @Param("lastName") String lastName,
//                 @Param("bookTitle") String bookTitle,
//                 @Param("reserveDate") Date reserveDate,
//                 @Param("dueDate") Date dueDate);
}