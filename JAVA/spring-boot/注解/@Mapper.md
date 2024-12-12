`@Mapper` 和 `@Repository` 是Spring框架中用于不同目的的两个注解。
### `@Mapper` 注解：
- `@Mapper` 是MyBatis框架提供的注解，用于标记接口，告诉MyBatis为这个接口创建一个实现类，这个实现类会自动生成SQL语句并执行。
- 使用`@Mapper`注解后，不需要再手动编写实现类，MyBatis会通过接口的注解或XML配置文件来生成SQL语句。
- 在接口上使用`@Mapper`注解后，这个接口在编译时会被MyBatis处理，生成相应的代理类。
### `@Repository` 注解：
- `@Repository` 是Spring框架提供的注解，用于标记数据访问组件，即DAO层组件。
- 它表明该类具有数据访问操作的功能，通常用于数据库访问层。
- 使用`@Repository`注解可以使得Spring容器能够自动检测到这些组件，并注册为Bean。
- `@Repository`注解还可以结合异常处理，例如通过`@Repository`注解可以声明异常处理策略，使得数据访问层抛出的异常可以被Spring框架捕获并进行处理。
### 区别：
- `@Mapper`主要用于MyBatis框架，而`@Repository`是Spring框架的通用注解。
- `@Mapper`注解用于接口，而`@Repository`可以用于接口也可以用于类。
- `@Mapper`注解可以自动生成接口的实现类，而`@Repository`注解不会生成实现类，它只是标记作用。
### Mapper接口不写`@Mapper`注解会有问题吗？
如果你不使用`@Mapper`注解，可能会有以下几种情况：
1. **手动配置**：你可以在Spring配置文件中手动配置Mapper接口的扫描路径，这样即使没有`@Mapper`注解，MyBatis也能够识别并注册这些接口。
   ```java
   @Bean
   public MapperScannerConfigurer mapperScannerConfigurer() {
       MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
       mapperScannerConfigurer.setBasePackage("com.example.mapper");
       return mapperScannerConfigurer;
   }
   ```
2. **全注解配置**：如果你使用全注解配置，而没有在接口上使用`@Mapper`注解，并且没有进行上述的手动配置，那么MyBatis将不会为这些接口生成代理类，导致这些接口无法被注入和使用。
3. **无影响**：如果你使用的是XML配置方式来定义SQL映射，而不是注解方式，并且已经正确配置了MyBatis的XML文件路径，那么不使用`@Mapper`注解也不会有问题。
总之，如果你不使用`@Mapper`注解，你需要确保通过其他方式（如配置文件或全注解配置）来使得MyBatis能够识别和注册Mapper接口。如果没有进行适当的配置，那么Mapper接口将不会被识别，导致无法进行数据库操作。

在MyBatis-Plus的配置中，`type-aliases-package` 和 `global-config` 是用来配置MyBatis-Plus行为的两个关键部分。
### type-aliases-package
`type-aliases-package: xyz.xzgone.assemblyline.pojo` 这行配置告诉MyBatis-Plus去哪里查找POJO类（Plain Old Java Objects），这些类通常与数据库表结构相对应。MyBatis-Plus会为这些包下的类自动生成别名，这样在Mapper XML文件或注解中引用这些类时，就不需要写完整的包名，只需要使用类名即可。
### global-config
`global-config` 是用来配置MyBatis-Plus的全局配置，包括数据库配置、ID生成策略等。
#### db-config
在 `global-config` 下的 `db-config` 配置项中：
- `logic-delete-field: isDeleted` 表示配置逻辑删除的字段名。逻辑删除通常用于标记一个记录是否被逻辑删除（而不是物理删除），而不是真正从数据库中删除该记录。当这个字段被设置为特定的值（如1）时，表示记录已被逻辑删除。
- `id-type: auto` 配置了主键生成策略。`auto` 表示根据数据库方言自动选择合适的ID生成策略。例如，如果数据库是MySQL，可能会选择自增主键。
### @Mapper 注解
关于是否需要在每个Mapper接口上增加 `@Mapper` 注解的问题：
- 如果你已经在Spring Boot的配置文件中配置了MyBatis-Plus的Mapper扫描路径，那么通常不需要在每个Mapper接口上添加 `@Mapper` 注解。MyBatis-Plus会自动扫描配置的包路径下的所有接口，并为它们生成代理类。
例如，以下配置可以替代在每个Mapper接口上使用 `@Mapper` 注解：
```yaml
mybatis-plus:
  # ... 其他配置 ...
  mapper-locations: classpath*:mapper/*.xml # Mapper XML文件的位置
  type-aliases-package: xyz.xzgone.assemblyline.pojo
  global-config:
    # ... 其他配置 ...
  configuration:
    # ... 其他配置 ...
  # 配置Mapper接口的扫描路径
  mapper-scans:
    - xyz.xzgone.assemblyline.mapper
```
在这个配置中，`mapper-scans` 指定了Mapper接口所在的包路径，MyBatis-Plus会自动扫描这个路径下的所有接口。
因此，如果你已经配置了 `mapper-scans`，则不需要在每个Mapper接口上添加 `@Mapper` 注解。如果没有配置 `mapper-scans`，则需要 `@Mapper` 注解或者通过其他方式（如上面提到的 `MapperScannerConfigurer`）来确保Mapper接口被Spring容器识别。

`@Mapper` 注解是写在 Mapper 接口上的。Mapper 接口是 MyBatis（以及 MyBatis-Plus）中用来定义数据访问层的方法的地方，这些接口不需要实现类，因为 MyBatis 会使用代理模式在运行时自动生成接口的实现。
以下是一个使用 `@Mapper` 注解的示例：
```java
import org.apache.ibatis.annotations.Mapper;
import xyz.xzgone.assemblyline.pojo.YourEntity;
@Mapper
public interface YourEntityMapper {
    // 定义数据访问方法
    int insert(YourEntity entity);
    YourEntity selectById(Long id);
    // ... 其他方法 ...
}
```
在这个例子中，`@Mapper` 注解告诉 MyBatis 或 MyBatis-Plus 这个接口是一个 Mapper 接口，并且它应该被扫描和处理。
以下是关于 `@Mapper` 注解的几个要点：
- `@Mapper` 注解不需要写在 POJO 实体类上。实体类通常只是用来映射数据库表结构的 Java 类，并不直接参与 SQL 映射。
- `@Mapper` 注解也不需要写在 SQL 的 XML 文件上。XML 文件是用来定义具体的 SQL 语句和映射关系的，它们通常与 Mapper 接口相关联，但不需要注解。
- 如果你使用了 MyBatis-Plus 的全局配置来指定 Mapper 接口的扫描路径（如上面提到的 `mapper-scans` 配置），则不需要在每个 Mapper 接口上单独使用 `@Mapper` 注解。
总之，`@Mapper` 注解是专门用于 Mapper 接口上的。

主目录下的mapper文件夹默认是mapper接口的位置，自动加@mapper注解