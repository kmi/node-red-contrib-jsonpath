/*
 * Copyright (c) 2014. Knowledge Media Institute - The Open University
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Node-RED node that allows to evaluate JSONPath expressions over the messages received
 *
 * @author <a href="mailto:carlos.pedrinaci@open.ac.uk">Carlos Pedrinaci</a> (KMi - The Open University)
 */

module.exports = function(RED) {

    var jsonPath = require('JSONPath');
    
    // The main node definition - most things happen in here
    function JSONPathNode(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        // Store local copies of the node configuration (as defined in the .html)
        this.expression = n.expression;
        this.split = n.split;

        var node = this;

        this.on("input", function(msg) {
            if (msg != undefined && msg.payload != undefined ) {
                var input = msg.payload;
                if (typeof msg.payload === "string") {
                    // It's a string: parse it as JSON
                    input = JSON.parse(msg.payload);
                }
                // Evalute the JSONPath expresssion
                var evalResult = jsonPath.eval(input, node.expression);

                if (!node.split) {
                    node.send({"payload" : evalResult});
                } else {
                    var response = evalResult.map(function (value) {
                        return {"payload": value};
                    });
                    node.send([response]);
                }
            }
        });


        this.on("close", function() {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: this.client.disconnect();
        });
    }
    
    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType("jsonpath",JSONPathNode);

}
