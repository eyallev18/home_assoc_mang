export default class VoteModel {
    constructor(voteModel) {
        this.id = voteModel.id;
        this.votedBy = voteModel.get("votedBy");
        this.vote = voteModel.get("vote");
        this.voteId = voteModel.get("voteId");

    }
}