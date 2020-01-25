import IssuesModel from './IssuesModel'
export default class VotingModel extends IssuesModel {
    constructor(votingModel) {
        super(votingModel.id, votingModel.createdBy, votingModel.createdAt, votingModel.details);
        this.options = votingModel.get("options");
        this.duedate = votingModel.get("duedate");
        this.vots = votingModel.get("vots");
    }
}