import type { AxeResults } from 'axe-core';

/**
 * Result of `storybook-addon-a11y` check on a component, accounting for an empty result
 * which only includes the empty arrays.
 */
type A11yResult = Partial<AxeResults> & Pick<AxeResults, 'incomplete' | 'passes' | 'violations'>;

// // TODO: Could get these from axe?

// type A11yNode = {
//   id: string;
//   data: any;
//   relatedNodes: A11yNode[];
//   impact: string; // TODO: Enum;
//   message: string;
// };

// type A11yNodes = {
//   any: any[];
//   all: A11yNode[];
//   none: any[];
//   impact: null; // TODO: Check other types
//   html: string;
//   target: string[];
// };

// type A11yCheck = {
//   // id: string;
//   // impact: null; // TODO: Check other types
//   // tags: string[];
//   // description: string;
//   // help: string;
//   // helpUrl: string;
//   // nodes: A11yNodes[];
// };

// type A11yResult = {
//   inapplicable?: A11yCheck[];
//   incomplete: A11yCheck[];
//   passes: A11yCheck[];
//   // testEngine?: { name: string; version: string };
//   // testEnvironment?: {
//   //   orientationAngle: number;
//   //   orientationType: string; // TODO: Enum?
//   //   userAgent: string;
//   //   windowHeight: number;
//   //   windowWidth: number;
//   // };
//   // testRunner?: { name: string };
//   // timestamp?: string;
//   // toolOptions?: { reporter: string };
//   // url?: string;
//   violations: A11yCheck[];
// };

// type X = PreviewWeb<Renderer>;

export type { A11yResult };
