CREATE TABLE `user` (
                        `username` varchar(512) DEFAULT NULL COMMENT '用户名',
                        `id` bigint NOT NULL AUTO_INCREMENT,
                        `email` varchar(256) DEFAULT NULL COMMENT '邮箱',
                        `phone` int DEFAULT NULL COMMENT '电话',
                        `avatarUrl` varchar(512) DEFAULT NULL COMMENT '头像',
                        `isDelete` tinyint DEFAULT '0',
                        `gender` tinyint DEFAULT NULL COMMENT '性别',
                        `status` int DEFAULT '0' COMMENT '状态 0-正常',
                        `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                        `updateTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
                        `account` varchar(512) NOT NULL COMMENT '账号',
                        `password` varchar(512) NOT NULL COMMENT '密码',
                        `userRole` int NOT NULL DEFAULT '0' COMMENT '用户角色  0-普通用户  1-管理员',
                        `planetCode` varchar(256) DEFAULT NULL COMMENT '星球唯一编码',
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

