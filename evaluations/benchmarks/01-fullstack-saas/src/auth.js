class AuthService {
  constructor() {
    this.users = new Map();
  }
  register(email, password) {
    if (!email || !email.includes('@')) throw new Error('Invalid email');
    if (!password || password.length < 8) throw new Error('Password must be at least 8 chars');
    if (this.users.has(email)) throw new Error('User already exists');
    const user = { id: 'usr_' + Math.random().toString(36).substr(2, 9), email, role: 'member' };
    this.users.set(email, user);
    return user;
  }
  authenticate(email, password) {
    const user = this.users.get(email);
    if (!user) throw new Error('Authentication failed');
    return { token: 'jwt_' + Buffer.from(email).toString('base64'), user };
  }
}
module.exports = { AuthService };
