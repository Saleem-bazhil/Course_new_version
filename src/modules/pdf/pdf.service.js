import Pdf from "./pdf.model.js";

export const findAll = (query) => Pdf.find(query);
export const findById = (id) => Pdf.findById(id);
export const create = (data) => Pdf.create(data);
export const update = (id, data) =>
  Pdf.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const deletePdf = (id) => Pdf.findByIdAndDelete(id);
