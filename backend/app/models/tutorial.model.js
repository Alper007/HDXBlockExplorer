module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      address : String,
      hdx : String,
      shdx: String,
      ghdx: String,
      all: String
    },
    { timestamps: true }
  );

  // schema.method("toJSON", function() {
  //   const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  const AllMap = mongoose.model("AllMap", schema);
  return AllMap;
};

