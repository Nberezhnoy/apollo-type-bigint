declare module 'apollo-type-bigint' {
    import { GraphQLScalarType } from 'graphql';

    class BigIntClass extends GraphQLScalarType {
        constructor(mode: string)
    }

    export default BigIntClass;
}
