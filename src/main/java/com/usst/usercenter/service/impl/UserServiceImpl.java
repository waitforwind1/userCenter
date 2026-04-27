package com.usst.usercenter.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.usst.usercenter.Exception.BusinessException;
import com.usst.usercenter.common.ResultCode;
import com.usst.usercenter.common.ResultUtils;
import com.usst.usercenter.constant.UserConstant;
import com.usst.usercenter.model.DTO.UserDTO;
import com.usst.usercenter.model.User;
import com.usst.usercenter.service.UserService;
import com.usst.usercenter.mapper.UserMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.nio.charset.StandardCharsets;

import static com.usst.usercenter.constant.UserConstant.USER_LOGIN_STATE;

/**
* @author 22097
* @description 针对表【user】的数据库操作Service实现
* @createDate 2026-04-21 20:22:00
*/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
    implements UserService{
    private static final String SALT = "kyrie";


    @Override
    public long userRegister(String account, String password, String checkPassword,String planetCode) {
        if(StringUtils.isAnyBlank(account,password,checkPassword)){
            throw new BusinessException(ResultCode.PARAMS_ERROR,"输入错误");
        }
        if(account.length()<4||password.length()<6){
            throw new BusinessException(ResultCode.PARAMS_ERROR,"输入格式错误");
        }
        if(!password.equals(checkPassword)){
            throw new BusinessException(ResultCode.PARAMS_ERROR,"两次输入密码不相等");
        }
        String regExp = "^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![_]+$)[0-9_A-Za-z]{3,19}$";
        if(!account.matches(regExp)){
            throw new BusinessException(ResultCode.PARAMS_ERROR,"账号格式错误");
        }
        // 账户不能重复 以及 星球编号不能重复 中间用or
        QueryWrapper<User> queryWrapper= new QueryWrapper<>();
        queryWrapper.eq("account",account)
                .or()
                .eq("planetCode",planetCode);
        long count = this.count(queryWrapper);
        if(count > 0){
            throw new BusinessException(ResultCode.ACCOUNT_EXIST,"该账号已注册");
        }
        String encyptPassword = DigestUtils.md5DigestAsHex((SALT+password).getBytes(StandardCharsets.UTF_8));
        User user= new User();
        user.setAccount(account);
        user.setPassword(encyptPassword);
        user.setPlanetCode(planetCode);
        this.save(user);
        return user.getId();
    }
    @Override
    public UserDTO login(String account, String password, HttpServletRequest request) {
        //加密
        String encrptPassword = DigestUtils.md5DigestAsHex((SALT+password).getBytes(StandardCharsets.UTF_8));
        QueryWrapper<User> queryWrapper= new QueryWrapper<>();
        queryWrapper.eq("account",account);
        queryWrapper.eq("password",encrptPassword);
        User user = this.getOne(queryWrapper);
        // 用户不存在
        if(user==null){
            throw new BusinessException(ResultCode.PARAMS_ERROR,"用户不存在");
        }

        //校验格式
        String regExp = "^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![_]+$)[0-9_A-Za-z]{3,19}$";
         if(!account.matches(regExp)){
             throw new BusinessException(ResultCode.ERROR,"账号格式不正确");
         }
         if(password.length()<6)
             throw new BusinessException(ResultCode.PARAMS_ERROR,"密码长度小于6");

        //脱敏
        UserDTO userDTO= getsafeUser(user);
        // 设置用户态
        request.getSession().setAttribute(USER_LOGIN_STATE,userDTO);
        return userDTO;
    }

    @Override
    public int logout(HttpServletRequest request) {
        request.getSession().removeAttribute(USER_LOGIN_STATE);
        throw new BusinessException(ResultCode.SUCCESS,"用户已注销");
    }

    @Override
    public UserDTO getsafeUser(User user){
        if(user==null)
            return null;
        UserDTO userDTO= new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setPlanetCode(user.getPlanetCode());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhone(user.getPhone());
        userDTO.setAvatarUrl(user.getAvatarUrl());
        userDTO.setGender(user.getGender());
        userDTO.setStatus(user.getStatus());
        userDTO.setCreateTime(user.getCreateTime());
        userDTO.setUpdateTime(user.getUpdateTime());
        userDTO.setAccount(user.getAccount());
        userDTO.setUserRole(user.getUserRole());
        return userDTO;
    }


}




