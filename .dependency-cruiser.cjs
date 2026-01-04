/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    // Circular dependency forbidden
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    // lib should not depend on entrypoints
    {
      name: "no-lib-to-entrypoints",
      severity: "error",
      from: { path: "^src/lib/" },
      to: { path: "^src/entrypoints/" },
    },
  ],
  options: {
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
    },
    exclude: [
      "node_modules",
      ".output",
      ".wxt",
    ],
  },
};
