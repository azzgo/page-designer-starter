
const configSchemaMap = new Map<string, any>();

export function registerConfigSchema(key: string, configSchema: any) {

  if (configSchemaMap.has(key)) {
    throw new Error(`[key] ${key} already registered.`);
  }

  configSchemaMap.set(key, configSchema);

}

export function resolveConfigSchema(key: string) {
  return configSchemaMap.get(key);
}

export function resetConfigSchema() {
  configSchemaMap.clear();
}
