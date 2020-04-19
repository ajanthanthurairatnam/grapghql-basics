import {GraphQLServer} from 'graphql-yoga';

//Scaler Types String, Boolean, Int, Float, ID

const typeDefs=`
    type Query{
       greetings(name:String):String!,
       add(number1:Float!, number2:Float!):Float,
       book:Book!,
       authur:Authur!
    }  
    type Book{
        title:String!,
        price:Float!,
        relaeaseYear:Int,
        rating:Float,
        inStock:Boolean
    }
    type Authur{
        name:String!,
        speciality:String!,
        firstPublish:Int,
        active:Boolean
    }
    
`

const resolvers={
    Query:{
        greetings(parent, args, ctx, info){
            return `Hello ${args && args.name? args.name :""}`; 
        },
        add(parent, args, ctx, info){
            return args.number1+args.number2; 
        },
        book(){
            return {
                title:"Adventures of GraphQL",
                price:100.10,
                relaeaseYear:200,
                rating:4,
                inStock:true
            }
        },
        authur(){
            return {
                name:"Ajanthan",
                speciality:'SD',
                firstPublish:2017,
                active:true
            }
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