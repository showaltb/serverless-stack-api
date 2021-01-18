import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      // the attributes of the item to be created
      userId: event.requestContext.identity.cognitoIdentityId, // the id of the author
      noteId: uuid.v1(), // a unique uuid
      content: data.content, // from the request
      attachment: data.attachment, // from the request
      createdAt: Date.now(), // current timestamp
    }
  };
  await dynamoDb.put(params);
  return params.Item;
});
