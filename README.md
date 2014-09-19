# JSONPath Node for NodeRed

This is a node for [NodeRed](http://nodered.org) a tool for easily wiring together hardware devices, APIs and online services. 
This node allows to evaluate JSONPath expressions over the messages received. To this end this node relies on the [JSONPath](https://github.com/s3u/JSONPath) Node.js library.

For those familiar with XPath, JSONPath is to JSON what XPath is to XML. In a nutshell, JSONPath provides a syntax for specifying expressions that tell a JSONPath processor how to navigate through a given JSON structure in order to obtain the data required by the user. 
JSONPath therefore provides a convenient way for applications to obtain just the data required by specifying a simple expression, without having to resort to any further processing of the JSON data structure.
  
## How to Install

Run the following command in the root directory of your Node-RED install

```
npm install node-red-contrib-jsonpath
```

## Using JSONPath

Since a JSON structure is usually anonymous and doesn't necessarily have a "root member object" JSONPath assumes the abstract name $ assigned to the outer level object.
To navigate through the JSON object, JSONPath expressions can use the dot–notation as well as the bracket notation: 

```json
$.store.book[0].title
``` 

and 

```json
$['store']['book'][0]['title']
``` 

are thus equivalent expressions. 

Below you can find some basic guidelines and assistance on JSONPath. This documentation has been taken from http://goessner.net/articles/JsonPath/
 
```json
{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}
```


JSONPath               | Result
---------------------- | -------------------------------------
$.store.book[*].author | the authors of all books in the store 
$..author              | all authors 
$.store.*              | all things in store, which are some books and a red bicycle.
$.store..price         | the price of everything in the store.
$..book[2]             | the third book
$..book[(@.length-1)]  | the last book in order.
$..book[-1:]           |
$..book[0,1]           | the first two books
$..book[:2]            | 
$..book[?(@.isbn)]     | filter all books with isbn number
$..book[?(@.price<10)] | filter all books cheapier than 10
$..[?(@.price>19)]^    | categories with things more expensive than 19
$..*                   | all Elements in XML document. All members of JSON structure.
 

## Status

The node is at an early stage but is already usable. Currently the node provides support for evaluating JSONPath expressions over messages. Match results can all be sent in a bundle or each as a separate message. 

License
-------

Copyright 2014 Knowledge Media Institute - The Open University.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
[apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.