是的，可以指定副表的 `doc_id`为外键指向主表的 `doc_id`，即使副表的 `doc_id`可以有多个相同值。在这种情况下，副表中的 `doc_id`字段将引用主表中的 `doc_id`字段，形成一对多的关系。
要查询主表中 `doc_id`等于1的所有记录，并且同时查出所有副表中 `doc_id`等于1的数据，你可以使用SQL的 `JOIN`操作。以下是一个使用 `INNER JOIN`的示例，它将返回主表中 `doc_id`等于1的记录以及与之关联的副表记录：

```sql
SELECT *
FROM main_table AS m
INNER JOIN sub_table AS s ON m.doc_id = s.doc_id
WHERE m.doc_id = 1;
```

在这个查询中：

- `main_table` 是主表的别名，`sub_table` 是副表的别名。
- `INNER JOIN` 用于连接主表和副表，基于它们共有的 `doc_id`字段。
- `ON m.doc_id = s.doc_id` 是连接条件，指定了如何匹配两表中的记录。
- `WHERE m.doc_id = 1` 是过滤条件，它限制了结果只包含主表中 `doc_id`等于1的记录及其对应的副表记录。
  如果你想要确保即使副表中没有与主表 `doc_id`等于1的记录相对应的数据，也要返回主表的记录，你可以使用 `LEFT JOIN`：

```sql
SELECT *
FROM main_table AS m
LEFT JOIN sub_table AS s ON m.doc_id = s.doc_id
WHERE m.doc_id = 1;
```

在这个查询中，`LEFT JOIN`确保了即使副表中没有匹配的记录，主表中的记录也会被返回，副表中的列将显示为NULL。
