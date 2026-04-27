package com.usst.usercenter.model.DTO;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    /**
     *
     */
    private Long id;

    /**
     * 用户名
     */
    private String username;
    /**
     * 星球唯一编码
     *
     */
    private String planetCode;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 电话
     */
    private Integer phone;

    /**
     * 头像
     */
    private String avatarUrl;


    /**
     * 性别
     */
    private Integer gender;
    /**
     * 角色 0-普通用户  1-管理员
     */
    private Integer userRole;

    /**
     * 状态 0-正常
     */
    private Integer status;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改时间
     */
    private Date updateTime;

    /**
     * 账号
     */
    private String account;



}
