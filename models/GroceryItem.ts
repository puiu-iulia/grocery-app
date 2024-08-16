import { BSON, Realm } from 'realm';

export class GroceryItem extends Realm.Object<GroceryItem> {
  _id: BSON.ObjectId = new BSON.ObjectId();
  name!: string;
  isPurchased: boolean = false;
  createdAt: Date = new Date();
  user_id!: string;

  static primaryKey = '_id';
}
