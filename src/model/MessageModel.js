export default class MessageModel {
    constructor(messageModel) {
        this.createdBy = messageModel.get("createdBy");
        this.createdAt = messageModel.get("createdAt");
        this.title = messageModel.get("title");
        this.details = messageModel.get("details");
        this.priority = messageModel.get("priority");
        this.comments = messageModel.get("comments");


    }
}