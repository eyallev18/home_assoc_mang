export default class VotingModel {
    constructor(votingModel) {
        this.id = votingModel.id;
        this.createdBy = votingModel.get("createdBy");
        this.createdAt = votingModel.get("createdAt");
        this.title = votingModel.get("title");
        this.details = votingModel.get("details");
        this.dueDate = votingModel.get("dueDate");
        this.votes = votingModel.get("votes");
        this.options = votingModel.get("options");


    }
}