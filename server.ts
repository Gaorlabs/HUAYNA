import express, { Request, Response } from 'express';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory data store with JSON persistence file
const DATA_FILE = path.resolve(process.cwd(), '.huayna_data.json');

interface StoredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordSalt: string;
  passwordHash: string;
  address?: string;
  district?: string;
  reference?: string;
  fitPoints: number;
  createdAt: string;
}

interface StoredSession {
  token: string;
  userId: string;
  createdAt: string;
}

interface StoredOrder {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  items: any[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tip: number;
  total: number;
  address: string;
  district: string;
  reference: string;
  paymentMethod: string;
  status: 'recibido' | 'preparando' | 'en_camino' | 'entregado';
  createdAt: string;
  whatsappMessage: string;
}

interface AppData {
  users: StoredUser[];
  sessions: StoredSession[];
  orders: StoredOrder[];
}

let data: AppData = {
  users: [],
  sessions: [],
  orders: []
};

// Load data if available
try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    data = JSON.parse(raw);
  }
} catch (e) {
  console.log('Using fresh in-memory data store');
}

function saveData() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    // ignore in read-only environment
  }
}

// Password hashing helpers
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Seed demo user if empty
if (data.users.length === 0) {
  const demoSalt = crypto.randomBytes(16).toString('hex');
  const demoUser: StoredUser = {
    id: 'user_huayna_demo',
    name: 'Cliente Huayna Fit',
    email: 'cliente@huayna.pe',
    phone: '904887006',
    passwordSalt: demoSalt,
    passwordHash: hashPassword('huayna2026', demoSalt),
    address: 'Av. Bolognesi 520, Tacna',
    district: 'Tacna Cercado',
    reference: 'Frente al parque',
    fitPoints: 120,
    createdAt: new Date().toISOString()
  };
  data.users.push(demoUser);
  saveData();
}

// Authentication middleware
function authenticate(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }
  const token = authHeader.split(' ')[1];
  const session = data.sessions.find(s => s.token === token);
  if (session) {
    const user = data.users.find(u => u.id === session.userId);
    if (user) {
      (req as any).user = user;
    }
  }
  next();
}

app.use(authenticate);

// --- API ROUTES ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'HUAYNA Cafetería Saludable', time: new Date().toISOString() });
});

// Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, password, address, district, reference } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Nombre, correo y contraseña son obligatorios' });
  }

  const existing = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'Ya existe una cuenta con este correo electrónico' });
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = hashPassword(password, salt);
  const newUser: StoredUser = {
    id: `usr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
    name,
    email: email.toLowerCase(),
    phone: phone || '',
    passwordSalt: salt,
    passwordHash: hash,
    address: address || '',
    district: district || 'Tacna Cercado',
    reference: reference || '',
    fitPoints: 50, // Welcome bonus points!
    createdAt: new Date().toISOString()
  };

  data.users.push(newUser);

  const token = generateToken();
  data.sessions.push({
    token,
    userId: newUser.id,
    createdAt: new Date().toISOString()
  });

  saveData();

  const safeUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    address: newUser.address,
    district: newUser.district,
    reference: newUser.reference,
    fitPoints: newUser.fitPoints
  };

  res.json({ success: true, token, user: safeUser });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña requeridos' });
  }

  const user = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const testHash = hashPassword(password, user.passwordSalt);
  if (testHash !== user.passwordHash) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = generateToken();
  data.sessions.push({
    token,
    userId: user.id,
    createdAt: new Date().toISOString()
  });

  saveData();

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    district: user.district,
    reference: user.reference,
    fitPoints: user.fitPoints
  };

  res.json({ success: true, token, user: safeUser });
});

// Get Current User (Me)
app.get('/api/auth/me', (req, res) => {
  const user = (req as any).user as StoredUser | undefined;
  if (!user) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      district: user.district,
      reference: user.reference,
      fitPoints: user.fitPoints
    }
  });
});

// Update Profile
app.put('/api/auth/profile', (req, res) => {
  const user = (req as any).user as StoredUser | undefined;
  if (!user) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  const { name, phone, address, district, reference } = req.body;
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (address !== undefined) user.address = address;
  if (district !== undefined) user.district = district;
  if (reference !== undefined) user.reference = reference;

  saveData();

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      district: user.district,
      reference: user.reference,
      fitPoints: user.fitPoints
    }
  });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    data.sessions = data.sessions.filter(s => s.token !== token);
    saveData();
  }
  res.json({ success: true });
});

// Orders: Get user's orders
app.get('/api/orders', (req, res) => {
  const user = (req as any).user as StoredUser | undefined;
  const phone = req.query.phone as string | undefined;

  let userOrders = data.orders;
  if (user) {
    userOrders = userOrders.filter(o => o.userId === user.id || (user.phone && o.customerPhone === user.phone));
  } else if (phone) {
    userOrders = userOrders.filter(o => o.customerPhone === phone);
  }

  // Sort latest first
  userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  res.json({ orders: userOrders });
});

// Orders: Create new order
app.post('/api/orders', (req, res) => {
  const user = (req as any).user as StoredUser | undefined;
  const {
    id,
    items,
    subtotal,
    deliveryFee,
    discount,
    tip,
    total,
    customer,
    paymentMethod,
    whatsappMessage
  } = req.body;

  if (!items || items.length === 0 || !customer || !customer.name || !customer.phone) {
    return res.status(400).json({ error: 'Datos de pedido incompletos' });
  }

  const orderId = id || `#HY-${Math.floor(10000 + Math.random() * 90000)}`;

  const newOrder: StoredOrder = {
    id: orderId,
    userId: user ? user.id : undefined,
    customerName: customer.name,
    customerPhone: customer.phone,
    items,
    subtotal: subtotal || 0,
    deliveryFee: deliveryFee || 0,
    discount: discount || 0,
    tip: tip || 0,
    total: total || 0,
    address: customer.address || '',
    district: customer.district || 'Tacna Cercado',
    reference: customer.reference || '',
    paymentMethod: paymentMethod || 'yape',
    status: 'recibido',
    createdAt: new Date().toISOString(),
    whatsappMessage: whatsappMessage || ''
  };

  data.orders.push(newOrder);

  // If authenticated, grant fit points (1 point per 2 Soles)
  if (user) {
    user.fitPoints = (user.fitPoints || 0) + Math.floor((total || 0) / 2);
  }

  saveData();

  res.json({ success: true, order: newOrder });
});

// Development vs Production serving
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HUAYNA Cafetería Saludable server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
