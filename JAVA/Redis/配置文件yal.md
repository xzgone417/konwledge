
这些配置是用于在Spring Boot应用中配置Redis数据库连接的参数。下面是对每个配置项的解释：
1. `host`: Redis服务器的地址。这里设置为`localhost`，表示Redis服务器运行在本机上。
2. `port`: Redis服务器监听的端口号。默认端口号是`6379`。
3. `password`: 连接Redis服务器的密码。这里设置为`xzgone1`，表示需要使用这个密码才能连接到Redis服务器。
4. `jedis`: jedis是一个Java编写的Redis客户端，这里配置的是jedis连接池的相关参数。
   - `pool.max-active`: 连接池中最大活跃连接数。这里设置为`10`，表示连接池中最多可以有10个活跃的连接。
   - `pool.max-idle`: 连接池中最大空闲连接数。这里设置为`5`，表示连接池中最多可以有5个空闲的连接。
   - `pool.min-idle`: 连接池中最小空闲连接数。这里设置为`0`，表示连接池中可以没有空闲连接。
   - `pool.max-wait`: 当连接池中没有可用连接时，最大等待时间。这里设置为`-1ms`，表示无限期等待，直到有可用连接为止。
这些配置确保了Spring Boot应用能够高效、安全地与Redis服务器进行交互。通过合理配置连接池参数，可以避免资源浪费，同时提高应用的性能。

在Redis中，数据库是通过索引来选择的，默认情况下，Redis有16个数据库（从0到15）。要更改配置以选择特定的数据库（比如db2），你需要在配置文件中添加一个`database`属性，并将其值设置为数据库的索引。对于db2，索引是2。
以下是Spring Boot应用中配置Redis并选择db2的示例：
```yaml
redis:
  host: localhost
  port: 6379
  password: xzgone1
  database: 2  # 选择db2
  jedis:
    pool:
      max-active: 10
      max-idle: 5
      min-idle: 0
      max-wait: -1ms
```
在这个配置中，`database: 2` 这一行指示Spring Boot应用连接到Redis的第二个数据库（db2）。这样，所有通过这个配置创建的Redis连接都会默认操作在db2上。
确保在Spring Boot的配置文件（通常是`application.yml`或`application.properties`）中添加或修改上述配置。这样，当你的应用启动时，它就会使用指定的Redis数据库。
