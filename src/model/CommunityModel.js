export default class CommunityModel {
    constructor(Community) {
        this.id = Community.id;
        this.City = Community.get("City");
        this.street = Community.get("street");
        this.bulding = Community.get("building");

    }
}