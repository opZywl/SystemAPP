/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/agendesorriso` | `/(tabs)/paciente` | `/_sitemap` | `/agendesorriso` | `/paciente`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
