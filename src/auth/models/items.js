const itemsModel = (sequelize, DataTypes) => sequelize.define('items', {
    name: { type: DataTypes.STRING, required: true },
    assignedTo: { type: DataTypes.STRING, required: true },
    difficulty: { type: DataTypes.STRING, required: true }
    
  });
  
function unique(string){
  let hash =new  Hashmap(20)
  let arr=string.split(" ");
  arr.forEach(element => {
    hash.set("1",element);
  });
  
  return hash.key.length==arr.length
}
  module.exports = itemsModel;