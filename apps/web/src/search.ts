const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
export const matchesName = (name: string, query: string) => normalize(name).includes(normalize(query));
