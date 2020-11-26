const download = require('image-downloader');
const sharp = require('sharp');

exports.thumbnailGenerator = async (req, res) => {
  const { url } = req.body;
  try {
    const options = {
      url,
      dest: `${__dirname}`,
    };

    const image = await download.image(options);
    const imageName = image.filename.split('.')[0];
    const imageExtension = image.filename.split('.')[1];

    await sharp(`${image.filename}`)
      .resize({ height: 50, width: 50 })
      .toFile(`${imageName}-resized.${imageExtension}`);

    res.sendFile(`${imageName}-resized.${imageExtension}`);
  } catch (err) {
    res.status(400).json({
      status: 'error',
      data: {
        message: 'something went wrong',
      },
    });
  }
};
