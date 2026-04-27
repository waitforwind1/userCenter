package com.usst.usercenter.Exception;

import ch.qos.logback.core.spi.ErrorCodes;
import com.usst.usercenter.common.Result;
import com.usst.usercenter.common.ResultCode;
import lombok.Getter;

public class BusinessException extends RuntimeException{

    private  final int code;
    private final String description;

    // 全部自定义参数
    public BusinessException(int code, String message,String description){
        super(message);
        this.code = code;
        this.description = description;
    }

    // 使用定义好的枚举类型的参数和额外的description
    public BusinessException(ResultCode resultCode, String description){
        super(resultCode.getMsg());
        this.description = description;
        this.code = resultCode.getCode();
    }
    public Integer getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }
}
