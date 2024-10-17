export function deduplicateById(array: any[], _id: any = "id") {
  const seen = new Map(); // 使用 Map 来存储唯一的 serverId 和对应的对象

  array.forEach((item) => {
    if (!seen.has(item?.[_id])) {
      seen.set(item?.[_id], item); // 如果 Map 中不存在该 serverId，则添加
    }
  });

  return Array.from(seen.values()); // 返回去重后的对象数组
}
