package com.usst.usercenter.common;

public enum ResultCode {

    ACCOUNT_EXIST(10001, "账号已存在"),
    ACCOUNT_NOT_EXIST(10002, "账号不存在"),
    PASSWORD_ERROR(10003, "密码错误"),
    USER_NOT_EXIST(10004, "用户不存在"),

    TOKEN_INVALID(20001, "Token无效"),
    TOKEN_EXPIRED(20002, "Token已过期"),
    SUCCESS(200,"ok"),
    PARAMS_ERROR(400001,"请求参数错误"),
    PARAMS_NULL_ERROR(400002,"参数为空"),
    NOT_LOGIN(40101,"未登录"),
    NO_AUTH(40102,"无权限"),
    ERROR(500,"系统异常");


    /**
     * 状态码
     */
    private final int code;

    /**
     * 状态码消息
     */
    private final String msg;

    ResultCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
    public int getCode(){
        return code;
    }
    public String getMsg(){
        return msg;
    }
}
