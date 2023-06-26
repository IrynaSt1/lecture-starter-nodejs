import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  showList(object) {
    const list = userRepository.getAll(object);
    if(list.length === 0) {
        return null;
    }

    return list;
}

createUser(body) {
    const newUser = userRepository.create(body);
    if(!newUser) {
        return null;
    }

    return newUser;
}

updateUser(id, changes) {
    const updation = userRepository.update(id, changes);
    console.log(chan, 'updated');
    return updation;
}

deleteUser(id) {
    const deletion = userRepository.delete(id);
    if(deletion.length === 0) {
        return null;
    }

    return deletion;
}
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
