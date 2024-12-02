`RedisTemplate` 提供了一系列方法来操作 Redis 中的哈希（Hash）数据结构。以下是一些常用的和不常用的哈希操作方法：
### 常用哈希操作方法
- `put(H key, HK hashKey, HV value)`: 将哈希表中的字段设置为值。
- `putAll(H key, Map<? extends HK, ? extends HV> m)`: 批量将映射关系添加到哈希表。
- `putIfAbsent(H key, HK hashKey, HV value)`: 仅当字段不存在时，将其设置为值。
- `get(H key, HK hashKey)`: 获取哈希表中指定字段的值。
- `multiGet(H key, Collection<HK> hashKeys)`: 从哈希表中获取多个字段的值。
- `values(H key)`: 获取哈希表中的所有值。
- `keys(H key)`: 获取哈希表中的所有字段名。
- `hasKey(H key, Object hashKey)`: 检查哈希表中是否存在指定的字段。
- `size(H key)`: 获取哈希表中字段的数量。
- `increment(H key, HK hashKey, long delta)`: 将哈希表中的整数字段增加指定的值。
- `increment(H key, HK hashKey, double delta)`: 将哈希表中的浮点数字段增加指定的值。
- `delete(H key, Object... hashKeys)`: 删除哈希表中的一个或多个指定字段。
### 不太常用的哈希操作方法
- `boundHashOps(H key)`: 返回绑定到指定键的哈希操作的实例，可以进一步执行操作。
- `scan(H key, ScanOptions options)`: 使用游标迭代哈希表中的键值对。
- `entries(H key)`: 获取哈希表中的所有键值对。
- `fromHash(H key, Class<T> type)`: 将哈希表转换成指定类型的对象。
- `toHash(T object)`: 将指定类型的对象转换成哈希表。
请注意，上述方法列表可能并不完整，因为 `RedisTemplate` 的实现可能会随着版本更新而发生变化。此外，`RedisTemplate` 提供了一些高级操作，如事务支持和发布/订阅消息，这些操作也可以应用于哈希数据结构。
要获取最准确的方法列表，建议查看 `RedisTemplate` 的 JavaDoc 或者直接查看源代码。这些文档和源代码通常会提供最新的方法列表和详细的用法说明。
