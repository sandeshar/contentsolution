// Minimal stub DB implementation used only to satisfy builds and provide safe no-op behavior
// in environments where the full Drizzle setup is not present.
export const db = {
  select() {
    return {
      from() {
        return {
          where() { return Promise.resolve([]); },
          orderBy() { return Promise.resolve([]); },
          limit() { return Promise.resolve([]); },
        };
      }
    };
  },
  insert() {
    return {
      values() { return Promise.resolve([{ insertId: 1 }]); }
    };
  },
  update() {
    return {
      set() { return { where() { return Promise.resolve({}); } }; }
    };
  },
  delete() {
    return {
      where() { return Promise.resolve({}); }
    };
  }
};

export default db;