import { volunteer } from "./assets/volunteers";

let chrisRock = new volunteer("Chris Rock", 59, "Male", "1800-get-popt", "chris.rock@smakt.com", "123 Street Rd. Los Angeles", "Disney", "Host");

class Profile {
    constructor(name, age, gender, phone, email, address, company, position) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.company = company;
        this.position = position;
    }
}

export { Profile }