package com.library.programmingexercise.service.impl;

import com.library.programmingexercise.dto.ReadersinfoDto;
import com.library.programmingexercise.entity.*;
import com.library.programmingexercise.mapper.BookMapper;
import com.library.programmingexercise.mapper.ReadersinfoMapper;
import com.library.programmingexercise.repository.BookRepository;
import com.library.programmingexercise.repository.ReviewBookRepository;
import com.library.programmingexercise.service.ReadersinfoService;
import com.library.programmingexercise.repository.ReaderInfoRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReadersinfoServiceImpl implements ReadersinfoService {
    private ReaderInfoRepository readersinfoRepository;
    private BookRepository bookRepository;
    private ReviewBookRepository reviewBookRepository;
    private static final Logger logger = LoggerFactory.getLogger(ReadersinfoServiceImpl.class);

    @Override
    public ReadersinfoDto addReaderInfo(ReadersinfoDto readerInfoDto) {
        ReadersInfo readerInfo = ReadersinfoMapper.maptoReadersinfo(readerInfoDto);
        ReadersInfo savedReaderInfo = readersinfoRepository.save(readerInfo);

        List<Book> books = bookRepository.findAll();
//        for (Book book : books){
//            ReviewbookId reviewbookId = new ReviewbookId();
//            reviewbookId.setBookID(book.getId());
//            reviewbookId.setReaderID(savedReaderInfo.getId());
//
//            ReviewBook reviewbook = new ReviewBook();
//            reviewbook.setId(reviewbookId);
//            reviewbook.setBookID(book);
//            reviewbook.setReaderID(savedReaderInfo);
//            reviewBookRepository.save(reviewbook);
//        }
        books.parallelStream().forEach(book -> {
            ReviewbookId reviewbookId = new ReviewbookId();
            reviewbookId.setBookID(book.getId());
            reviewbookId.setReaderID(savedReaderInfo.getId());

            Reviewbook reviewbook = new Reviewbook();
            reviewbook.setId(reviewbookId);
            reviewbook.setBookID(book);
            reviewbook.setReaderID(savedReaderInfo);
            reviewBookRepository.save(reviewbook);
        });
        return null;
    }

    @Override
    public ReadersinfoDto findByEmail(String email) {
        ReadersInfo reader = readersinfoRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Reader not found with email: " + email));

        return ReadersinfoMapper.maptoReadersinfoDto(reader);
    }

    @Override
    public List<ReadersinfoDto> getAllUsers() {
        List<ReadersInfo> readers = readersinfoRepository.findAll();
        if (logger.isDebugEnabled())
        {
            readers.forEach(reader -> logger.debug("Users: {}", reader));
        }
        return readers.stream() // Creates a Stream of elements from the students List
                .map((reader) -> ReadersinfoMapper.maptoReadersinfoDto(reader))  // Transforms each Student object to a StudentDto object using StudentMapper
                .collect(Collectors.toList()); // Collects the transformed StudentDto objects into a List
    }

    @Override
    public ReadersinfoDto authenticate(String email, String password) throws AuthenticationException {
        ReadersInfo reader = readersinfoRepository.findByEmail(email)
                .orElseThrow(() -> new AuthenticationException("User not found with email: " + email));

        if (!password.equals(reader.getPassword())) {
            throw new AuthenticationException("Invalid password");
        }

        return ReadersinfoMapper.maptoReadersinfoDto(reader);
    }

    @Override
    public ReadersinfoDto saveImage(int readerID, byte[] imageData) {
        Optional<ReadersInfo> readerOptional = readersinfoRepository.findById(readerID);
        if (readerOptional.isPresent()) {
            ReadersInfo reader = readerOptional.get();
            reader.setImage(imageData);
            readersinfoRepository.save(reader);

            return ReadersinfoMapper.maptoReadersinfoDto(reader);
        } else {
            throw new RuntimeException("Reader not found with ID: " + readerID);
        }
    }

    @Override
    public ReadersinfoDto updateReadersinfo(Integer readerID, ReadersInfo readersinfo) {
        ReadersInfo reader = readersinfoRepository.findById(readerID).orElseThrow(() -> new RuntimeException("Book is not found with id: " + readerID));

        reader.setAddress(readersinfo.getAddress());
        reader.setEmail(readersinfo.getEmail());
        reader.setFirstName(readersinfo.getFirstName());
        reader.setLastName(readersinfo.getLastName());
        reader.setPhoneNumber(readersinfo.getPhoneNumber());
        reader.setPassword(readersinfo.getPassword());
        reader.setUsername(readersinfo.getUsername());
        reader.setGender(readersinfo.getGender());
        reader.setImage(readersinfo.getImage());

        return ReadersinfoMapper.maptoReadersinfoDto(readersinfoRepository.save(reader));
    }
}
