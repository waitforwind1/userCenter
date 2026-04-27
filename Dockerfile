# syntax=docker/dockerfile:1

# 第一阶段：使用 Maven 构建 jar 注意版本号
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# 先复制 Maven 配置文件，方便利用 Docker 缓存  是否有MVNW
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# 下载依赖
RUN --mount=type=cache,target=/root/.m2 \
    ./mvnw dependency:go-offline

# 再复制源码
COPY src ./src

# 打包项目，跳过测试
RUN --mount=type=cache,target=/root/.m2 \
    ./mvnw clean package -DskipTests


# 第二阶段：只保留运行环境
FROM eclipse-temurin:17-jre

WORKDIR /app

# 从构建阶段复制 jar 包
COPY --from=builder /app/target/*.jar app.jar

# Spring Boot 默认端口 注意端口号
EXPOSE 8080

# 启动项目
ENTRYPOINT ["java", "-jar", "app.jar"]