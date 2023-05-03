const userSchema = new Schema({
  displayName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    addressLine1: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    }
  },
  created_at: {
    type: Number,
    default: Date.now().valueOf(),
  },
  updated_at: {
    type: Number,
    default: Date.now().valueOf(),
  },
},
{
  versionKey: 'schemaVersion'
});

module.exports = mongoose.model("User", userSchema);
