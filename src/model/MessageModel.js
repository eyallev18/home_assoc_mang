export default class MessageModel {
    constructor(messageModel) {
        this.id = messageModel.get("objectId");
        this.createdBy = messageModel.get("createdBy");
        this.createdAt = messageModel.get("createdAt");
        this.community = messageModel.get("community");
        this.title = messageModel.get("title");
        this.details = messageModel.get("details");
        this.priority = messageModel.get("priority");
        this.comments = messageModel.get("comments");


    }
}