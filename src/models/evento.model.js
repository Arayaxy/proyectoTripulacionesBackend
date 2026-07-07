let eventos = [];
let nextId = 1;

export const getAll = async () => [...eventos];

export const getById = async (id) => eventos.find(e => e.id === Number(id)) || null;

export const create = async (data) => {
  const evento = { id: nextId++, ...data };
  eventos.push(evento);
  return evento;
};

export const update = async (id, data) => {
  const index = eventos.findIndex(e => e.id === Number(id));
  if (index === -1) return null;
  eventos[index] = { ...eventos[index], ...data, id: Number(id) };
  return eventos[index];
};

export const remove = async (id) => {
  const index = eventos.findIndex(e => e.id === Number(id));
  if (index === -1) return null;
  const [removed] = eventos.splice(index, 1);
  return removed;
};
