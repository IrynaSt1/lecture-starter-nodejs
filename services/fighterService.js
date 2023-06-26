import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  showList(object) {
    const list = fighterRepository.getAll(object);
    if (list.length === 0) {
      return null;
    }

    return list;
  }

  createFighter(body) {
    const newFighter = fighterRepository.create(body);
    if (!newFighter) {
      return null;
    }

    return newFighter;
  }

  updateFighter(id, changes) {
    const updation = fighterRepository.update(id, changes);
    if (!updation) {
      return null;
    }

    return updation;
  }

  deleteFighter(id) {
    const deletion = fighterRepository.delete(id);
    if (deletion.length === 0) {
      return null;
    }

    return deletion;
  }
  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };
