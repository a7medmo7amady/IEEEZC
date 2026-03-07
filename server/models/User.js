import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  // ==================== BASIC INFORMATION ====================
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [100, "Name cannot exceed 100 characters"]
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /@zewailcity\.edu\.eg$/,
      "Only Zewail City emails (@zewailcity.edu.eg) are allowed"
    ]
  },

  password: {
    type: String,
    required: function() {
      // Password required ONLY if not using OAuth
      return !this.oauthProvider;
    },
    minlength: [8, "Password must be at least 8 characters"],
    select: false // Don't return password in queries by default
  },

  studentId: {
    type: String,
    unique: true,
    sparse: true, // Allows null but unique when present
    trim: true
  },

  // ==================== ROLE & PERMISSIONS ====================
  role: {
    type: String,
    enum: {
      values: ["ORDINARY_MEMBER", "HIGH_BOARD", "ADMIN"],
      message: "{VALUE} is not a valid role"
    },
    default: "ORDINARY_MEMBER"
  },

  // ==================== PROFILE INFORMATION ====================
  profileImage: {
    type: String,
    default: null
  },

  bio: {
    type: String,
    maxlength: [500, "Bio cannot exceed 500 characters"],
    default: ""
  },

  interests: {
    type: [String],
    default: [],
    validate: {
      validator: function(arr) {
        return arr.length <= 10; // Max 10 interests
      },
      message: "You can select up to 10 interests only"
    }
  },

  phoneNumber: {
    type: String,
    match: [/^(\+20)?[0-9]{10,11}$/, "Please enter a valid Egyptian phone number"],
    default: null
  },

  // ==================== OAUTH FIELDS ====================
  oauthProvider: {
    type: String,
    enum: ["google", "linkedin", null],
    default: null
  },

  oauthId: {
    type: String,
    default: null
  },

  // ==================== EMAIL VERIFICATION ====================
  isVerified: {
    type: Boolean,
    default: false
  },

  verificationToken: {
    type: String,
    select: false
  },

  verificationTokenExpires: {
    type: Date,
    select: false
  },

  // ==================== SECURITY FIELDS ====================
  // Account Lockout (after failed login attempts)
  failedLoginAttempts: {
    type: Number,
    default: 0
  },

  lockUntil: {
    type: Date,
    default: null
  },

  // Password Reset
  passwordResetToken: {
    type: String,
    select: false
  },

  passwordResetExpires: {
    type: Date,
    select: false
  },

  // ==================== COMMITTEE MEMBERSHIP ====================
  committees: [
    {
      committeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Committee",
        required: true
      },
      position: {
        type: String,
        enum: ["MEMBER", "VICE", "HEAD"],
        default: "MEMBER"
      },
      joinedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],

  // ==================== EVENT REGISTRATIONS ====================
  registeredEvents: [
    {
      eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
      },
      registeredAt: {
        type: Date,
        default: Date.now
      },
      attended: {
        type: Boolean,
        default: false
      },
      eventCode: {
        type: String, // Code for certificate generation
        default: null
      }
    }
  ],

  // ==================== ACTIVITY TRACKING ====================
  lastLogin: {
    type: Date,
    default: null
  },

  lastActive: {
    type: Date,
    default: Date.now
  },

  // ==================== ACCOUNT STATUS ====================
  isActive: {
    type: Boolean,
    default: true
  },

  isBanned: {
    type: Boolean,
    default: false
  },

  banReason: {
    type: String,
    default: null
  },

  bannedUntil: {
    type: Date,
    default: null
  }

}, {
  timestamps: true, // Automatically creates createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ==================== INDEXES FOR PERFORMANCE ====================
userSchema.index({ role: 1 });
userSchema.index({ "committees.committeeId": 1 });
userSchema.index({ createdAt: -1 });
// ==================== VIRTUAL FIELDS ====================
// Check if account is currently locked
userSchema.virtual("isLocked").get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Get number of events user attended
userSchema.virtual("eventsAttendedCount").get(function() {
  return this.registeredEvents.filter(e => e.attended).length;
});

// Get total registered events
userSchema.virtual("totalRegisteredEvents").get(function() {
  return this.registeredEvents.length;
});

// Check if user is High Board or Admin
userSchema.virtual("isHighBoard").get(function() {
  return this.role === "HIGH_BOARD" || this.role === "ADMIN";
});

// Check if user is Admin
userSchema.virtual("isAdmin").get(function() {
  return this.role === "ADMIN";
});

// Get committee names user belongs to
userSchema.virtual("committeeNames").get(function() {
  return this.committees.map(c => c.committeeId.name);
});

// ==================== INSTANCE METHODS ====================
// Compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Increment failed login attempts and lock account if needed
userSchema.methods.incrementLoginAttempts = async function() {
  // Reset attempts if lock has expired
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return await this.updateOne({
      $set: { failedLoginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }

  const updates = { $inc: { failedLoginAttempts: 1 } };

  // Lock account after 5 failed attempts
  const maxAttempts = 5;
  const lockTime = 15 * 60 * 1000; // 15 minutes

  if (this.failedLoginAttempts + 1 >= maxAttempts && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + lockTime };
  }

  return await this.updateOne(updates);
};

// Reset failed login attempts on successful login
userSchema.methods.resetLoginAttempts = async function() {
  return await this.updateOne({
    $set: { failedLoginAttempts: 0 },
    $unset: { lockUntil: 1 }
  });
};

// Check if user is in a specific committee
userSchema.methods.isInCommittee = function(committeeId) {
  return this.committees.some(
    c => c.committeeId.toString() === committeeId.toString()
  );
};

// Check if user is head or vice of a committee
userSchema.methods.isCommitteeLeader = function(committeeId) {
  const committee = this.committees.find(
    c => c.committeeId.toString() === committeeId.toString()
  );
  return committee && (committee.position === "HEAD" || committee.position === "VICE");
};

// Check if user is head of a specific committee
userSchema.methods.isCommitteeHead = function(committeeId) {
  const committee = this.committees.find(
    c => c.committeeId.toString() === committeeId.toString()
  );
  return committee && committee.position === "HEAD";
};

// Check if user registered for a specific event
userSchema.methods.isRegisteredForEvent = function(eventId) {
  return this.registeredEvents.some(
    e => e.eventId.toString() === eventId.toString()
  );
};

// Get user's position in a committee
userSchema.methods.getCommitteePosition = function(committeeId) {
  const committee = this.committees.find(
    c => c.committeeId.toString() === committeeId.toString()
  );
  return committee ? committee.position : null;
};

// ==================== STATIC METHODS ====================
// Find user by email (case-insensitive)
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Get all admins
userSchema.statics.getAdmins = function() {
  return this.find({ role: "ADMIN" }).select("-password");
};

// Get all high board members
userSchema.statics.getHighBoard = function() {
  return this.find({ role: "HIGH_BOARD" })
    .populate("committees.committeeId", "name")
    .select("-password");
};

// Get users by committee
userSchema.statics.findByCommittee = function(committeeId) {
  return this.find({ "committees.committeeId": committeeId })
    .populate("committees.committeeId", "name")
    .select("-password");
};

// Get active members (not banned, account active)
userSchema.statics.getActiveMembers = function() {
  return this.find({ 
    isActive: true, 
    isBanned: false 
  }).select("-password");
};

// Get users by role
userSchema.statics.findByRole = function(role) {
  return this.find({ role }).select("-password");
};

// ==================== MIDDLEWARE (PRE/POST HOOKS) ====================
// Hash password before saving (only if password is modified)
userSchema.pre("save", async function() {
  // Only hash if password is modified or new
  if (!this.isModified("password")) return;
  
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// Update lastActive timestamp on save
userSchema.pre("save", function(next) {
  this.lastActive = Date.now();
  next();
});

// Auto-verify email for OAuth users
userSchema.pre("save", function(next) {
  if (this.oauthProvider && !this.isVerified) {
    this.isVerified = true;
  }
  next();
});

// Remove sensitive fields when converting to JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  
  // Remove sensitive fields
  delete user.password;
  delete user.verificationToken;
  delete user.verificationTokenExpires;
  delete user.passwordResetToken;
  delete user.passwordResetExpires;
  delete user.__v;
  
  return user;
};

// ==================== CUSTOM VALIDATION ====================
// Validate that OAuth users don't need password
userSchema.pre("validate", function() {
  if (this.oauthProvider && this.password) {
    this.password = undefined; // Remove password for OAuth users
  }
});

export default mongoose.model("User", userSchema);