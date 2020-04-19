import {GraphQLServer} from 'graphql-yoga';

const Books=
[
    {
        title:"Alice in the wonder land",
        price:10.50,
        relaeaseYear:1998,
        rating:4,
        inStock:true
    },
    {
        title:"Robin hood",
        price:12.50,
        relaeaseYear:2008,
        rating:5,
        inStock:true
    },
    
]

const Authurs=
[
    {
        name:'AJANTHAN',
        speciality:'Fictionist',
        firstPublish:2001,
        active:true
    },
    {
        name:'SHAMARAN',
        speciality:'NOVALIST',
        firstPublish:2006,
        active:true
    }

]


const typeDefs=`
    type Query{
       greetings(name:String):String!,
       books(query:String):[Book!]!,
       authurs(query:String):[Authur!]!,
       add(number1:Float!, number2:Float!):Float,
       addArray(numbers:[Float!]):Float,
       grades:[Int!],
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
        books(parent, args, ctx, info){
            if(!args.query)
            {
                return Books;
            }

            return Books.filter((book)=>{
                return book.title.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        authurs(parent, args, ctx, info){
            if(!args.query)
            {
                return Authurs;
            }

            return Authurs.filter((authur)=>{
                return authur.name.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        add(parent, args, ctx, info){
            return args.number1+args.number2; 
        },
        addArray(parent, args, ctx, info){
            if(args.numbers.length==0)
            {
                return 0
            };

            let total =args.numbers.reduce(
                ( accumulator, currentValue ) => accumulator + currentValue,
                0
              )

            return total; 
        },
        grades(){
            return [12,1,2];
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