在MyBatis中，传递参数到XML配置的SQL语句有几种不同的方式，包括单参数和多参数。下面是它们各自的用法和区别。

### 单参数

单参数传递是最简单的形式，MyBatis可以直接使用 `#{参数名}`来引用传递的参数。

#### XML配置示例：

```xml
<select id="selectDataByProject" resultType="com.example.model.ProjectData">
    SELECT * FROM your_table_name WHERE project_id = #{projectId}
</select>
```

在这个例子中，`projectId`是传递给 `selectDataByProject`方法的参数名。

#### 调用示例：

```java
List<ProjectData> projectDataList = projectDataMapper.selectDataByProject(123);
```

### 多参数

当方法需要传递多个参数时，MyBatis提供了几种不同的方式来处理这些参数。

#### 1. 使用索引

在XML中，可以使用 `#{索引}`来引用方法中的参数，索引从0开始。

#### XML配置示例：

```xml
<select id="selectDataByProjectAndStatus" resultType="com.example.model.ProjectData">
    SELECT * FROM your_table_name WHERE project_id = #{0} AND status = #{1}
</select>
```

#### 调用示例：

```java
List<ProjectData> projectDataList = projectDataMapper.selectDataByProjectAndStatus(123, 'active');
```

#### 2. 使用@param注解

在接口方法中，可以使用 `@Param`注解来为每个参数指定一个名字，然后在XML配置中使用这些名字。

#### 接口方法示例：

```java
List<ProjectData> selectDataByProjectAndStatus(@Param("projectId") Integer projectId, @Param("status") String status);
```

#### XML配置示例：

```xml
<select id="selectDataByProjectAndStatus" resultType="com.example.model.ProjectData">
    SELECT * FROM your_table_name WHERE project_id = #{projectId} AND status = #{status}
</select>
```

#### 调用示例：

```java
List<ProjectData> projectDataList = projectDataMapper.selectDataByProjectAndStatus(123, 'active');
```

#### 3. 使用Map

可以传递一个Map对象，其中包含所有需要的参数，然后在XML配置中使用Map的键来引用这些参数。

#### 调用示例：

```java
Map<String, Object> params = new HashMap<>();
params.put("projectId", 123);
params.put("status", 'active');
List<ProjectData> projectDataList = projectDataMapper.selectDataByProjectAndStatus(params);
```

#### XML配置示例：

```xml
<select id="selectDataByProjectAndStatus" resultType="com.example.model.ProjectData">
    SELECT * FROM your_table_name WHERE project_id = #{projectId} AND status = #{status}
</select>
```

### 区别

- **单参数**：简单直观，直接使用参数名或者索引（通常是0）即可。
- **多参数**：

  - **索引**：容易出错，因为需要记住参数的顺序。
  - **@Param注解**：更清晰，参数名可以提供更好的可读性。
  - **Map**：灵活，可以传递任意数量的参数，但可能不如注解方式直观。
    在实际使用中，`@Param`注解是最常用的方式，因为它提供了清晰性和易用性。使用Map则提供了最大的灵活性，尤其是在动态构建查询参数时。索引方式通常不推荐，因为它容易出错且不易维护。
  - 


  在MyBatis中，如果你传入一个对象参数，你可以在XML映射文件中使用 `#{}`占位符来引用对象的属性。下面是一个例子，假设你有一个 `Project`类，它有一个 `id`属性，你需要在MyBatis的XML映射文件中使用这个属性。
  首先，这是 `Project`类的简单定义：

  ```java
  public class Project {
      private Integer id;
      // 其他属性和方法
      // getter和setter方法
      public Integer getId() {
          return id;
      }
      public void setId(Integer id) {
          this.id = id;
      }
      // ... 其他属性和方法的getter和setter
  }
  ```
  然后，在MyBatis的XML映射文件中，你可以这样使用 `Project`对象的 `id`属性：

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
  <mapper namespace="YourMapperNamespace">
    <!-- 使用Project对象的id属性 -->
    <select id="selectProjectById" resultType="Project">
      SELECT * FROM project_table WHERE id = #{id}
    </select>
    <!-- 插入操作，使用Project对象的属性 -->
    <insert id="insertProject" parameterType="Project">
      INSERT INTO project_table (id, other_field)
      VALUES (#{id}, #{otherField})
    </insert>
    <!-- 更新操作，使用Project对象的属性 -->
    <update id="updateProject" parameterType="Project">
      UPDATE project_table
      SET other_field = #{otherField}
      WHERE id = #{id}
    </update>
    <!-- 根据Project对象的id属性进行upsert操作 -->
    <insert id="upsertProject" parameterType="Project">
      INSERT INTO project_table (id, other_field)
      VALUES (#{id}, #{otherField})
      ON DUPLICATE KEY UPDATE
      other_field = VALUES(other_field)
    </insert>
  </mapper>
  ```
  在这个例子中，`#{id}`和 `#{otherField}`是占位符，它们分别代表传入的 `Project`对象的 `id`和 `otherField`属性。MyBatis会自动调用 `Project`对象的相应getter方法来获取这些属性的值。
  确保在 `<mapper>`标签的 `namespace`属性中填写正确的Mapper接口的全限定名，并且在你的Mapper接口中定义与XML文件中 `id`相对应的方法。例如：

  ```java
  public interface ProjectMapper {
      Project selectProjectById(Integer id);
      void insertProject(Project project);
      void updateProject(Project project);
      void upsertProject(Project project);
  }
  ```
  通过这种方式，你可以在MyBatis的XML映射文件中使用传入的对象参数的属性
