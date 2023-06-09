import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URI)

const userSchema =  new mongoose.Schema({
  name: String,
  image: String,
  email: { type: String, unique: true },
  emailVerified: Date,
  password: String,
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session', onDelete: 'cascade' }],
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account', onDelete: 'cascade' }],
  favoriteIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', onDelete: 'cascade' }],
}, { timestamps: true });

delete mongoose.connection.models['User'];
const USER = mongoose.model('User', userSchema);


const accountSchema =  new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', onDelete: 'cascade' },
  type: String,
  provider: String,
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
}, { timestamps: true });

accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

delete mongoose.connection.models['Account'];
const ACCOUNT = mongoose.model('Account', accountSchema);

const sessionSchema =  new mongoose.Schema({
  sessionToken: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', onDelete: 'cascade' },
  expires: Date,
}, { timestamps: true });

delete mongoose.connection.models['Session'];
const SESSION = mongoose.model('Session', sessionSchema);

const verificationTokenSchema =  new mongoose.Schema({
  identifier: String,
  token: { type: String, unique: true },
  expires: Date,
}, { timestamps: true });

delete mongoose.connection.models['VerificationToken'];
const VERIFICATION_TOKEN = mongoose.model('VerificationToken', verificationTokenSchema);

verificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

const movieSchema =  new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  thumbnailUrl: String,
  genre: String,
  duration: String,
});

delete mongoose.connection.models['Movie'];
const MOVIE = mongoose.model('Movie', movieSchema);

export {
  USER
}
