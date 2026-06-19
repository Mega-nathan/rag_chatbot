export const BotAvatar = () => (
  <div className="avatar-container">
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', borderRadius: '50%' }}>
      <defs>
        <linearGradient id="botGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#064e21" />
          <stop offset="100%" stopColor="#107c41" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#botGrad)" />
      {/* Crop Specialist Expert Silhouette */}
      <circle cx="50" cy="36" r="17" fill="#eaf4ed" />
      <path d="M50,58 C32,58 22,70 22,86 L78,86 C78,70 68,58 50,58 Z" fill="#eaf4ed" />
      {/* Coat/Tie overlay */}
      <path d="M42,60 L50,72 L58,60 L62,64 L50,81 L38,64 Z" fill="#ffffff" />
      <rect x="48.5" y="67" width="3" height="12" fill="#064e21" />
    </svg>
  </div>
);

export const UserAvatar = () => (
  <div className="avatar-container">
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', borderRadius: '50%' }}>
      <defs>
        <linearGradient id="userGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#userGrad)" />
      {/* Default User Silhouette */}
      <circle cx="50" cy="38" r="18" fill="#f8fafc" />
      <path d="M50,60 C32,60 22,72 22,88 L78,88 C78,72 68,60 50,60 Z" fill="#f8fafc" />
    </svg>
  </div>
);
