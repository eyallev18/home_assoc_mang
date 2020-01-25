export default class VotingModel {
    constructor(votingModel) {
        this.id = votingModel.id;
        this.votedBy = votingModel.get("votedBy");
        this.vote = votingModel.get("vote");

    }
}