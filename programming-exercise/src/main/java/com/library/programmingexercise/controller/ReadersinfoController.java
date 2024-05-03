package com.library.programmingexercise.controller;

import com.library.programmingexercise.dto.BookDto;
import com.library.programmingexercise.dto.ReadersinfoDto;
import com.library.programmingexercise.entity.ReadersInfo;
import com.library.programmingexercise.mapper.ReadersinfoMapper;
import com.library.programmingexercise.service.ReadersinfoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.naming.AuthenticationException;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/readersinfo")
public class ReadersinfoController {
    private ReadersinfoService readersinfoService;

    @PostMapping
    public ResponseEntity<ReadersinfoDto> addReaderInfo(@RequestBody ReadersinfoDto readerInfoDto){
        ReadersinfoDto savedReaderInfo = readersinfoService.addReaderInfo(readerInfoDto);
        return new ResponseEntity<>(savedReaderInfo, HttpStatus.CREATED);
    }

    @GetMapping("/{email}")
    public ResponseEntity<ReadersinfoDto> getReadersinfoByEmail(@PathVariable("email") String email) {
        ReadersinfoDto readersinfoDto = readersinfoService.findByEmail(email);
        return new ResponseEntity<>(readersinfoDto, HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(@RequestBody ReadersinfoDto loginRequest) {
        try {
            // Perform authentication logic
            ReadersinfoDto readersinfoDto = readersinfoService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(readersinfoDto);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }
    }

    @PutMapping("/{readerID}")
    public ResponseEntity<ReadersinfoDto> updateReadersinfo(@PathVariable("readerID") int readerID, @RequestBody ReadersinfoDto readersinfoDto) {
        ReadersInfo readersinfo = ReadersinfoMapper.maptoReadersinfo(readersinfoDto);
        System.out.println(readersinfo.getImage());
        System.out.println(readersinfoDto.getImage());
        ReadersinfoDto updatedReadersinfo = readersinfoService.updateReadersinfo(readerID, readersinfo);
        return new ResponseEntity<>(updatedReadersinfo, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ReadersinfoDto>> getAllUsers() {
        List<ReadersinfoDto> users = readersinfoService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}