export default class TanantsModel {
    constructor(parseTanants) {
        this.userId = parseTanants.get("userId");
        this.lname = parseTanants.get("username");
        this.email = parseTanants.get("email");
        this.apartment = parseTanants.get("apartment");
        this.isCommitteeMember = parseTanants.get("isCommitteeMember");
    }
}