import File from '../models/file';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path });

    return res.json({ success: 'Arquivo salvo com sucesso!', file });
  }
}
export default new FileController();
