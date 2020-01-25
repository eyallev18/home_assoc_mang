export default class IssuesModel {
    constructor(issuesModel) {
        this.id = issuesModel.id;
        this.createdBy = issuesModel.get("createdBy");
        this.createdAt = issuesModel.get("createdAt");
        this.title = issuesModel.get("title");
        this.details = issuesModel.get("details");
        this.img = issuesModel.get("image")._url;
        this.priority = issuesModel.get("priority");
        this.status = issuesModel.get("status");
        this.comments = issuesModel.get("comments");
    }
}