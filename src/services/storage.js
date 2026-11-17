import { getSeedState, SEED_USERS, SEED_SERVICES } from './seedData';

const STORAGE_KEY = 'comuniapp_state_v1';

/** Sincroniza usuarios emprendedores y reseñas semilla en datos guardados antiguos. */
function patchStateFromSeed(state) {
  const seedUsersById = Object.fromEntries(SEED_USERS.map((u) => [u.id, u]));
  const seedServicesById = Object.fromEntries(SEED_SERVICES.map((s) => [s.id, s]));
  let changed = false;

  const knownUserIds = new Set(state.users.map((u) => u.id));
  for (const seedUser of SEED_USERS) {
    if (!knownUserIds.has(seedUser.id)) {
      state.users.push({ ...seedUser });
      changed = true;
    }
  }

  state.users = state.users.map((user) => {
    const seed = seedUsersById[user.id];
    if (!seed || seed.role !== 'emprendedor') return user;
    const phoneDigits = String(user.phone || '').replace(/\D/g, '');
    const needsPatch =
      phoneDigits.length < 10 || !user.bio || user.instagram === undefined || user.facebook === undefined;
    if (!needsPatch) return user;
    changed = true;
    return {
      ...user,
      phone: user.phone || seed.phone,
      whatsapp: user.whatsapp || seed.whatsapp,
      bio: user.bio || seed.bio,
      instagram: user.instagram ?? seed.instagram,
      facebook: user.facebook ?? seed.facebook,
      businessName: user.businessName || seed.businessName,
    };
  });

  state.services = state.services.map((service) => {
    const seed = seedServicesById[service.id];
    if (!seed) return service;
    const reviewCount = service.reviews?.length || 0;
    const needsReviews = reviewCount < 2;
    const needsEntrepreneurLink = service.entrepreneurId !== seed.entrepreneurId;
    if (!needsReviews && !needsEntrepreneurLink) return service;
    changed = true;
    return {
      ...service,
      entrepreneurId: seed.entrepreneurId,
      entrepreneurName: seed.entrepreneurName,
      reviews: needsReviews ? [...seed.reviews] : service.reviews,
    };
  });

  return { state, changed };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = getSeedState();
      saveState(seed);
      return seed;
    }
    const parsed = JSON.parse(raw);
    const { state, changed } = patchStateFromSeed(parsed);
    if (changed) saveState(state);
    return state;
  } catch {
    const seed = getSeedState();
    saveState(seed);
    return seed;
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetStorage() {
  const seed = getSeedState();
  saveState(seed);
  return seed;
}

export function initStorage() {
  return loadState();
}
