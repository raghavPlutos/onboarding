const { Model } = require('objection');
const bcrypt = require("bcrypt");
const Voucher = require("./Vouchers");

class Customer extends Model {
  static get tableName() {
    return 'customers';
  };

  async $beforeInsert() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
  };

//   $afterFind(){
//     console.log(this.email);
//   }

  // $beforeUpdate() {
  //   this.updatedAt = new Date();
  // };

    static get nameColumn() {
        return 'name';
    };

    static get emailColumn() {
        return 'email';
    };

    static get passwordColumn() {
        return 'password';
    };

    static get roleColumn() {
        return 'role';
    };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string' },
        password: {type: 'string'},
        role: {type: 'string'}
        // createdAt: { type: 'string' },
        // updatedAt: { type: 'string' }
      }
    };
  };

  static relationMappings = {
    order: {
      relation: Model.HasOneRelation,
      modelClass: Voucher,
      join: {
        from: 'id',
        to: 'voucher.usedBy'
      }
    }
  };

};

module.exports = Customer;