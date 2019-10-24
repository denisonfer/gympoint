class UserController {
  async index(req, res) {
    return res.json({ ok: 'userController' });
  }
}
export default new UserController();
