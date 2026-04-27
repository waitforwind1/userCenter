package com.usst.usercenter.mapper;

import com.usst.usercenter.model.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;

/**
* @author 22097
* @description 针对表【user】的数据库操作Mapper
* @createDate 2026-04-21 20:22:00
* @Entity com.usst.usercenter.model.User
*/
@Mapper
public interface UserMapper extends BaseMapper<User> {

}




