// src/utils/logger.js

const LOG_LEVELS = {
  INFO:  '📋 INFO',
  SUCCESS: '✅ SUCCESS',
  ERROR: '❌ ERROR',
  WARN:  '⚠️  WARN',
};

function formatLog(level, action, data = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    action,
    ...data,
  };

  // Guarda en localStorage para persistencia
  const logs = getLogs();
  logs.push(entry);
  localStorage.setItem('app_logs', JSON.stringify(logs));

  // También muestra en consola
  console.log(`[${entry.timestamp}] ${LOG_LEVELS[level]} — ${action}`, data);

  return entry;
}

export const logger = {
  info:    (action, data) => formatLog('INFO',    action, data),
  success: (action, data) => formatLog('SUCCESS', action, data),
  error:   (action, data) => formatLog('ERROR',   action, data),
  warn:    (action, data) => formatLog('WARN',    action, data),
};

export function getLogs() {
  try {
    return JSON.parse(localStorage.getItem('app_logs') || '[]');
  } catch {
    return [];
  }
}

export function clearLogs() {
  localStorage.removeItem('app_logs');
}
