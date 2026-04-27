package com.usst.usercenter.common;

public class ResultUtils {
    public static <T> Result<T> success(T data){
        return new Result<>(ResultCode.SUCCESS,data,null);
    }
    public static <T> Result<T> error(ResultCode resultCode,String description){
        return new Result<>(resultCode.getCode(),resultCode.getMsg(),null,description);
    }
    public static <T> Result<T> error(int code,String msg,String description){
        return new Result<>(code,msg,null,description);
    }


}
