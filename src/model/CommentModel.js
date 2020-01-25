import IssuesModel from './IssuesModel'
export default class CommentModel extends IssuesModel {
    constructor(commentModel) {
        super(commentModel.id, commentModel.createdBy, commentModel.createdAt);
        this.text = commentModel.get("text");
        this.comments = commentModel.get("comments");
    }
}