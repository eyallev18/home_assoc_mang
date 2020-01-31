export default class TanantsModel {
    constructor(parseTanants) {
        this.id = parseTanants.get("objectId");
        this.lname = parseTanants.get("username");
        this.email = parseTanants.get("email");
        this.apartment = parseTanants.get("apartment");
        this.isCommitteeMember = parseTanants.get("isCommitteeMember");
        this.community = parseTanants.get("community");
    }
}