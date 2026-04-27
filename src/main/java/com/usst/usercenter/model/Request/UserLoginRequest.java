package com.usst.usercenter.model.Request;

import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserLoginRequest implements Serializable {
    private static final long serialVersionUID = 2L;
    private String account;
    private String password;

}
