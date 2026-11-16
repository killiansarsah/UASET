const assert = require('assert');
const { AuthService } = require('./src/auth');

console.log('[*] Running CloudPulse SaaS test suite...');
const auth = new AuthService();

// Test registration
const user = auth.register('alice@example.com', 'securePassword123');
assert.strictEqual(user.email, 'alice@example.com');
assert.strictEqual(user.role, 'member');

// Test password length constraint
assert.throws(() => auth.register('bob@example.com', 'short'), /Password must be at least 8 chars/);

// Test auth
const session = auth.authenticate('alice@example.com', 'securePassword123');
assert(session.token.startsWith('jwt_'));

console.log('[+] All CloudPulse SaaS tests passed (3/3 assertions verified).');
