import {GraphQLServer} from 'graphql-yoga';

//Scaler Types String, Boolean, Int, Float, ID

const typeDefs=`
    type Query{
        id:ID!,
        name:String!,
        age:Int!,
        employed:Boolean!,
        gpa:Float
    }      
`

const resolvers={
    Query:{
        id(){
            return '#12344'
        },
        name(){
            return 'ajanthan' 
        },
        age(){
            return 35 
        },
        employed(){
            return false 
        },
        gpa(){
            return 3.0
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