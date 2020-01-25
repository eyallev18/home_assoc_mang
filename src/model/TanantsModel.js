export default class TanantsModel {
    constructor(parseTanants) {
        this.id = parseTanants.get("apartment");
        this.lname = parseTanants.get("lname");
        this.email = parseTanants.get("email");
        this.apartment = parseTanants.get("apartment");
        this.isCommitteeMember = parseTanants.get("isCommitteeMember");
    }
}