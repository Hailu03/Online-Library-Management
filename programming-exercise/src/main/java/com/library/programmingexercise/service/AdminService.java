package com.library.programmingexercise.service;

import com.library.programmingexercise.dto.AdminDto;

import javax.naming.AuthenticationException;

public interface AdminService {
    AdminDto createAdmin(AdminDto adminDto);
//    AdminDto updateAdminAvatar(Integer adminId, String avatarUrl);

    AdminDto findByEmail(String email);
    AdminDto authenticate(String email, String password) throws AuthenticationException;

    AdminDto saveImage(int adminID, byte[] imageData);
}
