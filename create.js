import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context) {
  // request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      // the attributes of the item to be created
      userId: "123", // the id of the author
      noteId: uuid.v1(), // a unique uuid
      content: data.content, // from the request
      attachment: data.attachment, // from the request
      createdAt: Date.now(), // current timestamp
    }
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    };
  }
  catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
}
