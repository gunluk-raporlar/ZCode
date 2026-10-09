/** 进程资源样本的来源标识；兼容服务端资源查询协议，不包含事件上报。 */
export const PROCESS_RESOURCE_CLI_LANES = ["chat", "plugin", "mcp-status"] as const;
export type ProcessResourceCliLane = (typeof PROCESS_RESOURCE_CLI_LANES)[number];

/**
 * CLI surec ornekleme periyodu (yerel Resource Manager gorunumu icin).
 * Upstream'de silinen processResourceTelemetry.ts icindeydi; yerel ornekleme
 * bu fork'ta da kullanildigi icin degeri burada korunuyor (60.000 ms).
 */
export const ZCODE_CLI_RESOURCE_SAMPLE_INTERVAL_MS = 60_000;
