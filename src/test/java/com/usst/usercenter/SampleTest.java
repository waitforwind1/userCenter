package com.usst.usercenter;
import java.util.Date;

import com.baomidou.mybatisplus.core.toolkit.Assert;
import com.usst.usercenter.mapper.UserMapper;
import com.usst.usercenter.model.User;
import com.usst.usercenter.service.UserService;
import jakarta.annotation.Resource;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class SampleTest {

    @Resource
    private UserMapper userMapper;
    @Autowired
    private UserService userService;

    @Test
    public void testSelect() {
        User user= new User();
        user.setUsername("v的活动半径");
        user.setEmail("2209764827@qq.com");
        user.setPhone(134269047);
        user.setAvatarUrl("https://baomidou.com/en");
        user.setIsDelete(0);
        user.setGender(0);
        user.setStatus(0);
        user.setCreateTime(new Date());
        user.setUpdateTime(new Date());
        user.setAccount("kgyugvbh");
        user.setPassword("12ytguhui");
        boolean bol = userService.save(user);
        Assertions.assertTrue(bol);


    }

}
