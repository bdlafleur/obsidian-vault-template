/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => GraphNestedTagsPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var GraphNestedTagsPlugin = class extends import_obsidian.Plugin {
  // At nodes changes graphLeaf.view.renderer.setData calls, so we need to step in and change links.
  inject_setData(graphLeaf) {
    const r = graphLeaf.view.renderer;
    if (!r._setData) {
      r._setData = r.setData;
    }
    r.setData = (data) => {
      var _a;
      const nodes = data.nodes;
      let parent;
      let last_tag;
      for (const id in nodes) {
        if (nodes[id].type === "tag") {
          last_tag = id;
          for (let i = id.length - 1; i > 2; i--) {
            if (id[i] === "/") {
              parent = id.slice(0, i);
              if (!(parent in nodes)) {
                nodes[parent] = { type: "tag", links: [] };
                data.numLinks++;
              }
              nodes[last_tag].links[parent] = true;
              data.numLinks++;
              last_tag = parent;
            }
          }
        }
      }
      return (_a = r._setData) == null ? void 0 : _a.call(r, data);
    };
    return graphLeaf;
  }
  async onload() {
    this.registerEvent(
      this.app.workspace.on("layout-change", () => {
        for (const leaf of this.app.workspace.getLeavesOfType(
          "graph"
        )) {
          if (leaf.view.renderer._setData === void 0) {
            this.inject_setData(leaf);
          }
        }
      })
    );
    this.app.workspace.trigger("layout-change");
    for (const leaf of this.app.workspace.getLeavesOfType("graph")) {
      leaf.view.unload();
      leaf.view.load();
    }
  }
  onunload() {
    for (const leaf of this.app.workspace.getLeavesOfType(
      "graph"
    )) {
      if (leaf.view.renderer._setData) {
        leaf.view.renderer.setData = leaf.view.renderer._setData;
        delete leaf.view.renderer._setData;
        leaf.view.unload();
        leaf.view.load();
      }
    }
  }
  async loadSettings() {
  }
  async saveSettings() {
  }
};

/* nosourcemap */