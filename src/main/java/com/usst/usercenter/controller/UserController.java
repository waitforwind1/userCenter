package com.usst.usercenter.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.usst.usercenter.Exception.BusinessException;
import com.usst.usercenter.common.ResultCode;
import com.usst.usercenter.constant.UserConstant;
import com.usst.usercenter.model.DTO.UserDTO;
import com.usst.usercenter.model.Request.UserLoginRequest;
import com.usst.usercenter.model.Request.UserRegisterRequest;
import com.usst.usercenter.model.User;
import com.usst.usercenter.service.UserService;
import com.usst.usercenter.common.Result;
import com.usst.usercenter.common.ResultUtils;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.usst.usercenter.constant.UserConstant.ADMIN_ROLE;
import static com.usst.usercenter.constant.UserConstant.USER_LOGIN_STATE;

@RestController
@RequestMapping("/user")
public class UserController  {
    @Resource
    private UserService userService;

    @PostMapping("/register")
    public Result<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest){
        if(userRegisterRequest==null)
            throw new BusinessException(ResultCode.PARAMS_ERROR,"注册属性为空");
        String account = userRegisterRequest.getAccount();
        String password = userRegisterRequest.getPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        String planteCode = userRegisterRequest.getPlanetCode();
        if(StringUtils.isAnyBlank(account,password,checkPassword)){
            throw new BusinessException(ResultCode.PARAMS_ERROR,"输入为空");
        }
        long userid = userService.userRegister(account, password, checkPassword,planteCode);
        if(userid==-1)
            throw new BusinessException(ResultCode.PARAMS_ERROR,"账号格式不正确");
        return ResultUtils.success(userid);
    }
    @PostMapping("/login")
    public Result<UserDTO> userLogin(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest httpServletRequest){
        if(userLoginRequest==null)
            throw new BusinessException(ResultCode.PARAMS_ERROR,"输入值为空");
        String account = userLoginRequest.getAccount();
        String password = userLoginRequest.getPassword();
        if(StringUtils.isAnyBlank(account,password)){
            throw new BusinessException(ResultCode.PARAMS_ERROR,"输入值为空");
        }
        UserDTO userDTO = userService.login(account, password, httpServletRequest);
        if(userDTO==null)
            throw new BusinessException(ResultCode.PARAMS_ERROR,"输入值为空");
        return ResultUtils.success(userDTO);
    }

    @GetMapping("/currentUser")
    public Result<UserDTO> getcurrentUser(HttpServletRequest request){
        Object attribute = request.getSession().getAttribute(USER_LOGIN_STATE);
        UserDTO userDTO=(UserDTO)attribute;
        // 这里是进行查库 因为直接取当时存储的状态的话有一些字段可能没有被更新 因此要查库
        if(userDTO==null)
            throw new BusinessException(ResultCode.PARAMS_ERROR,"用户已删除");
        long id =userDTO.getId();
        User user = userService.getById(id);
        UserDTO safeUser = userService.getsafeUser(user);
        if(safeUser==null)
            throw new BusinessException(ResultCode.PARAMS_ERROR,"用户不存在");
        return ResultUtils.success(safeUser);

    }
    @PostMapping("/logout")
    public Result<Integer> userLogout(HttpServletRequest httpServletRequest){
        if(httpServletRequest==null)
            throw new BusinessException(ResultCode.PARAMS_ERROR,"未收到请求");
        int logout = userService.logout(httpServletRequest);
        if(logout==0)
            throw new BusinessException(ResultCode.PARAMS_ERROR,"用户不存在");
        return ResultUtils.success(logout);
    }
    @GetMapping("/search")
    public Result<List<UserDTO>> searchUser(String username, HttpServletRequest httpServletRequest){
        if(!isAdmin(httpServletRequest))
            throw new BusinessException(ResultCode.NO_AUTH,"无权限");
        QueryWrapper<User> queryWrapper= new QueryWrapper<>();
        if(!StringUtils.isAnyBlank(username)){
            queryWrapper.like("username",username);
        }
        List<User> userlist = userService.list(queryWrapper);
        if(userlist==null)
            throw new BusinessException(ResultCode.PARAMS_ERROR,"用户不存在");
        List<UserDTO> list = userlist.stream().map(user -> {
            UserDTO userDTO = userService.getsafeUser(user);
            BeanUtils.copyProperties(user, userDTO);
            return userDTO;
        }).toList();
        return ResultUtils.success(list);
    }

    @PostMapping("/delete")
    public boolean deleteUser(Long id,HttpServletRequest httpServletRequest){
        if(!isAdmin(httpServletRequest))
            return false;
        if(id==null)
            return false;
        return userService.removeById(id);
    }

    private boolean isAdmin(HttpServletRequest httpServletRequest){
        Object attribute = httpServletRequest.getSession().getAttribute(UserConstant.USER_LOGIN_STATE);
        UserDTO userDTO =(UserDTO) attribute;
        return userDTO!=null && userDTO.getUserRole()==ADMIN_ROLE;
    }
}
