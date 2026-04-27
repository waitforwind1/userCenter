package com.usst.usercenter.common;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class Result<T> implements Serializable {
    private int code;
    private String msg;
    private T data;
    private String description;

    public Result(ResultCode resultCode,T data,String description){
        this(resultCode.getCode(),resultCode.getMsg(),data,description);
    }
    public Result(ResultCode resultCode){
        this(resultCode.getCode(),resultCode.getMsg(),null,null);
    }

}
