var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}


var newSchema = new Schema({
  
  'title': { type: String, unique : true, required : true, dropDups: true },
  'body': { type: String },
  'tags': { type: [{ type: Schema.Types.ObjectId, ref: 'Tag' }] },
  'answers': { type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }] },
  'by': { type: Schema.Types.ObjectId, ref: 'User' },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



module.exports = mongoose.model('Question', newSchema);
