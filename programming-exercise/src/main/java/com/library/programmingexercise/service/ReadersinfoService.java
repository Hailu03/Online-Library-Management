package com.library.programmingexercise.service;

import com.library.programmingexercise.dto.BookDto;
import com.library.programmingexercise.dto.ReadersinfoDto;
import com.library.programmingexercise.entity.ReadersInfo;

import javax.naming.AuthenticationException;
import java.util.List;

public interface ReadersinfoService {
    ReadersinfoDto addReaderInfo(ReadersinfoDto readerInfoDto);

    ReadersinfoDto findByEmail(String email);
    ReadersinfoDto authenticate(String email, String password) throws AuthenticationException;

    ReadersinfoDto saveImage(int readerID, byte[] imageData);

    List<ReadersinfoDto> getAllUsers();

    // update reader info
    ReadersinfoDto updateReadersinfo(Integer readerID, ReadersInfo readersinfo);
}