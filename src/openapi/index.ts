import {z} from "zod"
import { createDocument } from "zod-openapi"
import "zod-openapi/extend"
import { createUserSchema } from "../schemas/UserSchema"
import { writeFileSync } from "fs"

const document = createDocument({
    "openapi" : "3.1.0",
    "info": {
        title: "RBAC Test",
        version: "0.0.1"
    },
    servers: [{
        url: "http://localhost:9092"
    }],
    paths: {
        "/spade/createSuperAdmin":  {
            post : {
                responses: {
                    "201": {
                        description: "Created",
                        
                    }
                },
                requestBody: {content: {"application/json": {schema: createUserSchema}},description: "User to be added"}
            }
        }
    }
})


export function saveOpenAPIDefsAsJson(filename: string = "./rbac-microservice.json") {
    var json = JSON.stringify(document);
    writeFileSync(filename, json, "utf-8");
  }
  
// Makes a definitions JSON if file is loaded as prerequisite module
saveOpenAPIDefsAsJson();