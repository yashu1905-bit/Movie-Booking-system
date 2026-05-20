class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll(filter = {}) {
    return await this.model.find(filter).select('-password');
  }

  async findById(id) {
    return await this.model.findById(id).select('-password');
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { 
      returnDocument: 'after', 
      runValidators: true 
    });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;
