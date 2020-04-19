import {GraphQLServer} from 'graphql-yoga';

//Scaler Types String, Boolean, Int, Float, ID

const typeDefs=`
    type Query{
        title:String!,
        price:Float!,
        relaeaseYear:Int,
        rating:Float,
        inStock:Boolean
    }      
`

const resolvers={
    Query:{
        title(){
            return '#Camera12345'
        },
        price(){
            return 1000 
        },
        relaeaseYear(){
            return 2020 
        },
        rating(){
            return 4.5 
        },
        inStock(){
            return true
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