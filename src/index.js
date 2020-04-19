import {GraphQLServer} from 'graphql-yoga';

const typeDefs=`
    type Query{
        hello:String!,
        name:String!,
        location:String!,
        bio:String!
    }      
`

const resolvers={
    Query:{
        hello(){
            return 'this is my first query'
        },
        name(){
            return 'ajanthan' 
        },
        bio(){
            return 'some bio information' 
        },
        location(){
            return 'location information' 
        }
    }
}

const sever=new GraphQLServer({
    typeDefs:typeDefs,
    resolvers:resolvers
})

sever.start(()=>{
    console.log("The server is up and running");
})