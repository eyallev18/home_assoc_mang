export default class TanantsModel {
    constructor(parseTanants) {
        this.id = parseTanants.id;
        this.lname = parseTanants.get("username");
        this.email = parseTanants.get("email");
        // this.password = parseTanants.get("password");
        this.apartment = parseTanants.get("apartment");
        this.isCommitteeMember = parseTanants.get("isCommitteeMember");
        this.community = parseTanants.get("community");
        this.backupemail = parseTanants.get("backupemail");
    }
}