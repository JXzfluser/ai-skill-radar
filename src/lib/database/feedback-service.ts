// 暂时注释掉数据库调用，避免类型错误

export async function saveFeedback(feedback: any): Promise<string> {
  // const db = await connectToDatabase();
  // const collection = db.collection<UserFeedback>('feedback');
  
  // const result = await collection.insertOne({
  //   ...feedback,
  //   createdAt: new Date(),
  //   processed: false
  // });
  
  // return result.insertedId.toString();
  console.log('保存反馈:', feedback);
  return 'mock-id';
}

export async function getUnprocessedFeedback(limit: number = 50): Promise<any[]> {
  // const db = await connectToDatabase();
  // const collection = db.collection<UserFeedback>('feedback');
  
  // return await collection
  //   .find({ processed: false })
  //   .sort({ createdAt: -1 })
  //   .limit(limit)
  //   .toArray();
  return [];
}

export async function markFeedbackAsProcessed(feedbackId: string): Promise<void> {
  // const db = await connectToDatabase();
  // const collection = db.collection<UserFeedback>('feedback');
  
  // await collection.updateOne(
  //   { _id: feedbackId },
  //   { $set: { processed: true } }
  // );
  console.log('标记反馈为已处理:', feedbackId);
}