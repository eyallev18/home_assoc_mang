export default class CommunityModel {
    constructor(community) {
        this.id = community.id;
        this.lname = community.get("City");
        this.email = community.get("street");
        this.apartment = community.get("building");

    }
}