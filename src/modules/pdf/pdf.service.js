const Pdf = require("./pdf.model");

exports.findAll = (query) => Pdf.find(query);
exports.create = (data) => Pdf.create(data);
exports.update = (id, data) =>
  Pdf.findByIdAndUpdate(id, data, { new: true, runValidators: true });
exports.delete = (id) => Pdf.findByIdAndDelete(id);