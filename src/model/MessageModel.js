import IssuesModel from './IssuesModel'
export default class MessageModel extends IssuesModel {
    constructor(messageModel) {
        super(messageModel.id, messageModel.createdBy, messageModel.createdAt, messageModel.titles, messageModel.details, messageModel.priority, messageModel.comments);

    }
}