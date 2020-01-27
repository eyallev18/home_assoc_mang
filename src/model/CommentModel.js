export default class CommentModel {
    constructor(commentModel) {
        this.id = issuesModel.id;
        this.createdBy = commentModel.get("createdBy");
        this.createdAt = commentModel.get("createdAt");
        this.text = commentModel.get("text");
        this.comments = commentModel.get("comments");
    }
}