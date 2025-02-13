// 创建一个大数组填充随机数据
const bigArray = Array.from({ length: 1000000 }, () => ({
  id: Math.random(),
  data: "这是一些重复的文本数据".repeat(100),
  moreData: {
    field1: "更多数据".repeat(50),
    field2: "更多数据".repeat(50),
    field3: Array(1000).fill("数据")
  }
}));

export default bigArray; 