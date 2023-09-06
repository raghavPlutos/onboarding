const { Model } = require('objection');

class Voucher extends Model {
  static get tableName() {
    return 'vouchers';
  };

//   $afterFind(){
//     console.log(this.email);
//   }

  // $beforeUpdate() {
  //   this.updatedAt = new Date();
  // };


    static get codeColumn() {
        return 'code';
    };

    static get companyNameColumn() {
        return 'company_name';
    };

    static get descriptionColumn() {
        return 'description';
    };

    static get expiryColumn() {
        return 'expiry';
    };

    static get typeColumn() {
        return 'type';
    };

    static get usedColumn() {
        return 'used';
    };

    static get usedByColumn() {
        return 'usedBy';
    };

  static get jsonSchema() {
    return {
      type: 'object',
      // required: ['code', 'type'],
      properties: {
        id: { type: 'integer' },
        code: { type: 'string', minLength: 1, maxLength: 20 },
        company_name: { type: 'string' },
        description: {type: 'string'},
        used: {type: 'boolean'},
        type: {type: 'string'},
        usedBy: {type: 'integer'},
        expiry: {type: 'string'},
      }
    };
  };

//   static relationMappings = {
//     order: {
//       relation: Model.HasOneRelation,
//       modelClass: Order,
//       join: {
//         from: 'customers.id',
//         to: 'orders.customer_id'
//       }
//     }
//   };

};

module.exports = Voucher;