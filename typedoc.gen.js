const typedoc = require("typedoc");
const fs = require("fs");

const cdnUrl = "https://unpkg.com/ombro@latest/dist/esm/index.js";
const outputDir = "docs";
const exampleDir = outputDir + "/examples";

function copyExamples() {
  if (!fs.existsSync(exampleDir)) {
    fs.mkdirSync(exampleDir);

    fs.readdirSync("examples").forEach((file) => {
      if (file.endsWith(".html")) {
        const filePath = "examples/" + file;
        fs.readFile(filePath, "utf8", function (err, data) {
          if (err) throw err;

          const outputData = data.replace("../dist/esm/index.js", cdnUrl);
          const outputFilePath = exampleDir + "/" + file;

          fs.writeFile(outputFilePath, outputData, "utf8", function (err) {
            if (err) throw err;
          });
        });
      }
    });
  }
}

async function main() {
  const app = new typedoc.Application();

  app.options.addReader(new typedoc.TSConfigReader());
  app.options.addReader(new typedoc.TypeDocReader());

  app.bootstrap({
    entryPoints: ["src/index.ts"],
    out: "docs",
    name: "Ombro.js documentation",
  });

  const project = app.convert();

  if (project) {
    await app.generateDocs(project, outputDir);
    await app.generateJson(project, outputDir + "/documentation.json");

    copyExamples()
  }
}

main().catch(console.error);
