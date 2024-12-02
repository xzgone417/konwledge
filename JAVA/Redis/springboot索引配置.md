在 Spring Boot 应用中配置 Redis，通常涉及以下几个步骤：
1. **添加依赖**：首先，在你的 `pom.xml` 或 `build.gradle` 文件中添加 Spring Boot Redis 的起步依赖。
对于 Maven，添加以下依赖：
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```
对于 Gradle，添加以下依赖：
```groovy
implementation 'org.springframework.boot:spring-boot-starter-data-redis'
```
2. **配置 Redis**：在 `application.properties` 或 `application.yml` 文件中配置 Redis 服务器和数据库信息。
在 `application.properties` 文件中：
```properties
# Redis服务器地址
spring.redis.host=localhost
# Redis服务器连接端口
spring.redis.port=6379
# Redis数据库索引（默认为0）
spring.redis.database=0
# Redis服务器连接密码（默认为空）
spring.redis.password=
# 连接池最大连接数（使用负值表示没有限制）
spring.redis.jedis.pool.max-active=8
# 连接池最大阻塞等待时间（使用负值表示没有限制）
spring.redis.jedis.pool.max-wait=-1ms
# 连接池中的最大空闲连接
spring.redis.jedis.pool.max-idle=8
# 连接池中的最小空闲连接
spring.redis.jedis.pool.min-idle=0
# 连接超时时间（毫秒）
spring.redis.timeout=3000ms
```
在 `application.yml` 文件中：
```yaml
spring:
  redis:
    host: localhost
    port: 6379
    database: 0
    password: 
    jedis:
      pool:
        max-active: 8
        max-wait: -1ms
        max-idle: 8
        min-idle: 0
    timeout: 3000ms
```
3. **配置 RedisTemplate**：如果你需要自定义 `RedisTemplate` 的配置，可以创建一个配置类。
```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
@Configuration
public class RedisConfig {
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        // 使用StringRedisSerializer来序列化和反序列化redis的key值
        template.setKeySerializer(new StringRedisSerializer());
        // 设置hash key 和value序列化模式
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());
        // 设置value的序列化采用FastJsonRedisSerializer
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        // 设置支持事物
        template.afterPropertiesSet();
        return template;
    }
}
```
4. **使用 RedisTemplate**：在 Spring Boot 应用中，你可以通过自动装配来使用 `RedisTemplate`。
```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
@Service
public class RedisService {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    public void setValue(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }
    public Object getValue(String key) {
        return redisTemplate.opsForValue().get(key);
    }
    
    // 其他操作...
}
```
通过以上步骤，你就可以在 Spring Boot 应用中配置和使用 Redis 了。如果你需要操作特定的数据库实例，可以在 `application.properties` 或 `application.yml` 文件中设置 `spring.redis.database` 属性，或者在代码中通过 `RedisTemplate` 的 `select` 方法来选择数据库。
