package com.usst.usercenter.service;

import com.sun.net.httpserver.HttpsServer;
import com.usst.usercenter.model.DTO.UserDTO;
import com.usst.usercenter.model.User;
import com.baomidou.mybatisplus.extension.service.IService;
import jakarta.servlet.http.HttpServletRequest;

/**
* @author 22097
* @description 针对表【user】的数据库操作Service
* @createDate 2026-04-21 20:22:00
*/
public interface UserService extends IService<User> {
    long userRegister(String account,String password,String checkPassword,String planetCode);
    UserDTO login(String account, String password, HttpServletRequest request);

    /**
     * 用户脱敏
     *
     * @param user
     * @return
     */
    UserDTO getsafeUser(User user);

    /**
     * 用户注销
     *
     * @param request
     * @return
     */
    int logout(HttpServletRequest request);
}
