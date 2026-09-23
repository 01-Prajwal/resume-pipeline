import * as runtime from "@prisma/client/runtime/client";
const config = {
    "previewFeatures": [],
    "clientVersion": "7.10.0",
    "engineVersion": "0edf323efd1d98336f3f0a68684b56f689b900d3",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../api/src/generated/prisma\"\n}\n\ngenerator workerClient {\n  provider = \"prisma-client\"\n  output   = \"../worker/src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nenum ResumeStatus {\n  QUEUED\n  PROCESSING\n  DONE\n  FAILED\n}\n\nmodel Resume {\n  id            String       @id @default(uuid())\n  originalName  String\n  filePath      String\n  sizeBytes     Int\n  status        ResumeStatus @default(QUEUED)\n  extractedText String?\n  summary       Json?\n  attempts      Int          @default(0)\n  error         String?\n  createdAt     DateTime     @default(now())\n  updatedAt     DateTime     @updatedAt\n\n  @@index([status])\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Resume\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"originalName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"filePath\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sizeBytes\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"ResumeStatus\"},{\"name\":\"extractedText\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"summary\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"attempts\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"error\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null,\"schema\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"Resume.findUnique\",\"Resume.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Resume.findFirst\",\"Resume.findFirstOrThrow\",\"Resume.findMany\",\"data\",\"Resume.createOne\",\"Resume.createMany\",\"Resume.createManyAndReturn\",\"Resume.updateOne\",\"Resume.updateMany\",\"Resume.updateManyAndReturn\",\"create\",\"update\",\"Resume.upsertOne\",\"Resume.deleteOne\",\"Resume.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"Resume.groupBy\",\"Resume.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"originalName\",\"filePath\",\"sizeBytes\",\"ResumeStatus\",\"status\",\"extractedText\",\"summary\",\"attempts\",\"error\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"string_contains\",\"string_starts_with\",\"string_ends_with\",\"array_starts_with\",\"array_ends_with\",\"array_contains\",\"contains\",\"startsWith\",\"endsWith\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "PwsQDhwAAC4AMB0AAAQAEB4AAC4AMB8BAAAAASABAC8AISEBAC8AISICADAAISQAADEkIiUBADIAISYAADMAICcCADAAISgBADIAISlAADQAISpAADQAIQEAAAABACABAAAAAQAgDhwAAC4AMB0AAAQAEB4AAC4AMB8BAC8AISABAC8AISEBAC8AISICADAAISQAADEkIiUBADIAISYAADMAICcCADAAISgBADIAISlAADQAISpAADQAIQMlAAA1ACAmAAA1ACAoAAA1ACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACALHwEAAAABIAEAAAABIQEAAAABIgIAAAABJAAAACQCJQEAAAABJoAAAAABJwIAAAABKAEAAAABKUAAAAABKkAAAAABAQgAAAkAIAsfAQAAAAEgAQAAAAEhAQAAAAEiAgAAAAEkAAAAJAIlAQAAAAEmgAAAAAEnAgAAAAEoAQAAAAEpQAAAAAEqQAAAAAEBCAAACwAwAQgAAAsAMAsfAQA7ACEgAQA7ACEhAQA7ACEiAgA8ACEkAAA9JCIlAQA-ACEmgAAAAAEnAgA8ACEoAQA-ACEpQAA_ACEqQAA_ACECAAAAAQAgCAAADgAgCx8BADsAISABADsAISEBADsAISICADwAISQAAD0kIiUBAD4AISaAAAAAAScCADwAISgBAD4AISlAAD8AISpAAD8AIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgCBUAADYAIBYAADcAIBcAADoAIBgAADkAIBkAADgAICUAADUAICYAADUAICgAADUAIA4cAAAaADAdAAAXABAeAAAaADAfAQAbACEgAQAbACEhAQAbACEiAgAcACEkAAAdJCIlAQAeACEmAAAfACAnAgAcACEoAQAeACEpQAAgACEqQAAgACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIA4cAAAaADAdAAAXABAeAAAaADAfAQAbACEgAQAbACEhAQAbACEiAgAcACEkAAAdJCIlAQAeACEmAAAfACAnAgAcACEoAQAeACEpQAAgACEqQAAgACEOFQAAIgAgGAAALQAgGQAALQAgKwEAAAABLAEAAAAELQEAAAAELgEAAAABLwEAAAABMAEAAAABMQEAAAABMgEALAAhOQEAAAABOgEAAAABOwEAAAABDRUAACIAIBYAACsAIBcAACIAIBgAACIAIBkAACIAICsCAAAAASwCAAAABC0CAAAABC4CAAAAAS8CAAAAATACAAAAATECAAAAATICACoAIQcVAAAiACAYAAApACAZAAApACArAAAAJAIsAAAAJAgtAAAAJAgyAAAoJCIOFQAAJAAgGAAAJwAgGQAAJwAgKwEAAAABLAEAAAAFLQEAAAAFLgEAAAABLwEAAAABMAEAAAABMQEAAAABMgEAJgAhOQEAAAABOgEAAAABOwEAAAABDxUAACQAIBgAACUAIBkAACUAICuAAAAAAS6AAAAAAS-AAAAAATCAAAAAATGAAAAAATKAAAAAATMBAAAAATQBAAAAATUBAAAAATaAAAAAATeAAAAAATiAAAAAAQsVAAAiACAYAAAjACAZAAAjACArQAAAAAEsQAAAAAQtQAAAAAQuQAAAAAEvQAAAAAEwQAAAAAExQAAAAAEyQAAhACELFQAAIgAgGAAAIwAgGQAAIwAgK0AAAAABLEAAAAAELUAAAAAELkAAAAABL0AAAAABMEAAAAABMUAAAAABMkAAIQAhCCsCAAAAASwCAAAABC0CAAAABC4CAAAAAS8CAAAAATACAAAAATECAAAAATICACIAIQgrQAAAAAEsQAAAAAQtQAAAAAQuQAAAAAEvQAAAAAEwQAAAAAExQAAAAAEyQAAjACEIKwIAAAABLAIAAAAFLQIAAAAFLgIAAAABLwIAAAABMAIAAAABMQIAAAABMgIAJAAhDCuAAAAAAS6AAAAAAS-AAAAAATCAAAAAATGAAAAAATKAAAAAATMBAAAAATQBAAAAATUBAAAAATaAAAAAATeAAAAAATiAAAAAAQ4VAAAkACAYAAAnACAZAAAnACArAQAAAAEsAQAAAAUtAQAAAAUuAQAAAAEvAQAAAAEwAQAAAAExAQAAAAEyAQAmACE5AQAAAAE6AQAAAAE7AQAAAAELKwEAAAABLAEAAAAFLQEAAAAFLgEAAAABLwEAAAABMAEAAAABMQEAAAABMgEAJwAhOQEAAAABOgEAAAABOwEAAAABBxUAACIAIBgAACkAIBkAACkAICsAAAAkAiwAAAAkCC0AAAAkCDIAACgkIgQrAAAAJAIsAAAAJAgtAAAAJAgyAAApJCINFQAAIgAgFgAAKwAgFwAAIgAgGAAAIgAgGQAAIgAgKwIAAAABLAIAAAAELQIAAAAELgIAAAABLwIAAAABMAIAAAABMQIAAAABMgIAKgAhCCsIAAAAASwIAAAABC0IAAAABC4IAAAAAS8IAAAAATAIAAAAATEIAAAAATIIACsAIQ4VAAAiACAYAAAtACAZAAAtACArAQAAAAEsAQAAAAQtAQAAAAQuAQAAAAEvAQAAAAEwAQAAAAExAQAAAAEyAQAsACE5AQAAAAE6AQAAAAE7AQAAAAELKwEAAAABLAEAAAAELQEAAAAELgEAAAABLwEAAAABMAEAAAABMQEAAAABMgEALQAhOQEAAAABOgEAAAABOwEAAAABDhwAAC4AMB0AAAQAEB4AAC4AMB8BAC8AISABAC8AISEBAC8AISICADAAISQAADEkIiUBADIAISYAADMAICcCADAAISgBADIAISlAADQAISpAADQAIQsrAQAAAAEsAQAAAAQtAQAAAAQuAQAAAAEvAQAAAAEwAQAAAAExAQAAAAEyAQAtACE5AQAAAAE6AQAAAAE7AQAAAAEIKwIAAAABLAIAAAAELQIAAAAELgIAAAABLwIAAAABMAIAAAABMQIAAAABMgIAIgAhBCsAAAAkAiwAAAAkCC0AAAAkCDIAACkkIgsrAQAAAAEsAQAAAAUtAQAAAAUuAQAAAAEvAQAAAAEwAQAAAAExAQAAAAEyAQAnACE5AQAAAAE6AQAAAAE7AQAAAAEMK4AAAAABLoAAAAABL4AAAAABMIAAAAABMYAAAAABMoAAAAABMwEAAAABNAEAAAABNQEAAAABNoAAAAABN4AAAAABOIAAAAABCCtAAAAAASxAAAAABC1AAAAABC5AAAAAAS9AAAAAATBAAAAAATFAAAAAATJAACMAIQAAAAAAAAE8AQAAAAEFPAIAAAABPQIAAAABPgIAAAABPwIAAAABQAIAAAABATwAAAAkAgE8AQAAAAEBPEAAAAABAAAAAAUVAAYWAAcXAAgYAAkZAAoAAAAAAAUVAAYWAAcXAAgYAAkZAAoBAgECAwEFBgEGBwEHCAEJCgEKDAILDQMMDwENEQIOEgQREwESFAETFQIaGAUbGQs"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
export function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map