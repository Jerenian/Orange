module.exports = class UserDto {
    login 
    id 
    isActivated 
    role
    constructor(model) {
        this.login = model.login
        this.id = model.id
        this.isActivated = model.isActivated
        this.role = model.role
    }

}

