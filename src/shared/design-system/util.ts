import type { SemanticColors } from "./model";

export const cssColorVar = (color: SemanticColors): string => `var(--${color})`; 