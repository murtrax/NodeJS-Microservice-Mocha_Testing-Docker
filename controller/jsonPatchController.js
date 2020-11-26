const { applyOperation } = require('fast-json-patch');

exports.jsonPatch = (req, res) => {
  try {
    let { obj, patchObj } = req.body;
    obj = applyOperation(obj, patchObj).newDocument;
    return res.status(200).json({
      status: 'success',
      data: {
        obj,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      data: {
        message: 'Could not perform JSON patch',
      },
    });
  }
};
