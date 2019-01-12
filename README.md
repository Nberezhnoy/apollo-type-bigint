# apollo-type-bigint
BigInt integer type for [Apollo server](https://github.com/apollographql/apollo-server).  This package provides **2** implementation options for working with large integers.

### First implementation
___
This implementation allows working with only 53 bit integers. To work in the 53-bit number mode, you need to create an instance of the GraphQLBigInt class and pass the string "safe" to the constructor.

#### Example

    import { makeExecutableSchema } from "graphql-tools";
    import BigInt from "apollo-type-bigint";
    
    const typeDefs = `
    scalar BigInt
    
    type Query {
      Test: BigInt
    }
    `;
    
    const resolvers = {
    	BigInt: new BigInt("safe")
    };
    
    export default makeExecutableSchema({ typeDefs, resolvers });

### Second implementation
___
The second implementation allows you to work with 63 bit integers using a new data type in JavaScript - [BigInt](https://github.com/tc39/proposal-bigint). To work in this mode, you need to create an instance of the GraphQLBigInt class and pass the "bigInt" to the constructor for the term.

#### Example

    import { makeExecutableSchema } from "graphql-tools";
    import BigInt from "apollo-type-bigint";
    
    const typeDefs = `
    scalar BigInt
    
    type Query {
      Test: BigInt
    }
    `;
    
    const resolvers = {
    	BigInt: new BigInt("bigInt")
    };
    
    export default makeExecutableSchema({ typeDefs, resolvers });